# PIP — Logic ของ VIP และ Subscription

**สถานะ:** Logic VIP ที่อนุมัติปัจจุบัน  
**ขอบเขต:** สิทธิ์ VIP ที่ Mini Game เรียกใช้ และกฎสมาชิกแบบชำระเงิน  
**อ้างอิง:** `mini_game_flow.md`, `mini_game_reward_logic.md`

## 1. ประเภท VIP
| ประเภท | แหล่งที่มา |
|---|---|
| `vip_reward` | สิทธิ์ VIP ที่ได้จาก Reward ของ Level |
| `vip_subscription` | สมาชิกแบบชำระเงิน |

ทั้งสองแบบเปิด Insight ได้ทันทีขณะ Active แต่ไม่ได้รับบัตร x2 เหมือนกัน

## 2. Benefit ที่ VIP ใช้กับ Mini Game
เมื่อ VIP Active:
- Attempt ที่เพิ่งจบเปิด Insight ได้ทันที โดยไม่ต้องดูโฆษณาเพื่อปลดล็อก
- Attempt เก่าที่ยัง Locked เปิด Insight ได้ทันที
- Attempt ที่เปิดระหว่าง VIP Active ถูกบันทึกเป็น Unlocked ถาวร
- หลัง VIP หมด Attempt ที่เปิดแล้วก็ยังอ่านได้
- VIP ไม่ได้ค่าประสบการณ์ x2 อัตโนมัติไม่จำกัด

## 3. VIP Reward
ตารางการได้รับ VIP Reward อยู่ในไฟล์ `reward_inventory_logic.md`

เมื่อ `vip_reward` Active จะมีสิทธิ์:
| Benefit | มีหรือไม่ |
|---|---:|
| เปิด Insight ทันที | มี |
| บันทึก Insight ถาวรหลังเปิด | มี |
| ค่าประสบการณ์ x2 อัตโนมัติ | ไม่มี |
| บัตรค่าประสบการณ์ x2 | 0 |

หากผู้ใช้ VIP Reward ต้องการ 200 ค่าประสบการณ์ ให้เลือกดู Rewarded Ad หลังเล่นจบ

## 4. VIP Subscription
| Plan | ราคา |
|---|---:|
| VIP Subscription | 199 บาท / เดือน |

### Benefit สำหรับ Mini Game
| Benefit | มีหรือไม่ |
|---|---:|
| เปิด Insight ทันที | มี |
| บันทึก Insight ถาวรหลังเปิด | มี |
| ค่าประสบการณ์ x2 อัตโนมัติไม่จำกัด | ไม่มี |
| บัตรค่าประสบการณ์ x2 | 10 ชิ้นต่อรอบชำระเงิน |

## 5. บัตรค่าประสบการณ์ x2
### ชื่อ
- บน UI: `บัตรค่าประสบการณ์ x2`
- ในเอกสาร/Code: `x2 Experience Ticket`

### จำนวนที่ได้รับ
| สิทธิ์ | จำนวนบัตร |
|---|---:|
| Free User | 0 |
| VIP Reward | 0 |
| VIP Subscription Active | 10 ต่อรอบชำระเงิน |

### การใช้
ผู้ใช้ VIP Subscription สามารถใช้บัตร 1 ชิ้นหลังจบ Attempt เพื่อเปลี่ยน Reward จาก 100 เป็น 200 ค่าประสบการณ์ โดยไม่ดูโฆษณา

### ข้อจำกัด
- ใช้สูงสุด 1 ชิ้นต่อ Attempt
- ใช้ได้เฉพาะตอนเลือกรางวัลทันทีหลังจบด่าน
- ใช้ย้อนหลังจากหน้า Locked Insight, History หรือ Review ไม่ได้
- ใช้ซ้อนกับ Rewarded Ad ไม่ได้
- Reward สูงสุดต่อ Attempt ยังคงเป็น 200
- บัตรที่ไม่ได้ใช้ไม่ทบยอดไป Billing Cycle ถัดไป
- เมื่อชำระรอบใหม่สำเร็จ ระบบจัดสรรบัตรใหม่ 10 ชิ้น

