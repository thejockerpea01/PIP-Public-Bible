# PIP — Mini Game Flow

**Status:** Current Approved Game Flow + Daily Soft Reward Decay Proposal  
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
- Game-facing reward choice after an Attempt
- Summary & Insight screen states
- Reviewing previous Attempts
- Navigation inside Mini Game

This document may describe reward values only when they directly affect Mini Game UI state, button labels, and post-Attempt flow.

It does **not** define:

- VIP pricing
- Subscription benefits
- Ticket allocation
- Level reward schedules
- Billing cycles
- Commercial ad inventory rules
- Interstitial ad frequency
- Ad placement outside the Mini Game reward choice
- Server-side reward economy outside this Mini Game flow

Those rules belong in the external reward, VIP, inventory, and monetization documents.

---

## 2. Mode Definition

Mini Game is a separate mode from Practice.

- Do not present Mini Game as inside Practice.
- Use `Mini Game Main Entry` as the neutral parent screen until final app navigation is approved.
- The playable entry action is `เริ่มตะลุยโจทย์`.
- Mini Game is designed as a short, repeatable, stage-based learning loop.
- Mini Game must not block learning progress with forced ads or energy-style wait timers.

---

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

---

## 4. Stage Gameplay

- One stage contains exactly 10 questions.
- The user answers one question at a time.
- After selecting an answer, the UI may show selected/correct/incorrect option states.
- Do not show an inline explanation card under the answer choices during gameplay.
- Explanation content belongs in Summary & Insight after the Attempt.
- After Question 10, open Quick Result immediately.

```text
Mini Game Main Entry
  → Start Available Stage
  → Question 1 … Question 10
  → Quick Result
  → Reward Choice
  → Summary & Insight / Stage Path / Next Stage action
```

---

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
- Reward claiming does not change pass/fail status.
- Unlocking Insight does not change pass/fail status.

---

## 6. Daily Soft Reward Decay

Mini Game supports a daily soft reward decay for Free Users who continue playing without choosing the rewarded-ad option.

This rule is intended to:

- Let Free Users continue playing Mini Game without a hard block.
- Avoid forcing ads before or during gameplay.
- Keep the first sessions of the day generous.
- Create a natural incentive to choose the rewarded-ad option when the user wants faster progress.
- Limit unlimited free reward farming while preserving learning value.

### Free User Base Reward by Daily Mini Game Completion Count

| Daily completed Mini Game Attempt | Base reward if user does not watch rewarded ad | Rewarded-ad option |
|---:|---:|---:|
| Attempts 1–7 | `100 ค่าประสบการณ์` | `200 ค่าประสบการณ์` |
| Attempts 8–10 | `75 ค่าประสบการณ์` | `200 ค่าประสบการณ์` |
| Attempts 11+ | `50 ค่าประสบการณ์` | `200 ค่าประสบการณ์` |

Rules:

- The user may continue playing Mini Game after Attempt 10.
- The system must not block gameplay when the base reward decreases.
- The base reward decrease must be communicated as a daily reward state, not as punishment.
- The rewarded-ad option remains available after each completed Attempt when ad availability and external reward logic allow it.
- If the user chooses the rewarded-ad option, the displayed reward for that Attempt is `200 ค่าประสบการณ์`.
- If the user does not choose the rewarded-ad option, the displayed reward follows the daily base reward tier.
- The reset boundary for the daily counter is controlled by reward/system logic outside this file.
- The daily counter must be server-authoritative when implemented.

### Recommended UI Messaging

Before soft decay begins:

- `วันนี้ยังรับค่าประสบการณ์เต็มได้อีก {n} รอบ`

During Attempts 8–10:

- `รอบนี้รับ 75 ค่าประสบการณ์`
- `ดูโฆษณาเพื่อรับ 200 ค่าประสบการณ์`

After Attempt 10:

- `วันนี้รับค่าประสบการณ์เต็มครบแล้ว`
- `ยังฝึกต่อได้ตามปกติ`
- `รับ 50 ค่าประสบการณ์ หรือดูโฆษณาเพื่อรับ 200 ค่าประสบการณ์`

Do not use wording that implies punishment, loss, or failure for not watching an ad.

Forbidden wording examples:

- `รางวัลของคุณถูกลดลง`
- `ต้องดูโฆษณาเพื่อรับรางวัล`
- `ไม่ดูโฆษณาจะไม่ได้รางวัล`

---

## 7. Quick Result Screen

Quick Result appears immediately after the tenth answer.

Every user must see:

- Score
- Correct and incorrect counts
- Result state: `ผ่านเกณฑ์` or `ยังไม่ผ่าน`
- Current base reward display based on the daily reward tier
- Rewarded-ad option display when available
- Available next actions supplied by reward/access logic

Rules:

- Never hide basic result information behind an advertisement, VIP prompt, or Insight lock.
- Quick Result must show the reward state clearly before the user claims a reward.
- The normal claim button must use the current base reward value for that Attempt.
- The rewarded-ad claim button must display `200 ค่าประสบการณ์` when available.
- Reward actions are supplied and validated by `mini_game_reward_logic.md`.
- Access entitlements are supplied by `vip_subscription_logic.md`.
- Advertisement availability and commercial rules are supplied by `ad_monetization_logic.md`.

