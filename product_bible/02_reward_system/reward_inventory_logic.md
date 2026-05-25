# PIP — Reward Inventory Logic

**Status:** Current Approved Inventory Logic  
**Scope:** Level-earned VIP Reward inventory only at this stage

## 1. Boundary
This document defines only the confirmed Level Reward and its inventory behavior.

It does not define Mini Game screen flow, subscription pricing, ad placement, Referral Reward, Daily Reward, Weekly Reward, Continue Ticket, or EXP Protection.

## 2. Approved Level Reward
| Condition | Reward |
|---|---|
| Every 15 Levels | VIP 1 day |

Examples:
| Reached Level | Added Inventory Reward |
|---:|---|
| 15 | VIP 1 day |
| 30 | VIP 1 day |
| 45 | VIP 1 day |
| 60 | VIP 1 day |

## 3. Activation Rule
A Level-earned VIP Reward must not activate automatically.

When earned:
- It is added to Reward Inventory.
- The user selects when to activate it.
- The 24-hour active duration begins only after confirmed activation.

## 4. Inventory States
| State | Meaning |
|---|---|
| `available` | Received and not activated |
| `active` | Currently providing VIP Reward entitlement |
| `used` | Active duration ended after use |
| `expired` | Reserved if a future rule introduces pre-activation expiry |

No rule for pre-activation expiry is currently approved.

## 5. VIP Reward Benefit Boundary
The benefit behavior consumed by Mini Game is defined in `vip_subscription_logic.md`.

Confirmed inventory restriction:
| Reward | x2 Experience Ticket Granted |
|---|---:|
| VIP 1 day from Level Reward | 0 |

## 6. Required Inventory Data
| Field | Description |
|---|---|
| `reward_item_id` | Unique reward inventory item |
| `reward_type` | `vip_reward_1_day` |
| `reward_source` | `level_reward` |
| `source_level` | Level that created the reward |
| `received_at` | Timestamp added to inventory |
| `activated_at` | Timestamp of confirmed activation |
| `expires_at` | Timestamp 24 hours after activation |
| `status` | `available`, `active`, `used`, or `expired` |

## 7. Reward History
Used VIP Reward items must remain visible in Reward History with:
- Reward name
- Source Level
- Received time
- Activated time
- Expiration time
- Final status

## 8. Not Yet Approved
- Maximum number of stored unused VIP Reward items
- Pre-activation expiration
- Stacking multiple active VIP Reward items
- Referral Reward
- Daily / Weekly Reward
- Continue Ticket
- EXP Protection
- Event Reward
