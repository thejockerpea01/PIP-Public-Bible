# PIP Logic Documentation — English Source of Truth

**Status:** Current Working Source of Truth  
**Date:** 25/05/2026  
**Primary Use:** AI tools, Codex, Claude Design, developers

## Authority Rule
The English documents in this folder are the primary implementation source of truth. The Thai folder is a reading/reference translation for the product owner. If any conflict appears, stop implementation and align both sets before continuing.

## File Separation
| File | Responsibility |
|---|---|
| `mini_game_flow.md` | Screens, stage flow, attempt review, navigation, Insight screen states |
| `mini_game_reward_logic.md` | 100/200 ค่าประสบการณ์ outcomes and Insight unlock outcomes |
| `vip_subscription_logic.md` | VIP entitlement, paid subscription, x2 Ticket, cancellation behavior |
| `reward_inventory_logic.md` | Level-earned VIP Reward storage and history |
| `ad_monetization_logic.md` | Approved and prohibited ad placements inside Mini Game |

## Boundary Rule
Do not copy business rules into `mini_game_flow.md`. The flow may call a capability; the corresponding system document defines eligibility and commercial behavior.

## Not Yet Approved
- Practice Mode logic
- Mock Exam logic
- Referral Reward
- Daily / Weekly / Event Reward
- Continue Ticket
- EXP Protection
- Forced Interstitial Ads in Mini Game
- Maximum stored VIP Reward items
- Expiration of unactivated VIP Reward items
