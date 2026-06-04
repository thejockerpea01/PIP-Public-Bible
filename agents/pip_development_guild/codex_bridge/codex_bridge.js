const http = require("http");
const fs = require("fs");
const path = require("path");
const childProcess = require("child_process");
const crypto = require("crypto");

const HOST = "127.0.0.1";
const PORT = 8787;
const WORKING_DIRECTORY = "/Users/Pae/Developer/PIP/PIP-Public-Bible";
const MAX_PROMPT_LENGTH = 20000;
const TASK_TIMEOUT_MS = 5 * 60 * 1000;
const ROOT = __dirname;
const LOG_DIR = path.join(ROOT, "logs");
const TASK_DIR = path.join(ROOT, "tasks");

fs.mkdirSync(LOG_DIR, { recursive: true });
fs.mkdirSync(TASK_DIR, { recursive: true });

const tasks = new Map();
const queue = [];
let runningTaskId = null;

function now() {
  return new Date().toISOString();
}

function safeJson(task) {
  return {
    id: task.id,
    agentId: task.agentId,
    agentName: task.agentName,
    taskType: task.taskType,
    taskDetails: task.taskDetails,
    status: task.status,
    createdAt: task.createdAt,
    startedAt: task.startedAt,
    completedAt: task.completedAt,
    exitCode: task.exitCode,
    error: task.error,
    result: task.result,
    logFile: path.basename(task.logFile)
  };
}

function corsOrigin(request) {
  const origin = request.headers.origin;
  if (!origin || origin === "null" || origin === `http://${HOST}:${PORT}` || origin.startsWith("http://127.0.0.1:")) {
    return origin || "null";
  }
  return "null";
}

function sendJson(request, response, statusCode, body) {
  response.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",
    "Access-Control-Allow-Origin": corsOrigin(request),
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type"
  });
  response.end(JSON.stringify(body, null, 2));
}

function saveTask(task) {
  fs.writeFileSync(path.join(TASK_DIR, `${task.id}.json`), JSON.stringify(safeJson(task), null, 2));
}

function readBody(request) {
  return new Promise((resolve, reject) => {
    let body = "";
    request.on("data", (chunk) => {
      body += chunk;
      if (body.length > MAX_PROMPT_LENGTH + 10000) {
        reject(new Error("payload too large"));
        request.destroy();
      }
    });
    request.on("end", () => resolve(body));
    request.on("error", reject);
  });
}

function validateTaskPayload(payload) {
  const prompt = typeof payload.prompt === "string" ? payload.prompt.trim() : "";
  const taskDetails = typeof payload.taskDetails === "string" ? payload.taskDetails.trim() : "";

  if (!taskDetails) return "taskDetails is required";
  if (!prompt) return "prompt is required";
  if (prompt.length > MAX_PROMPT_LENGTH) return `prompt must be ${MAX_PROMPT_LENGTH} characters or fewer`;

  return null;
}

function appendLog(task, text) {
  fs.appendFileSync(task.logFile, text);
}

function finalizeTask(task, status, details = {}) {
  task.status = status;
  task.completedAt = task.completedAt || now();
  if (typeof details.exitCode !== "undefined") task.exitCode = details.exitCode;
  if (typeof details.error !== "undefined") task.error = details.error;
  if (typeof details.result !== "undefined") task.result = details.result;
  saveTask(task);
}

