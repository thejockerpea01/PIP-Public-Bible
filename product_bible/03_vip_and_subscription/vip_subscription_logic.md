# PIP — VIP Entitlement & Subscription Logic

**Status:** Current Approved VIP Logic  
**Scope:** VIP entitlement behavior used by Mini Game and paid subscription rules  
**Related Documents:** `mini_game_flow.md`, `mini_game_reward_logic.md`

## 1. VIP Types
| VIP Type | Source |
|---|---|
| `vip_reward` | VIP access obtained from Level Reward inventory |
| `vip_subscription` | Paid membership |

Both entitlement types allow immediate Insight access while active, but do not receive identical x2 Ticket benefits.

## 2. Shared Active VIP Benefit for Mini Game
While an eligible VIP entitlement is active:
- A completed Mini Game Attempt's Insight opens immediately without an unlock advertisement.
- Opening a previously locked Attempt unlocks its Insight immediately.
- Insight unlocked while VIP is active remains permanently unlocked after VIP ends.
- VIP does not automatically grant unlimited x2 ค่าประสบการณ์.

## 3. VIP Reward Entitlement
The schedule for earning VIP Reward is defined in `reward_inventory_logic.md`.

For Mini Game entitlement purposes, active `vip_reward` grants:

| Benefit | Included |
|---|---:|
| Immediate Insight access | Yes |
| Permanent save of Insight once opened | Yes |
| Automatic x2 reward | No |
| x2 Experience Ticket allocation | 0 |

A VIP Reward user who wants 200 ค่าประสบการณ์ may choose the approved Rewarded Ad action after completing the Attempt.

## 4. VIP Subscription Plan
| Plan | Price |
|---|---:|
| VIP Subscription | 199 บาท / month |

### Active Subscription Benefits Used by Mini Game
| Benefit | Included |
|---|---:|
| Immediate Insight access | Yes |
| Permanent save of Insight once opened | Yes |
| Automatic unlimited x2 reward | No |
| `บัตรค่าประสบการณ์ x2` | 10 per paid billing cycle |

## 5. x2 Experience Ticket
### Name
- Thai UI: `บัตรค่าประสบการณ์ x2`
- English/code documentation: `x2 Experience Ticket`

### Allocation
| Entitlement | Allocation |
|---|---:|
| Free User | 0 |
| VIP Reward | 0 |
| Active VIP Subscription | 10 per paid billing cycle |

### Usage
An active paid VIP Subscription user may use 1 Ticket immediately after completing a Mini Game Attempt to change the reward from 100 to 200 ค่าประสบการณ์ without watching an ad.

### Restrictions
- Maximum 1 Ticket per completed Attempt.
- Ticket use is available only in the immediate post-stage reward decision.
- Tickets cannot be used retroactively from Locked Insight, History, or Stage Path review.
- Tickets cannot stack with Rewarded Ad.
- Maximum reward from one Attempt remains 200 ค่าประสบการณ์.
- Unused Tickets do not roll over into the next billing cycle.
- A renewed paid billing cycle grants a new allocation of 10 Tickets.

## 6. VIP Subscription Reward Options After a Mini Game Attempt

### Ticket Balance Greater Than 0
| Action | Final Reward | Ticket Consumed | Ad Required |
|---|---:|---:|---:|
| Receive base reward | 100 | 0 | No |
| Use 1 x2 Ticket | 200 | 1 | No |
| Watch Rewarded Ad instead | 200 | 0 | Yes |

Recommended Thai UI:
- `ใช้บัตร x2 รับ 200 ค่าประสบการณ์`
- `เหลือบัตร x2: 7 / 10 ชิ้นในรอบนี้`
- `รับ 100 ค่าประสบการณ์`
- `ดูโฆษณาแทนการใช้บัตร`

### Ticket Balance Equals 0
| Action | Final Reward | Ad Required |
|---|---:|---:|
| Receive base reward | 100 | No |
| Watch Rewarded Ad | 200 | Yes |

## 7. Cancellation and Expiration

### Cancellation Rule
When a user cancels VIP Subscription:
- Cancellation stops future auto-renewal.
- It does not immediately remove already paid access.
- VIP Subscription benefits remain active until the verified expiration timestamp.
- Use `subscription_expires_at` from the Store or verified backend entitlement as the source of truth.
- Do not hardcode expiration as exactly 30 days or the final calendar day of a month.

### Cancelled but Still Active State
Use:
- `cancelled_active_until_end`

This status behaves as active VIP Subscription until `subscription_expires_at`.

### Benefits While Cancelled but Still Active
| Benefit | Available |
|---|---:|
| Immediate Insight access | Yes |
| Permanent Insight save once opened | Yes |
| Use remaining x2 Tickets in paid cycle | Yes |
| Watch approved Rewarded Ad for 200 instead of using Ticket | Yes |
| Receive new Ticket allocation after expiration without renewal | No |

### On Expiration
When `subscription_expires_at` is reached:
- VIP Subscription access ends unless another entitlement is active.
- Remaining x2 Tickets from the expired cycle are removed.
- No new Ticket allocation is provided without an active renewed paid cycle.
- Insight already unlocked remains permanently accessible.

## 8. Required Entitlement Data
| Field | Description |
|---|---|
| `vip_type` | `vip_reward` or `vip_subscription` |
| `subscription_status` | `active`, `cancelled_active_until_end`, or `expired` |
| `auto_renew_enabled` | Whether paid membership will renew |
| `billing_cycle_start` | Start of current paid cycle |
| `billing_cycle_end` | End of current paid cycle |
| `cancelled_at` | Cancellation timestamp, if applicable |
| `subscription_expires_at` | Verified end of paid entitlement |
| `x2_ticket_monthly_allocation` | `10` for paid subscription |
| `x2_ticket_remaining` | Current usable Ticket count |

## 9. Locked Decisions
- VIP Insight access is immediate while entitlement is active.
- Insight opened during VIP remains permanently unlocked.
- VIP does not grant unlimited automatic x2 reward.
- VIP Reward receives 0 x2 Tickets.
- Paid VIP Subscription costs 199 บาท/month.
- Paid VIP Subscription receives 10 x2 Tickets per paid billing cycle.
- Cancelled Subscription stays active until verified expiration.
- Remaining Tickets remain usable while cancellation is active-until-end.
- Unused Tickets are removed when paid access ends.
