# PIP — Level Reward Inventory Logic

**Status:** Current Approved Logic / Source of Truth  
**Date:** 25/05/2026  
**Scope:** Inventory behavior of Level-earned rewards only  
**Related Documents:** `level_reward_bible.md`, `../03_vip_and_subscription/vip_subscription_logic.md`

---

## 1. Boundary

This document defines the inventory storage and consumption behavior of rewards granted by `level_reward_bible.md`.

It does not define Mini Game visual flow, advertisement placement, paid VIP Subscription monthly ticket inventory, billing rules, or unapproved rewards.

---

## 2. Level Reward Inventory Item Types

| Item Type | Thai Display Name | Source |
|---|---|---|
| `x2_experience_ticket_level` | `บัตรค่าประสบการณ์ x2` | Level Reward |
| `x2_insight_ticket_level` | `บัตร x2 + ปลดล็อก Insight` | Level Reward |
| `vip_reward_1_day` | `VIP 1 Day` | Level Reward |

Important:
- `x2_experience_ticket_level` must remain distinguishable in stored data from monthly x2 tickets provided by paid VIP Subscription.
- Level-earned tickets follow this document's no-expiration and unlimited-storage rules.
- Paid VIP Subscription ticket rules are defined separately in `vip_subscription_logic.md`.

---

## 3. Inventory Grant Events

| Trigger | Item Added | Quantity |
|---|---|---:|
| Initial account start at Level 1, once only | `x2_insight_ticket_level` | 3 |
| Reach a Level ending in 1 after Level 1 | `x2_insight_ticket_level` | 3 |
| Reach a Level divisible by 5 but not by 15 | `x2_experience_ticket_level` | 2 |
| Reach a Level divisible by 15 | `vip_reward_1_day` and `x2_experience_ticket_level` | 1 each |

---

## 4. Ticket Inventory Rules

### 4.1 Level-Earned x2 Experience Ticket

| Rule | Value |
|---|---|
| Item Type | `x2_experience_ticket_level` |
| Display Name | `บัตรค่าประสบการณ์ x2` |
| Expiration | None |
| Maximum Stored Quantity | Unlimited |
| Consumption | 1 item per eligible Mini Game reward action |
| Effect | Receive 200 ค่าประสบการณ์ without watching an ad |
| Insight Unlock | Not included |

### 4.2 Level-Earned x2 + Insight Ticket

| Rule | Value |
|---|---|
| Item Type | `x2_insight_ticket_level` |
| Display Name | `บัตร x2 + ปลดล็อก Insight` |
| Expiration | None |
| Maximum Stored Quantity | Unlimited |
| Consumption | 1 item per eligible Mini Game reward action |
| Effect | Receive 200 ค่าประสบการณ์ without watching an ad and permanently unlock Insight for that Attempt |

### 4.3 Shared Restrictions for Level-Earned Tickets

- May be used only during the eligible immediate post-Attempt reward decision.
- May not be applied after the user finalizes the base reward.
- May not alter reward values when reviewing an old Attempt.
- Must be consumed only after the reward action completes successfully.
- The maximum final Mini Game reward remains 200 ค่าประสบการณ์ per Attempt.

---

## 5. VIP 1 Day Inventory Rules

| Rule | Value |
|---|---|
| Item Type | `vip_reward_1_day` |
| Display Name | `VIP 1 Day` |
| Granted At | Every 15 Levels |
| Activation | Manual user confirmation required |
| Active Duration | 24 hours after activation |
| Ticket Granted On Activation | 0 |

When activated, the item provides `vip_reward` entitlement behavior defined in `vip_subscription_logic.md`.

Not Yet Approved:
- Pre-activation expiration
- Maximum stored unactivated VIP 1 Day items
- Stacking or extension behavior when another VIP entitlement is already active

---

## 6. Inventory State Model

### Ticket State

| State | Meaning |
|---|---|
| `available` | Stored and ready to use |
| `consumed` | Successfully used on an eligible Attempt |

Level-earned tickets do not have an `expired` state because they have no expiration.

### VIP Reward State

| State | Meaning |
|---|---|
| `available` | Received but not activated |
| `active` | Activated and within its 24-hour duration |
| `used` | Active duration completed |
| `expired` | Reserved for a future approved pre-activation expiry rule |

---

## 7. Required Inventory Data

### Common Fields

| Field | Description |
|---|---|
| `reward_item_id` | Unique inventory item identifier |
| `reward_type` | Item type code |
| `reward_source` | Must be `level_reward` for items governed by this document |
| `source_level` | Issuing Level or `initial_level_1_grant` |
| `received_at` | Timestamp the item entered inventory |
| `status` | Current item status |

### Ticket Fields

| Field | Description |
|---|---|
| `consumed_at` | Successful consumption timestamp, if used |
| `consumed_attempt_id` | Attempt on which the ticket was used, if used |
| `expires_at` | Must be `null` for Level-earned tickets |

### VIP 1 Day Fields

| Field | Description |
|---|---|
| `activated_at` | User-confirmed activation timestamp |
| `expires_at` | Timestamp 24 hours after activation |
| `entitlement_type` | `vip_reward` |

---

## 8. Reward History

For consumed tickets, store:
- Ticket name
- Source Level or initial Level 1 grant
- Received timestamp
- Consumed timestamp
- Attempt where used
- Outcome type: `x2_only` or `x2_and_insight_unlock`

For VIP 1 Day, store:
- Reward name
- Source Level
- Received timestamp
- Activated timestamp
- Entitlement expiration timestamp
- Final status

---

## 9. Separation From Paid VIP Subscription Tickets

| Topic | Level-Earned Ticket | Paid VIP Subscription Ticket |
|---|---|---|
| Source | Level Reward | Paid subscription billing cycle |
| Expiration | None | Defined in Subscription Logic |
| Accumulation | Unlimited | Defined in Subscription Logic |
| Plain x2 Ticket Insight Unlock | No | Defined in relevant system logic |

Do not apply the no-expiration or unlimited-storage rules in this document to paid Subscription tickets.

---

## 10. Locked Decisions

- Level-earned Ticket rewards are stored in inventory.
- Both Level-earned ticket types have no expiration and no storage cap.
- Initial Level 1 Reward is granted once per account.
- VIP 1 Day from Level Reward is manually activated.
- Activating VIP 1 Day grants no additional x2 Tickets.
- Ticket consumption is recorded per Attempt.
- Paid Subscription ticket rules remain separate and are not overridden by this document.
