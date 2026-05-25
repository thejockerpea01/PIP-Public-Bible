# PIP — Flow ของ Mini Game

**สถานะ:** Logic ของ Flow เกมที่อนุมัติปัจจุบัน  
**ขอบเขต:** หน้าจอและพฤติกรรมภายใน Mini Game เท่านั้น  
**อ้างอิง Logic ภายนอก:** `mini_game_reward_logic.md`, `vip_subscription_logic.md`, `reward_inventory_logic.md`, `ad_monetization_logic.md`  
**Design Source of Truth:** `Sprint & Mock - Design System.html`

---

## 1. ขอบเขตของไฟล์นี้
ไฟล์นี้เก็บเฉพาะประสบการณ์ภายในเกม:
- หน้า Main / Stage Path ของ Mini Game
- เริ่มเล่นด่าน
- ตอบคำถาม 10 ข้อ
- ผ่าน / ไม่ผ่าน
- หน้า Quick Result
- State ของหน้า Summary & Insight
- การย้อนดู Attempt เก่า
- Navigation ภายในเกม

ไฟล์นี้ไม่กำหนดราคา VIP, Package Subscription, จำนวนบัตร x2, ตาราง Reward จาก Level, Billing Cycle หรือกฎเชิงธุรกิจของโฆษณา

## 2. Mini Game เป็นโหมดแยก
- Mini Game เป็นโหมดแยกจาก Practice
- ห้ามวาง Flow ว่า Mini Game อยู่ในหน้า Practice
- ระหว่างที่ยังไม่ล็อก Navigation หลัก ให้เรียกหน้าทางเข้าว่า `Mini Game Main Entry`
- ปุ่มเริ่มเล่นคือ `เริ่มตะลุยโจทย์`

## 3. หน้า Mini Game Main Entry / Stage Path
หน้า Stage Path ต้องให้ผู้ใช้:
- ดูเส้นทางด่าน
- เริ่มด่านที่เปิดให้เล่น
- เห็นด่านที่ยังล็อก
- ย้อนดูด่านที่เคยเล่น
- เปิด Attempt เก่าเพื่อทบทวน

### สถานะด่าน
| State | ความหมาย | เมื่อกด |
|---|---|---|
| `locked` | ยังไม่ผ่านเงื่อนไขเปิดด่าน | กดเล่นไม่ได้ |
| `available` | ด่านที่เล่นได้ปัจจุบัน | เริ่ม Attempt ใหม่ 10 ข้อ |
| `completed_insight_unlocked` | Attempt ที่จบแล้วเปิด Insight แล้ว | เปิด Summary & Insight |
| `completed_insight_locked` | มี Attempt แต่ Insight ยังล็อก | เปิดหน้า Locked Insight |
| `failed_attempt` | เคยเล่นแต่ไม่ผ่าน | เปิด Review; ด่านถัดไปยังล็อก |

### กรณีมีหลาย Attempt
- หนึ่งด่านอาจถูกเล่นหลายครั้ง
- เมื่อกดด่านที่เคยเล่น ให้เปิด Attempt ล่าสุดเป็นค่าเริ่มต้น
- ในหน้าทบทวนต้องมีทางเข้าดู Attempt ก่อนหน้า
- Insight ต้องเก็บสถานะแยกตาม Attempt ไม่ใช่เฉพาะ Stage

## 4. การเล่นในหนึ่งด่าน
- 1 ด่านมีคำถาม 10 ข้อ
- ตอบทีละข้อ
- เมื่อตอบข้อที่ 10 ให้เข้าสู่ Quick Result ทันที

```text
Mini Game Main Entry
  → เริ่มด่านที่เปิดอยู่
  → คำถามข้อ 1 … ข้อ 10
  → Quick Result
```

## 5. ผ่าน / ไม่ผ่าน และ Progression
| คะแนน | ผลลัพธ์ | ด่านถัดไป |
|---:|---|---|
| 8/10, 9/10, 10/10 | `passed` | เปิดได้ตาม Progression |
| 0/10–7/10 | `failed` | ยังไม่เปิด |

กฎ:
- ผ่าน/ไม่ผ่านใช้ควบคุม Progression เท่านั้น
- คนที่ไม่ผ่านยังทบทวนหรือปลดล็อก Insight ได้ตามสิทธิ์ภายนอก
- การดู Insight ไม่ทำให้ Failed กลายเป็น Passed
- ต้องเล่น Attempt ใหม่และผ่านจริง จึงจะเปิดด่านถัดไปได้

## 6. หน้า Quick Result
Quick Result แสดงทันทีหลังตอบข้อที่ 10

ผู้ใช้ทุกคนต้องเห็น:
- คะแนน
- จำนวนข้อถูกและข้อผิด
- สถานะ `ผ่านเกณฑ์` หรือ `ยังไม่ผ่าน`
- ค่าประสบการณ์พื้นฐาน `100 ค่าประสบการณ์`
- Action ถัดไปที่สิทธิ์ของ User อนุญาต

กฎ:
- ห้ามซ่อนคะแนนหรือผลผ่าน/ไม่ผ่านหลังโฆษณา, VIP Prompt หรือ Insight Lock
- Action เรื่อง Reward ให้อ้างอิง `mini_game_reward_logic.md`
- สิทธิ์การเปิด Insight ให้อ้างอิง `vip_subscription_logic.md`

ตัวอย่างข้อความ:
- ผ่าน: `ผ่านเกณฑ์!` / `คุณตอบถูก 8 / 10 ข้อ`
- ไม่ผ่าน: `ยังไม่ผ่าน` / `คุณตอบถูก 6 / 10 ข้อ`

