# PIP — Logic ของคลังรางวัล

**สถานะ:** Logic Inventory ที่อนุมัติปัจจุบัน  
**ขอบเขต:** VIP Reward ที่ได้รับจาก Level เท่านั้นในตอนนี้

## 1. ขอบเขต
ไฟล์นี้เก็บเฉพาะ Reward จาก Level ที่ยืนยันแล้ว และการเก็บ/เปิดใช้ Reward นั้น

ไม่กำหนด Flow หน้าจอ Mini Game, ราคา Subscription, จุดวางโฆษณา, Referral Reward, Daily Reward, Weekly Reward, Continue Ticket หรือ EXP Protection

## 2. Level Reward ที่อนุมัติ
| เงื่อนไข | Reward |
|---|---|
| ทุก 15 Level | VIP 1 วัน |

ตัวอย่าง:
| Level ที่ถึง | Reward ที่เข้าคลัง |
|---:|---|
| 15 | VIP 1 วัน |
| 30 | VIP 1 วัน |
| 45 | VIP 1 วัน |
| 60 | VIP 1 วัน |

## 3. กฎการเปิดใช้
VIP 1 วันที่ได้จาก Level ห้าม Active อัตโนมัติ

เมื่อได้รับ:
- เพิ่มเข้า Reward Inventory
- ผู้ใช้เลือกเปิดใช้เอง
- ระยะเวลา 24 ชั่วโมงเริ่มนับเมื่อผู้ใช้ยืนยันเปิดใช้

## 4. สถานะ Item
| State | ความหมาย |
|---|---|
| `available` | ได้รับแล้วแต่ยังไม่เปิดใช้ |
| `active` | กำลังใช้สิทธิ์อยู่ |
| `used` | ใช้ครบระยะเวลาแล้ว |
| `expired` | สงวนไว้หากอนาคตกำหนดวันหมดอายุก่อนเปิดใช้ |

ปัจจุบันยังไม่อนุมัติกฎว่า Item ที่ยังไม่เปิดใช้จะหมดอายุเมื่อใด

## 5. ขอบเขต Benefit
Benefit ที่ Mini Game ใช้งานจริงให้อ้างอิง `vip_subscription_logic.md`

ข้อจำกัดที่ล็อกแล้ว:
| Reward | ได้บัตรค่าประสบการณ์ x2 |
|---|---:|
| VIP 1 วันจาก Level | 0 |

## 6. ข้อมูล Inventory ที่ต้องเก็บ
| Field | ความหมาย |
|---|---|
| `reward_item_id` | ID ของ Reward Item |
| `reward_type` | `vip_reward_1_day` |
| `reward_source` | `level_reward` |
| `source_level` | Level ที่สร้าง Reward |
| `received_at` | เวลาที่เข้า Inventory |
| `activated_at` | เวลาที่กดเปิดใช้ |
| `expires_at` | เวลา 24 ชั่วโมงหลังเปิดใช้ |
| `status` | `available`, `active`, `used`, หรือ `expired` |

## 7. Reward History
VIP Reward ที่ใช้แล้วต้องยังอยู่ใน Reward History โดยแสดง:
- ชื่อ Reward
- Level ที่ได้รับ
- วันที่ได้รับ
- วันที่เริ่มใช้
- วันที่หมดสิทธิ์
- สถานะสุดท้าย

## 8. เรื่องที่ยังไม่อนุมัติ
- จำนวน VIP Reward สูงสุดที่เก็บได้
- วันหมดอายุก่อนกดเปิดใช้
- การซ้อน VIP Reward หลายชิ้นพร้อมกัน
- Referral Reward
- Daily / Weekly Reward
- Continue Ticket
- EXP Protection
- Event Reward
