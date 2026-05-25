# PIP — Logic ของ Reward และการปลดล็อก Insight ใน Mini Game

**สถานะ:** Logic Reward ที่อนุมัติปัจจุบัน  
**ขอบเขต:** ผล Reward จาก Attempt ที่เล่น Mini Game จบ  
**อ้างอิง Flow:** `mini_game_flow.md`

## 1. ขอบเขต
ไฟล์นี้กำหนด:
- ค่าประสบการณ์ 100 / 200
- การดูโฆษณาทันทีหลังจบเพื่อรับ x2
- การปลดล็อก Insight หลังรับ 100
- การปลดล็อกจาก Attempt เก่า
- การเปิด Insight แบบถาวร

ไฟล์นี้ไม่กำหนดราคา Subscription, ตารางแจก VIP จาก Level, Billing Cycle หรือจุดวางโฆษณาทั่วระบบ

## 2. Reward พื้นฐาน
ทุก Attempt ที่ตอบครบ 10 ข้อมี Reward พื้นฐาน:

| การกระทำ | Reward พื้นฐาน |
|---|---:|
| ตอบครบ 10 ข้อ | 100 ค่าประสบการณ์ |

กฎ:
- ได้ทั้งกรณีผ่านและไม่ผ่าน
- สิทธิ์ภายนอกไม่ทำให้ Reward พื้นฐานเพิ่มอัตโนมัติ
- เมื่อ User ยืนยันรับ 100 แล้ว Attempt นั้นไม่ได้ x2 ย้อนหลัง

## 3. Free User — ตัวเลือกทันทีหลังจบด่าน
เมื่ออยู่หน้า Quick Result และ Insight ยังล็อก:

| Action | Reward สุดท้าย | ผลต่อ Insight |
|---|---:|---|
| `รับ 100 ค่าประสบการณ์` | 100 | ยังล็อก |
| `ดูโฆษณา รับ x2 + ปลดล็อก Insight` | 200 | ปลดล็อกถาวรสำหรับ Attempt นั้น |

ข้อความ UI:
- หัวข้อ Card: `รับเพิ่มพร้อมเปิดบทวิเคราะห์`
- คำอธิบาย: `ดูโฆษณา 1 ครั้ง เพื่อรับ 200 ค่าประสบการณ์ และปลดล็อก Insight พร้อมเฉลยครบทุกข้อถาวร`
- ปุ่มหลัก: `ดูโฆษณา รับ x2 + ปลดล็อก Insight`
- ปุ่มรอง: `รับ 100 ค่าประสบการณ์`

เมื่อดูโฆษณาสำเร็จทันทีหลังจบ:
- `final_reward = 200`
- `x2_used = true`
- `x2_source = rewarded_ad`
- Insight เปิดถาวร
- `insight_unlock_source = rewarded_ad_immediate`

## 4. กดรับ 100 แล้วค่อยเปิดหน้า Locked Insight
หาก Free User กด `รับ 100 ค่าประสบการณ์`:
- `final_reward = 100`
- Reward ถือว่ายืนยันแล้ว
- Insight ยังล็อก
- ยังสามารถกดเข้า Locked Summary & Insight ได้ทันที

Action:
- `ดูโฆษณาเพื่อเปิด Insight`

ข้อความ:
- หัวข้อ: `ปลดล็อก Insight ของด่านนี้`
- คำอธิบาย: `ดูโฆษณา 1 ครั้ง เพื่อเปิดเฉลยและบทวิเคราะห์ครบทุกข้อถาวร`
- แจ้งเตือน: `การปลดล็อกครั้งนี้ไม่เพิ่มค่าประสบการณ์ย้อนหลัง`

ผลหลังดูโฆษณาสำเร็จ:
- Insight เปิดถาวร
- Reward ยังเป็น `100`
- `insight_unlock_source = rewarded_ad_locked_screen`
- ไม่ได้ x2 ย้อนหลัง

## 5. ปลดล็อก Attempt เก่าที่ Insight ยังล็อก
Attempt เก่าที่เปิดจาก Stage Path หรือ History สามารถกด:
- `ดูโฆษณาเพื่อเปิด Insight`

เมื่อดูสำเร็จ:
- Insight เปิดถาวร
- Reward เดิมไม่เปลี่ยน
- `insight_unlock_source = rewarded_ad_history`
- ไม่ได้ x2 ย้อนหลัง

## 6. กฎปลดล็อกถาวร
เมื่อ Insight ของ Attempt ใดเปิดแล้ว:
- เปิดดูซ้ำได้ฟรีถาวร
- ห้ามขอดูโฆษณาเพื่อเปิด Attempt เดิมซ้ำ
- ห้ามล็อกคืนเมื่อสิทธิ์ภายนอกหมดอายุ

## 7. Attempt ที่ไม่ผ่าน
Attempt ที่ไม่ผ่านใช้ตัวเลือก Reward และปลดล็อก Insight ได้เหมือน Attempt ที่ผ่าน
- Failed มีผลต่อ Progression เท่านั้น
- การเปิด Insight ไม่เปลี่ยน Failed เป็น Passed
- ต้องเล่นใหม่และผ่านจริงจึงเปิดด่านถัดไปได้

## 8. กรณีโฆษณาไม่สำเร็จ
หาก Rewarded Ad โหลดไม่ได้ ถูกปิดก่อนจบ หรือไม่ Complete:
- ไม่ให้ 200
- ไม่เปิด Insight จาก Action นั้น
- กลับไป State ก่อนกดโฆษณา
- ให้ลองใหม่หรือเลือกตัวเลือกไม่ดูโฆษณาได้

## 9. ตารางสรุปผล Reward
| กรณี | Reward สุดท้าย | Insight |
|---|---:|---|
| Free User รับ Reward พื้นฐาน | 100 | Locked |
| Free User ดู Ad ทันทีแบบ x2 + unlock | 200 | เปิดถาวร |
| Free User รับ 100 แล้วดู Ad จากหน้า Locked | 100 | เปิดถาวร |
| Free User กลับมาปลดล็อกทีหลัง | ค่าเดิม | เปิดถาวร |
| สิทธิ์ภายนอกเปิด Insight ให้ | Reward ตาม Action ที่เลือก | เปิดถาวร |

## 10. ข้อมูล Reward ที่ต้องเก็บ
| Field | ค่า / ความหมาย |
|---|---|
| `base_reward` | `100` |
| `final_reward` | `100` หรือ `200` |
| `reward_finalized` | `true` / `false` |
| `x2_used` | `true` / `false` |
| `x2_source` | `rewarded_ad`, `vip_subscription_ticket`, หรือ `none` |
| `insight_status` | `locked` / `unlocked` |
| `insight_unlock_source` | `rewarded_ad_immediate`, `rewarded_ad_locked_screen`, `rewarded_ad_history`, `vip_reward_active`, `vip_subscription_active`, หรือ `none` |

## 11. กฎที่ล็อกแล้ว
- Reward พื้นฐานคือ 100 ค่าประสบการณ์
- ดู Rewarded Ad ทันทีจาก Quick Result ได้ 200 + เปิด Insight ถาวร
- เมื่อรับ 100 แล้ว Reward ของ Attempt นั้นไม่เพิ่มเป็น x2 ย้อนหลัง
- หลังรับ 100 ยังเปิด Insight ผ่าน Ad ได้
- Failed User มีตัวเลือก Reward และ Insight เหมือนกัน
- Insight ปลดล็อกถาวรแยกตาม Attempt