## 7. หน้า Summary & Insight

### Locked State
หน้า Locked แสดงได้:
- คะแนนเดิม
- ผลผ่าน/ไม่ผ่าน
- Reward ที่ยืนยันแล้ว หากมี
- ข้อความว่า Insight ยังล็อก
- Action ที่ใช้ปลดล็อกตาม Logic ภายนอก

ห้ามแสดงเฉลยเต็มก่อนปลดล็อก

### Unlocked State
เมื่อปลดล็อกแล้ว ต้องแสดง:
- คะแนนรวมและผลผ่าน/ไม่ผ่าน
- จำนวนข้อถูกและผิด
- คำถามครบ 10 ข้อ
- คำตอบที่ User เลือกและคำตอบที่ถูกของทุกข้อ
- คำอธิบายทุกข้อ
- หัวข้อที่พลาด / จุดอ่อน
- คำแนะนำจาก PIP ว่าควรทบทวนอะไรต่อ

### การเปิดซ้ำ
Attempt ที่มี `insight_status = unlocked` ต้องกลับมาเปิด Summary & Insight ได้เสมอ

## 8. การย้อนดู Attempt เก่า

### Attempt ที่เปิด Insight แล้ว
- เปิด Summary & Insight ทันที
- ไม่เปลี่ยน Reward, คะแนน, ผลผ่าน/ไม่ผ่าน หรือ Progression
- ไม่สร้าง Attempt ใหม่

### Attempt ที่ Insight ยังล็อก
- เปิดหน้า Locked Summary & Insight
- แสดง Action สำหรับปลดล็อกตาม Logic ภายนอก
- หากสิทธิ์ภายนอกอนุญาต ให้บันทึก Attempt เป็น Unlocked และเปิด Insight

### Hook สำหรับสิทธิ์ภายนอก
Flow ต้องรองรับสิทธิ์ภายนอกที่สามารถเปิด Attempt ที่ Locked ได้ทันที โดยกฎสิทธิ์อยู่ในไฟล์ระบบอื่น

### Review ไม่ใช่ Replay
| การกระทำ | Reward ใหม่ | Progress ใหม่ | Attempt ใหม่ |
|---|---:|---:|---:|
| เปิด Insight ที่ปลดล็อกแล้ว | ไม่ได้ | ไม่ได้ | ไม่สร้าง |
| ปลดล็อกแล้วเปิด Insight เก่า | ไม่ได้ | ไม่ได้ | ไม่สร้าง |
| ดู Attempt ที่ไม่ผ่าน | ไม่ได้ | ไม่ได้ | ไม่สร้าง |

## 9. Navigation
เมื่อผ่าน ปุ่มที่ใช้ได้ตาม State:
- `ดู Insight`
- `ไปด่านถัดไป`
- `กลับหน้าหลัก`

เมื่อไม่ผ่าน:
- `ดู Insight`
- `เล่นใหม่`
- `กลับหน้าหลัก`

ห้ามมีปุ่มใน Failed Attempt:
- `ไปด่านถัดไป`

ห้ามใช้คำ:
- `กลับหน้า Practice`

## 10. ข้อมูลที่ Game UI ต้องใช้

### Stage Data
| Field | ความหมาย |
|---|---|
| `stage_id` | ID ของด่าน |
| `stage_number` | ลำดับด่านที่แสดง |
| `stage_access_status` | `locked`, `available`, `completed` |
| `latest_attempt_id` | Attempt ล่าสุด หากมี |
| `latest_attempt_result` | `passed` หรือ `failed` |
| `latest_attempt_score` | คะแนน Attempt ล่าสุด |
| `latest_attempt_insight_status` | `locked` หรือ `unlocked` |
| `attempt_count` | จำนวน Attempt ของด่าน |
| `next_stage_unlocked` | ด่านถัดไปเปิดแล้วหรือยัง |

### Attempt Data ที่ UI ต้องอ่าน
| Field | ความหมาย |
|---|---|
| `attempt_id` | ID ของ Attempt |
| `stage_id` | ด่านของ Attempt |
| `completed_at` | วันเวลาที่เล่นจบ |
| `correct_count` | จำนวนข้อถูก |
| `wrong_count` | จำนวนข้อผิด |
| `result_status` | `passed` หรือ `failed` |
| `final_reward_display` | ค่า Reward จาก Reward Logic |
| `insight_status` | `locked` หรือ `unlocked` |
| `insight_unlocked_at` | เวลาที่เปิด Insight หากมี |

## 11. คำที่อนุมัติบน UI
ใช้:
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

ห้ามใช้:
- `EXP`
- `XP`
- `กลับหน้า Practice`

## 12. กฎเกมที่ล็อกแล้ว
- Mini Game แยกจาก Practice
- 1 Stage มี 10 ข้อ
- ผ่านเมื่อได้อย่างน้อย 8/10
- หลังข้อที่ 10 ต้องเห็น Quick Result ทันที
- Failed Attempt ไปด่านถัดไปไม่ได้ แต่ยัง Review ได้
- Stage Path ต้องย้อนดู Attempt เก่าได้
- Summary & Insight มี State Locked / Unlocked
- Insight ที่เปิดแล้วดูซ้ำได้ถาวรใน Attempt นั้น
- Review ไม่ให้ Progress ใหม่และไม่เปลี่ยนผลเดิม
- รายละเอียด Reward, VIP, Subscription และโฆษณาอยู่ในไฟล์ระบบแยก