## 6. ตัวเลือกหลังจบ Attempt สำหรับ VIP Subscription
### เมื่อยังมีบัตร
| Action | Reward | ใช้บัตร | ต้องดู Ad |
|---|---:|---:|---:|
| รับ Reward พื้นฐาน | 100 | 0 | ไม่ต้อง |
| ใช้บัตร x2 | 200 | 1 | ไม่ต้อง |
| ดู Rewarded Ad แทน | 200 | 0 | ต้องดู |

ข้อความ UI:
- `ใช้บัตร x2 รับ 200 ค่าประสบการณ์`
- `เหลือบัตร x2: 7 / 10 ชิ้นในรอบนี้`
- `รับ 100 ค่าประสบการณ์`
- `ดูโฆษณาแทนการใช้บัตร`

### เมื่อบัตรหมด
| Action | Reward | ต้องดู Ad |
|---|---:|---:|
| รับ Reward พื้นฐาน | 100 | ไม่ต้อง |
| ดู Rewarded Ad | 200 | ต้องดู |

## 7. การยกเลิกและวันหมดสิทธิ์
เมื่อผู้ใช้ยกเลิก VIP Subscription:
- เป็นการหยุดต่ออายุในรอบถัดไป
- ห้ามตัดสิทธิ์ที่ชำระเงินแล้วทันที
- ผู้ใช้ยังเป็น VIP จนถึงเวลาหมดสิทธิ์จาก Store หรือ Backend
- ใช้ `subscription_expires_at` เป็น Source of Truth
- ห้าม Hardcode ว่าหมดอายุใน 30 วันพอดีหรือวันสุดท้ายของเดือน

### Cancelled แต่ยังใช้สิทธิ์อยู่
ใช้สถานะ:
- `cancelled_active_until_end`

สถานะนี้ทำงานเหมือน VIP Subscription Active จนถึง `subscription_expires_at`

### สิทธิ์ระหว่างยังไม่หมดรอบ
| Benefit | ใช้ได้หรือไม่ |
|---|---:|
| เปิด Insight ทันที | ได้ |
| บันทึก Insight ถาวร | ได้ |
| ใช้บัตร x2 ที่เหลือในรอบ | ได้ |
| เลือกดู Rewarded Ad แทนบัตร | ได้ |
| รับบัตรชุดใหม่หลังหมดอายุโดยไม่ต่อสมาชิก | ไม่ได้ |

### เมื่อหมดอายุ
- สิทธิ์ VIP สิ้นสุด หากไม่มี Entitlement อื่น Active
- บัตร x2 ที่เหลือถูกลบ
- ไม่เติมบัตรรอบใหม่หากไม่มีสมาชิก Active
- Insight ที่เปิดแล้วก่อนหมดสิทธิ์ยังดูได้ถาวร

## 8. ข้อมูลสิทธิ์ที่ต้องเก็บ
| Field | ความหมาย |
|---|---|
| `vip_type` | `vip_reward` หรือ `vip_subscription` |
| `subscription_status` | `active`, `cancelled_active_until_end`, หรือ `expired` |
| `auto_renew_enabled` | ต่ออายุอัตโนมัติหรือไม่ |
| `billing_cycle_start` | วันเริ่มรอบชำระเงินปัจจุบัน |
| `billing_cycle_end` | วันสิ้นสุดรอบปัจจุบัน |
| `cancelled_at` | เวลาที่ยกเลิก หากมี |
| `subscription_expires_at` | เวลาหมดสิทธิ์ที่ตรวจสอบแล้ว |
| `x2_ticket_monthly_allocation` | `10` สำหรับ Paid Subscription |
| `x2_ticket_remaining` | จำนวนบัตรที่ใช้ได้ในรอบปัจจุบัน |

## 9. กฎที่ล็อกแล้ว
- VIP เปิด Insight ได้ทันทีขณะ Active
- Insight ที่เปิดผ่าน VIP ถูกบันทึกถาวร
- VIP ไม่ได้ x2 อัตโนมัติแบบไม่จำกัด
- VIP Reward ได้บัตร x2 จำนวน 0 ชิ้น
- VIP Subscription ราคา 199 บาท / เดือน
- VIP Subscription ได้บัตร x2 10 ชิ้นต่อรอบชำระเงิน
- ยกเลิก Subscription แล้วยังใช้สิทธิ์ถึงเวลาหมดรอบจริง
- บัตรที่เหลือใช้ได้ระหว่าง Cancelled แต่ยัง Active
- บัตรที่เหลือถูกลบเมื่อสิทธิ์ Paid หมด
