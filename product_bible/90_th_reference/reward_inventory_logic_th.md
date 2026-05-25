# PIP — Logic คลัง Reward จาก Level

**สถานะ:** Logic ที่อนุมัติปัจจุบัน / เอกสารภาษาไทยสำหรับอ่านตรวจ  
**วันที่:** 25/05/2026  
**ขอบเขต:** การเก็บและใช้ Reward ที่ได้รับจาก Level เท่านั้น  
**อ้างอิง:** `level_reward_bible_th.md`

---

## 1. ขอบเขต

ไฟล์นี้กำหนดการเก็บและการใช้ Item ที่ได้รับจาก Level Reward

ไฟล์นี้ไม่กำหนด Flow ภาพหน้าจอ Mini Game, จุดวางโฆษณา, บัตรรายเดือนจาก Paid VIP, Billing หรือ Reward อื่นที่ยังไม่อนุมัติ

---

## 2. Item ในคลัง Reward จาก Level

| Item Type | ชื่อบน UI | Source |
|---|---|---|
| `x2_experience_ticket_level` | `บัตรค่าประสบการณ์ x2` | Level Reward |
| `x2_insight_ticket_level` | `บัตร x2 + ปลดล็อก Insight` | Level Reward |
| `vip_reward_1_day` | `VIP 1 Day` | Level Reward |

สำคัญ:
- `บัตรค่าประสบการณ์ x2` ที่ได้จาก Level ต้องแยก Source ในข้อมูลออกจากบัตรรายเดือนของ VIP Subscription
- บัตรจาก Level ใช้กฎไม่มีวันหมดอายุและสะสมไม่จำกัดตามไฟล์นี้
- บัตรจาก Paid VIP ให้ไปอิงเอกสาร VIP Subscription แยก

---

## 3. เหตุการณ์ที่ทำให้ Item เข้าคลัง

| เงื่อนไข | Item ที่เพิ่ม | จำนวน |
|---|---|---:|
| เริ่มบัญชีที่ Level 1 ครั้งแรก | `x2_insight_ticket_level` | 3 |
| ถึง Level ที่ลงท้ายด้วย 1 หลัง Level 1 | `x2_insight_ticket_level` | 3 |
| ถึง Level ที่หาร 5 ลงตัวแต่ไม่หาร 15 ลงตัว | `x2_experience_ticket_level` | 2 |
| ถึง Level ที่หาร 15 ลงตัว | `vip_reward_1_day` และ `x2_experience_ticket_level` | อย่างละ 1 |

---

## 4. กฎ Inventory ของบัตร

### 4.1 บัตรค่าประสบการณ์ x2 จาก Level

| หัวข้อ | กฎ |
|---|---|
| Item Type | `x2_experience_ticket_level` |
| วันหมดอายุ | ไม่มี |
| จำนวนที่เก็บได้ | ไม่จำกัด |
| ใช้ | 1 ใบต่อ Reward Action ที่รองรับ |
| ผลลัพธ์ | รับ 200 ค่าประสบการณ์โดยไม่ดูโฆษณา |
| เปิด Insight | ไม่เปิด |

### 4.2 บัตร x2 + ปลดล็อก Insight จาก Level

| หัวข้อ | กฎ |
|---|---|
| Item Type | `x2_insight_ticket_level` |
| วันหมดอายุ | ไม่มี |
| จำนวนที่เก็บได้ | ไม่จำกัด |
| ใช้ | 1 ใบต่อ Reward Action ที่รองรับ |
| ผลลัพธ์ | รับ 200 ค่าประสบการณ์โดยไม่ดูโฆษณา และเปิด Insight ถาวรสำหรับ Attempt นั้น |

### 4.3 กฎร่วมของบัตรจาก Level

- ใช้ได้เฉพาะจังหวะเลือกรางวัลทันทีหลังจบ Attempt ที่รองรับ
- ใช้ย้อนหลังหลัง User ยืนยันรับ Reward แล้วไม่ได้
- ใช้เปลี่ยน Reward ของ Attempt เก่าที่กำลัง Review ไม่ได้
- ตัดบัตรออกจากคลังเมื่อ Action สำเร็จเท่านั้น
- Reward สูงสุดต่อ Mini Game Attempt ยังคงเป็น 200 ค่าประสบการณ์

---

## 5. กฎ Inventory ของ VIP 1 Day

| หัวข้อ | กฎ |
|---|---|
| Item Type | `vip_reward_1_day` |
| ได้จาก | ทุก 15 Level |
| การเปิดใช้ | ผู้ใช้กดยืนยันเปิดใช้เอง |
| ระยะเวลา Active | 24 ชั่วโมงหลังเปิดใช้ |
| บัตร x2 ที่ได้ตอนเปิดใช้ | 0 |

