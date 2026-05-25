# PIP — Logic โฆษณาใน Mini Game

**สถานะ:** กฎโฆษณาที่อนุมัติปัจจุบันสำหรับ Mini Game เท่านั้น  
**ขอบเขต:** จุดแสดงโฆษณาและ Action ของโฆษณาใน Mini Game

## 1. ขอบเขต
ไฟล์นี้กำหนดกฎโฆษณาภายใน Mini Game เท่านั้น

ไม่กำหนดโฆษณาใน Practice, Mock Exam, ราคา Subscription, Reward Inventory จาก Level หรือกลยุทธ์โฆษณานอก Mini Game

## 2. ประเภทโฆษณาที่อนุมัติ
ใน Flow Mini Game ปัจจุบัน อนุมัติเฉพาะ Rewarded Ad ที่ผู้ใช้เป็นคนกดเลือกเอง

ก่อนแสดงโฆษณา User ต้องเห็นชัดว่าเมื่อดูแล้วจะได้รับอะไร

## 3. จุดที่อนุมัติให้ใช้ Rewarded Ad
| สถานการณ์ | Action | ผลลัพธ์ |
|---|---|---|
| Free User อยู่หน้า Quick Result ก่อนกดรับ 100 | `ดูโฆษณา รับ x2 + ปลดล็อก Insight` | 200 ค่าประสบการณ์ + เปิด Insight ถาวร |
| Free User รับ 100 แล้วอยู่หน้า Locked Insight | `ดูโฆษณาเพื่อเปิด Insight` | เปิด Insight ถาวรเท่านั้น ไม่มี x2 ย้อนหลัง |
| Free User เปิด Attempt เก่าที่ยังล็อก | `ดูโฆษณาเพื่อเปิด Insight` | เปิด Insight ถาวรเท่านั้น ไม่มี x2 ย้อนหลัง |
| VIP Reward Active หลังจบด่าน | `ดูโฆษณา รับ 200 ค่าประสบการณ์` | 200 ค่าประสบการณ์; Insight เปิดอยู่แล้ว |
| VIP Subscription Active หลังจบด่าน | `ดูโฆษณา รับ 200 ค่าประสบการณ์` | 200 ค่าประสบการณ์ โดยไม่ใช้บัตร |

## 4. ความชัดเจนก่อนดูโฆษณา
ก่อนให้ผู้ใช้กดดู Rewarded Ad ต้องระบุผลตอบแทนให้ชัด เช่น:
- `ดูโฆษณา รับ x2 + ปลดล็อก Insight`
- `ดูโฆษณาเพื่อเปิด Insight`
- `การปลดล็อกครั้งนี้ไม่เพิ่มค่าประสบการณ์ย้อนหลัง`
- `ดูโฆษณา รับ 200 ค่าประสบการณ์`

## 5. Banner Ad
ห้ามแสดง Banner Ad บนประสบการณ์ Summary & Insight ใน MVP

| หน้าจอ | Banner Ad |
|---|---:|
| Quick Result | ไม่แสดง |
| Locked Summary & Insight | ไม่แสดง |
| Unlocked Summary & Insight | ไม่แสดง |
| VIP Summary & Insight | ไม่แสดง |
| Review Attempt เก่า | ไม่แสดง |

## 6. Forced Interstitial Ad
ยังไม่อนุมัติ Forced Interstitial Ad ใน Mini Game Flow ปัจจุบัน

ห้ามแสดงโฆษณาบังคับ:
- ก่อน Quick Result
- ก่อน Summary & Insight
- หลังปลดล็อก Insight
- ก่อนเข้าด่านถัดไป
- ระหว่างกำลังตอบคำถาม

## 7. กรณีโฆษณาไม่สำเร็จ
หาก Rewarded Ad โหลดไม่สำเร็จ ถูกขัดจังหวะ หรือผู้ใช้ดูไม่ครบ:
- ไม่ให้ Reward ที่โฆษณาระบุ
- ไม่ปลดล็อก Insight จาก Action นั้น
- กลับไป State ก่อนกดดูโฆษณา
- ให้ลองใหม่ได้ตามความเหมาะสม

## 8. เรื่องที่ยังไม่กำหนดในไฟล์นี้
- กฎโฆษณานอก Mini Game
- โฆษณาใน Practice
- โฆษณาใน Mock Exam
- การทดลอง Interstitial หรือ Frequency Cap ในอนาคต
- รายละเอียด Compliance เรื่องอายุหรือการจัดประเภทโฆษณา