function runNextTask() {
  if (runningTaskId || queue.length === 0) return;

  const task = tasks.get(queue.shift());
  if (!task) {
    runNextTask();
    return;
  }

  runningTaskId = task.id;
  task.status = "running";
  task.startedAt = now();
  saveTask(task);
  appendLog(task, `Task ${task.id} started at ${task.startedAt}\n`);
  appendLog(task, `Agent: ${task.agentName}\nTask type: ${task.taskType}\n\n`);

  const child = childProcess.spawn("codex", ["exec", "--sandbox", "workspace-write", task.prompt], {
    cwd: WORKING_DIRECTORY,
    stdio: ["ignore", "pipe", "pipe"],
    shell: false,
    env: process.env
  });

  child.stdout.on("data", (data) => appendLog(task, data.toString()));
  child.stderr.on("data", (data) => appendLog(task, data.toString()));

  const timeoutTimer = setTimeout(() => {
    appendLog(task, `\nTask timed out after 5 minutes\n`);
    task.error = "Task timed out after 5 minutes";
    try {
      child.kill("SIGTERM");
    } catch (error) {
      appendLog(task, `Failed to send SIGTERM: ${error.message}\n`);
    }
    setTimeout(() => {
      try {
        if (!child.killed) child.kill("SIGKILL");
      } catch (error) {
        appendLog(task, `Failed to send SIGKILL: ${error.message}\n`);
      }
    }, 5000).unref();
  }, TASK_TIMEOUT_MS);
  timeoutTimer.unref();

  child.on("error", (error) => {
    clearTimeout(timeoutTimer);
    task.completedAt = now();
    task.error = error.message;
    task.result = "Codex process could not start.";
    appendLog(task, `\nTask failed to start: ${error.message}\n`);
    finalizeTask(task, "failed", {
      exitCode: typeof task.exitCode === "number" ? task.exitCode : null,
      error: task.error,
      result: task.result
    });
    runningTaskId = null;
    runNextTask();
  });

  child.on("close", (code) => {
    clearTimeout(timeoutTimer);
    task.exitCode = code;
    task.completedAt = now();
    task.status = code === 0 ? "completed" : "failed";
    task.result = code === 0 ? "Codex task completed." : (task.error || `Codex task failed with exit code ${code}.`);
    appendLog(task, `\nTask ${task.status} at ${task.completedAt} with exit code ${code}\n`);
    finalizeTask(task, task.status, {
      exitCode: code,
      error: task.error,
      result: task.result
    });
    runningTaskId = null;
    runNextTask();
  });
}

function createTask(payload) {
  const id = `task-${Date.now()}-${crypto.randomBytes(4).toString("hex")}`;
  const task = {
    id,
    agentId: String(payload.agentId || ""),
    agentName: String(payload.agentName || ""),
    taskType: String(payload.taskType || ""),
    taskDetails: String(payload.taskDetails || "").trim(),
    prompt: String(payload.prompt || "").trim(),
    status: "queued",
    createdAt: now(),
    startedAt: null,
    completedAt: null,
    exitCode: null,
    error: null,
    result: "",
    logFile: path.join(LOG_DIR, `${id}.log`)
  };

  tasks.set(id, task);
  queue.push(id);
  appendLog(task, `Task ${id} queued at ${task.createdAt}\n`);
  saveTask(task);
  runNextTask();
  return task;
}

async function handleRequest(request, response) {
  const url = new URL(request.url, `http://${HOST}:${PORT}`);

  if (request.method === "OPTIONS") {
    sendJson(request, response, 204, {});
    return;
  }

  if (request.method === "GET" && url.pathname === "/health") {
    sendJson(request, response, 200, { ok: true });
    return;
  }

  if (request.method === "GET" && url.pathname === "/tasks") {
    sendJson(request, response, 200, Array.from(tasks.values()).map(safeJson));
    return;
  }

  const taskMatch = url.pathname.match(/^\/tasks\/([^/]+)$/);
  if (request.method === "GET" && taskMatch) {
    const task = tasks.get(taskMatch[1]);
    sendJson(request, response, task ? 200 : 404, task ? safeJson(task) : { error: "task not found" });
    return;
  }

  if (request.method === "POST" && url.pathname === "/tasks") {
    try {
      const rawBody = await readBody(request);
      const payload = JSON.parse(rawBody || "{}");
      const validationError = validateTaskPayload(payload);
      if (validationError) {
        sendJson(request, response, 400, { error: validationError });
        return;
      }
      const task = createTask(payload);
      sendJson(request, response, 202, safeJson(task));
    } catch (error) {
      sendJson(request, response, 400, { error: error.message });
    }
    return;
  }

  sendJson(request, response, 404, { error: "not found" });
}

const server = http.createServer((request, response) => {
  handleRequest(request, response).catch((error) => {
    sendJson(request, response, 500, { error: error.message });
  });
});

server.listen(PORT, HOST, () => {
  console.log(`Codex Bridge listening at http://${HOST}:${PORT}`);
  console.log(`Working directory: ${WORKING_DIRECTORY}`);
});