Approved result wording:

- Passed: `ผ่านเกณฑ์!` / `คุณตอบถูก 8 / 10 ข้อ`
- Failed: `ยังไม่ผ่าน` / `คุณตอบถูก 6 / 10 ข้อ`

Example reward actions:

| Daily reward tier | Normal claim button | Rewarded-ad button |
|---|---|---|
| Attempts 1–7 | `รับ 100 ค่าประสบการณ์` | `ดูโฆษณา รับ 200 ค่าประสบการณ์` |
| Attempts 8–10 | `รับ 75 ค่าประสบการณ์` | `ดูโฆษณา รับ 200 ค่าประสบการณ์` |
| Attempts 11+ | `รับ 50 ค่าประสบการณ์` | `ดูโฆษณา รับ 200 ค่าประสบการณ์` |

---

## 8. Reward Claim Flow

The reward claim flow happens after Quick Result.

```text
Question 10 Completed
  → Quick Result
  → User chooses reward action
      → Claim current base reward
      OR
      → Watch rewarded ad, then claim 200 ค่าประสบการณ์
  → Open next available Mini Game action
```

Rules:

- A completed Attempt may receive only one final reward claim.
- Reward claim must be idempotent.
- Refreshing the screen, retrying a network request, or reopening the Attempt must not duplicate rewards.
- Reward amount must be calculated and confirmed by trusted reward logic, not only by the client UI.
- The UI may display the expected reward, but the backend/source of truth must finalize the claimed reward.
- If rewarded ad is unavailable or fails, the user must still be able to claim the current base reward.
- If the user has already claimed the base reward, the Attempt must not later be upgraded to rewarded-ad reward unless external reward logic explicitly supports that rule.

---

## 9. Summary & Insight Screen States

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
- Final claimed reward for the Attempt
- All 10 questions
- User-selected answer and correct answer for each question
- Explanation for every question
- Missed-topic / weak-area analysis
- PIP guidance on what to review next

### Permanent Attempt Access

If an Attempt has `insight_status = unlocked`, opening it again always displays the unlocked Summary & Insight experience.

---

## 10. Reviewing Previous Attempts

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

---

## 11. Navigation

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

---

## 12. Required Game Data

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
| `daily_reward_attempt_index` | Server-authoritative daily completed Mini Game index used for reward tier display |
| `base_reward_amount` | Current base reward amount for this Attempt before rewarded-ad choice |
| `rewarded_ad_reward_amount` | Rewarded-ad reward amount shown when available |
| `reward_claim_status` | `unclaimed`, `claimed_base`, or `claimed_rewarded_ad` |
| `final_reward_display` | Final claimed reward display value supplied by reward logic |
| `final_reward_amount` | Final reward amount confirmed by reward logic |
| `insight_status` | `locked` or `unlocked` |
| `insight_unlocked_at` | Timestamp, if unlocked |

### Daily Reward State Needed by Game UI

| Field | Description |
|---|---|
| `daily_mini_game_completed_count` | Completed Mini Game Attempts counted for the current reset window |
| `current_reward_tier` | `full`, `soft_decay_75`, or `soft_decay_50` |
| `remaining_full_reward_attempts` | Number of remaining daily Attempts that still grant 100 base reward |
| `daily_reward_reset_at` | Timestamp supplied by reward/system logic |
| `reward_state_source` | Indicates whether reward state came from server/source of truth |

---

## 13. Approved UI Terms

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
- `รับ 100 ค่าประสบการณ์`
- `รับ 75 ค่าประสบการณ์`
- `รับ 50 ค่าประสบการณ์`
- `ดูโฆษณา รับ 200 ค่าประสบการณ์`
- `วันนี้รับค่าประสบการณ์เต็มครบแล้ว`
- `ยังฝึกต่อได้ตามปกติ`

Do not use:

- `EXP`
- `XP`
- `กลับหน้า Practice`
- `รางวัลของคุณถูกลดลง`
- `ต้องดูโฆษณาเพื่อรับรางวัล`

---

## 14. Locked Mini Game Decisions

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
- Free User Mini Game base reward uses Daily Soft Reward Decay for game-facing reward display: Attempts 1–7 = 100, Attempts 8–10 = 75, Attempts 11+ = 50.
- Rewarded-ad Mini Game option remains 200 ค่าประสบการณ์ when available.
- Mini Game must remain playable after daily base reward decay begins.

---

## 15. Open Decisions / Must Be Confirmed Outside This File

The following are intentionally not finalized in this flow document:

- Exact daily reset boundary for `daily_mini_game_completed_count`
- Whether reset is calendar-day based, rolling 24-hour based, or server-event based
- Whether VIP, paid membership, reward tickets, or campaigns modify the daily reward tiers
- Whether rewarded-ad reward also unlocks Insight in specific product states
- Whether a claimed base reward can ever be upgraded later
- Ad availability, cooldown, fill failure handling, and commercial ad frequency
- Detailed backend API contract for reward claiming

