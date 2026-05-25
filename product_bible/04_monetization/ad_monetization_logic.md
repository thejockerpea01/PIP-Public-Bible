# PIP — Mini Game Advertisement Monetization Logic

**Status:** Current Approved Ad Rules for Mini Game only  
**Scope:** Advertisement placement and user-triggered ad actions inside Mini Game

## 1. Boundary
This document defines advertisement rules inside Mini Game only.

It does not define Practice advertising, Mock Exam advertising, subscription pricing, Level Reward inventory, or ad strategy outside Mini Game.

## 2. Approved Ad Type in Current Mini Game Flow
Only user-triggered Rewarded Ads are approved in the current Mini Game flow.

The user must explicitly select an action that clearly states the outcome before any ad is shown.

## 3. Approved Rewarded Ad Placements
| Situation | Approved Action | Outcome |
|---|---|---|
| Free User at Quick Result before accepting 100 | `ดูโฆษณา รับ x2 + ปลดล็อก Insight` | 200 ค่าประสบการณ์ + permanent Insight unlock |
| Free User after accepting 100, on Locked Insight | `ดูโฆษณาเพื่อเปิด Insight` | Permanent Insight unlock only; no retroactive x2 |
| Free User reviewing old locked Attempt | `ดูโฆษณาเพื่อเปิด Insight` | Permanent Insight unlock only; no retroactive x2 |
| Active VIP Reward user after stage | `ดูโฆษณา รับ 200 ค่าประสบการณ์` | 200 ค่าประสบการณ์; Insight already available |
| Active paid VIP Subscription user after stage | `ดูโฆษณา รับ 200 ค่าประสบการณ์` | 200 ค่าประสบการณ์ without consuming a Ticket |

## 4. Required Transparency Before Ad
Approved explanatory UI includes:
- `ดูโฆษณา รับ x2 + ปลดล็อก Insight`
- `ดูโฆษณาเพื่อเปิด Insight`
- `การปลดล็อกครั้งนี้ไม่เพิ่มค่าประสบการณ์ย้อนหลัง`
- `ดูโฆษณา รับ 200 ค่าประสบการณ์`

## 5. Banner Ad Rule
Banner Ads are not allowed on Summary & Insight in MVP.

| Screen | Banner Ad |
|---|---:|
| Quick Result | No |
| Locked Summary & Insight | No |
| Unlocked Summary & Insight | No |
| VIP Summary & Insight | No |
| Previous Attempt Insight Review | No |

## 6. Forced Interstitial Ad Rule
Forced Interstitial Ads are not approved in the current Mini Game flow.

Do not show forced ads:
- Before Quick Result
- Before Summary & Insight
- After Insight unlock
- Before entering the next stage
- While answering questions

## 7. Ad Failure or Incomplete View
If a Rewarded Ad fails to load, is interrupted, or is not completed:
- Do not grant the advertised reward.
- Do not unlock Insight from that action.
- Return the user to the previous choice state.
- Allow retry when appropriate.

## 8. Not Defined Here
- Ad rules outside Mini Game
- Practice Mode ad placement
- Mock Exam ad placement
- Future Interstitial or frequency-cap testing
- Age-gating or advertising compliance implementation details