เมื่อเปิดใช้ Item นี้ สิทธิ์ VIP ที่เกิดขึ้นให้ไปอิงเอกสาร `vip_subscription_logic.md`

### เรื่องที่ยังไม่ได้อนุมัติสำหรับ VIP 1 Day

- วันหมดอายุก่อนกดเปิดใช้
- จำนวน VIP 1 Day ที่เก็บสะสมสูงสุด
- การใช้ซ้อนหรือต่อเวลาหากมี VIP Active อยู่แล้ว

---

## 6. State ของ Inventory

### State ของบัตร

| State | ความหมาย |
|---|---|
| `available` | อยู่ในคลังและพร้อมใช้ |
| `consumed` | ใช้สำเร็จกับ Attempt แล้ว |

บัตรจาก Level ไม่มี State `expired` เพราะไม่มีวันหมดอายุ

### State ของ VIP Reward

| State | ความหมาย |
|---|---|
| `available` | ได้รับแล้วแต่ยังไม่เปิดใช้ |
| `active` | เปิดใช้งานและยังอยู่ในช่วง 24 ชั่วโมง |
| `used` | ใช้งานครบเวลาแล้ว |
| `expired` | สงวนไว้หากอนาคตมีกฎวันหมดอายุก่อนเปิดใช้ |

---

## 7. ข้อมูล Inventory ที่ต้องเก็บ

### Field กลาง

| Field | ความหมาย |
|---|---|
| `reward_item_id` | ID Item ในคลัง |
| `reward_type` | ประเภท Item |
| `reward_source` | สำหรับไฟล์นี้ต้องเป็น `level_reward` |
| `source_level` | Level ที่ได้รับ หรือ `initial_level_1_grant` |
| `received_at` | วันที่ได้รับเข้า Inventory |
| `status` | สถานะปัจจุบัน |

### Field สำหรับบัตร

| Field | ความหมาย |
|---|---|
| `consumed_at` | เวลาที่ใช้สำเร็จ หากใช้แล้ว |
| `consumed_attempt_id` | Attempt ที่ใช้บัตร หากใช้แล้ว |
| `expires_at` | ต้องเป็น `null` สำหรับบัตรจาก Level |

### Field สำหรับ VIP 1 Day

| Field | ความหมาย |
|---|---|
| `activated_at` | เวลาที่ User ยืนยันเปิดใช้ |
| `expires_at` | เวลา 24 ชั่วโมงหลังเปิดใช้ |
| `entitlement_type` | `vip_reward` |

---

## 8. Reward History

### บัตรที่ใช้แล้วต้องเก็บประวัติ

- ชื่อบัตร
- Level หรือ Initial Grant ที่ได้รับ
- วันที่ได้รับ
- วันที่ใช้
- Attempt ที่ใช้
- ผลของบัตร: `x2_only` หรือ `x2_and_insight_unlock`

### VIP 1 Day ที่ใช้แล้วต้องเก็บประวัติ

- ชื่อ Reward
- Level ที่ได้รับ
- วันที่ได้รับ
- วันที่เปิดใช้
- วันที่สิทธิ์หมด
- สถานะสุดท้าย

---

## 9. แยกจากบัตรของ Paid VIP Subscription

แม้บัตร x2 จาก Level และบัตรรายเดือนของ Paid VIP อาจให้ผลใกล้กัน แต่ต้องเก็บ Source แยกกัน

| หัวข้อ | บัตรจาก Level | บัตรจาก Paid VIP |
|---|---|---|
| Source | Level Reward | Billing Cycle ของ Subscription |
| วันหมดอายุ | ไม่มี | อิงเอกสาร Subscription |
| จำนวนสะสม | ไม่จำกัด | อิงเอกสาร Subscription |
| Insight Unlock ของบัตร x2 ธรรมดา | ไม่เปิด | อิงเอกสารระบบที่เกี่ยวข้อง |

ห้ามนำกฎ “ไม่มีวันหมดอายุ / ไม่จำกัดจำนวนสะสม” ของไฟล์นี้ไปใช้กับบัตรรายเดือน Paid VIP

---

## 10. กฎที่ล็อกแล้ว

- Reward จาก Level ต้องถูกเก็บใน Inventory
- บัตรจาก Level ทั้งสองประเภทไม่มีวันหมดอายุ
- บัตรจาก Level ทั้งสองประเภทสะสมได้ไม่จำกัด
- Initial Reward ของ Level 1 แจกครั้งเดียวต่อบัญชี
- VIP 1 Day จาก Level ต้องให้ผู้ใช้กดเปิดใช้เอง
- การเปิด VIP 1 Day ไม่แจกบัตร x2 เพิ่ม
- การใช้บัตรต้องบันทึกต่อ Attempt
- กฎบัตรของ Paid VIP Subscription ต้องแยกและห้ามถูก override โดยไฟล์นี้
