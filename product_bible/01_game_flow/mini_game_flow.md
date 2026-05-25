# PIP — Mini Game Flow

**Status:** Current Approved Game Flow  
**Scope:** Mini Game screens and in-game behavior only  
**External References:** `mini_game_reward_logic.md`, `vip_subscription_logic.md`, `reward_inventory_logic.md`, `ad_monetization_logic.md`  
**Design Source of Truth:** `Sprint & Mock - Design System.html`

---

## 1. Document Boundary
This document defines only the playable Mini Game experience:
- Mini Game Main Entry / Stage Path
- Starting a stage
- Answering 10 questions
- Pass/fail progression
- Quick Result screen
- Summary & Insight screen states
- Reviewing previous Attempts
- Navigation inside Mini Game

It does not define pricing, subscription benefits, ticket allocation, Level reward schedules, billing cycles, or commercial ad rules.

## 2. Mode Definition
Mini Game is a separate mode from Practice.
- Do not present Mini Game as inside Practice.
- Use `Mini Game Main Entry` as the neutral parent screen until final app navigation is approved.
- The playable entry action is `เริ่มตะลุยโจทย์`.

## 3. Mini Game Main Entry / Stage Path
The Stage Path allows the user to:
- View stage progression
- Start an available stage
- Recognize locked stages
- Revisit previously played stages
- Open previous Attempt review states

### Stage States
| State | Meaning | Tap Behavior |
|---|---|---|
| `locked` | Prerequisite progression is not complete | Cannot start stage |
| `available` | Stage may be played now | Start a new 10-question Attempt |
| `completed_insight_unlocked` | A completed Attempt has unlocked Insight | Open Summary & Insight |
| `completed_insight_locked` | A completed Attempt has locked Insight | Open Locked Insight state |
| `failed_attempt` | A completed Attempt failed | Open review; next stage remains locked |

### Multiple Attempts
- A stage may have multiple Attempts.
- Tapping a played stage opens the latest completed Attempt by default.
- The review experience must provide access to older Attempts for the same stage.
- Insight status is stored per Attempt, not only per Stage.

## 4. Stage Gameplay
- One stage contains exactly 10 questions.
- The user answers one question at a time.
- After Question 10, open Quick Result immediately.

```text
Mini Game Main Entry
  → Start Available Stage
  → Question 1 … Question 10
  → Quick Result
```

## 5. Pass / Fail and Progression
| Score | Result | Next Stage |
|---:|---|---|
| 8/10, 9/10, 10/10 | `passed` | May be unlocked according to progression |
| 0/10–7/10 | `failed` | Remains unavailable |

Rules:
- Pass/fail controls progression only.
- A failed user must still be able to review or unlock Insight according to external access rules.
- Reviewing Insight never converts failure into a pass.
- Only a new passing Attempt may open progression.

## 6. Quick Result Screen
Quick Result appears immediately after the tenth answer.

Every user must see:
- Score
- Correct and incorrect counts
- Result state: `ผ่านเกณฑ์` or `ยังไม่ผ่าน`
- Base completion reward display: `100 ค่าประสบการณ์`
- Available next actions supplied by reward/access logic

Rules:
- Never hide basic result information behind an advertisement, VIP prompt, or Insight lock.
- Reward actions are supplied by `mini_game_reward_logic.md`.
- Access entitlements are supplied by `vip_subscription_logic.md`.

Approved result wording:
- Passed: `ผ่านเกณฑ์!` / `คุณตอบถูก 8 / 10 ข้อ`
- Failed: `ยังไม่ผ่าน` / `คุณตอบถูก 6 / 10 ข้อ`

## 7. Summary & Insight Screen States

### Locked State
A locked state may show:
- Existing score
- Pass/fail state
- Final claimed reward, if finalized
- Locked Insight message
- Available unlock action from external logic

It must not reveal full answer review before unlock.

### Unlocked State
When unlocked, Summary & Insight must provide:
- Total score and pass/fail status
- Correct and incorrect counts
- All 10 questions
- User-selected answer and correct answer for each question
- Explanation for every question
- Missed-topic / weak-area analysis
- PIP guidance on what to review next

### Permanent Attempt Access
If an Attempt has `insight_status = unlocked`, opening it again always displays the unlocked Summary & Insight experience.

## 8. Reviewing Previous Attempts

### Already Unlocked Attempt
- Open Summary & Insight immediately.
- Do not change reward, score, result, or progression.
- Do not create a new Attempt.

### Locked Attempt
- Open Locked Summary & Insight.
- Show any unlock action currently available from external logic.
- If access is granted, update the selected Attempt to unlocked and open Insight.

### External Access Hook
The flow must support an entitlement that can unlock a locked Attempt immediately. Entitlement rules belong outside this file.

### Review Is Not Replay
| Review Action | New Reward | New Progression | New Attempt |
|---|---:|---:|---:|
| Open unlocked Insight | No | No | No |
| Unlock and open previous Insight | No | No | No |
| Review a failed Attempt | No | No | No |

## 9. Navigation
Passed Attempt actions, when applicable:
- `ดู Insight`
- `ไปด่านถัดไป`
- `กลับหน้าหลัก`

Failed Attempt actions:
- `ดู Insight`
- `เล่นใหม่`
- `กลับหน้าหลัก`

Forbidden for Failed Attempt:
- `ไปด่านถัดไป`

Forbidden wording:
- `กลับหน้า Practice`

## 10. Required Game Data

### Stage Data
| Field | Description |
|---|---|
| `stage_id` | Unique stage identifier |
| `stage_number` | Displayed stage order |
| `stage_access_status` | `locked`, `available`, or `completed` |
| `latest_attempt_id` | Most recent completed Attempt, if any |
| `latest_attempt_result` | `passed` or `failed`, if any |
| `latest_attempt_score` | Latest score, if any |
| `latest_attempt_insight_status` | `locked` or `unlocked` |
| `attempt_count` | Completed Attempt count for this Stage |
| `next_stage_unlocked` | Whether progression has opened the next Stage |

### Attempt Data Needed by Game UI
| Field | Description |
|---|---|
| `attempt_id` | Unique Attempt identifier |
| `stage_id` | Stage associated with the Attempt |
| `completed_at` | Completion timestamp |
| `correct_count` | Correct answer count |
| `wrong_count` | Incorrect answer count |
| `result_status` | `passed` or `failed` |
| `final_reward_display` | Display value supplied by reward logic |
| `insight_status` | `locked` or `unlocked` |
| `insight_unlocked_at` | Timestamp, if unlocked |

## 11. Approved UI Terms
Use:
- `เริ่มตะลุยโจทย์`
- `ผ่านเกณฑ์`
- `ยังไม่ผ่าน`
- `ดู Insight`
- `ปลดล็อก Insight`
- `คำตอบที่ถูก`
- `คำอธิบาย`
- `ไปด่านถัดไป`
- `เล่นใหม่`
- `กลับหน้าหลัก`
- `ค่าประสบการณ์`

Do not use:
- `EXP`
- `XP`
- `กลับหน้า Practice`

## 12. Locked Mini Game Decisions
- Mini Game is separate from Practice.
- One Stage contains exactly 10 questions.
- Passing requires at least 8/10.
- Quick Result is shown immediately after Question 10.
- A failed Attempt cannot open the next Stage but remains reviewable.
- Stage Path supports revisiting previous Attempts.
- Summary & Insight has Locked and Unlocked states.
- Unlocked Insight remains viewable permanently for its Attempt.
- Reviewing an Attempt does not grant progression or change the prior result.
- Commercial Reward, VIP, Subscription, and Advertisement rules are maintained in separate system documents.
