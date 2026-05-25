# ชุดเอกสาร Logic ของ PIP — ฉบับภาษาไทยสำหรับอ่านตรวจ

**สถานะ:** ฉบับแปลเพื่ออ่านและตรวจความเข้าใจ  
**วันที่:** 25/05/2026  
**เอกสารหลักสำหรับ AI / Codex / Claude Design:** ชุดภาษาอังกฤษในโฟลเดอร์ `EN_Source_of_Truth`

## กฎการใช้งาน
- ใช้ชุดภาษาไทยเพื่ออ่าน ตรวจ Logic และคุย Product Direction
- ให้ AI และ Developer ยึดชุดภาษาอังกฤษเป็น Source of Truth หลัก
- หากสองชุดไม่ตรงกัน ให้หยุด Implement และแก้เอกสารให้ตรงกันก่อน

## ไฟล์ที่แยกไว้
| ไฟล์ | เนื้อหา |
|---|---|
| `mini_game_flow.md` | Flow หน้าจอและพฤติกรรมภายใน Mini Game เท่านั้น |
| `mini_game_reward_logic.md` | ผล Reward 100/200 และการปลดล็อก Insight |
| `vip_subscription_logic.md` | สิทธิ์ VIP, Subscription, บัตร x2 และการยกเลิกสมาชิก |
| `reward_inventory_logic.md` | VIP 1 วันที่ได้จาก Level และการเก็บในคลัง |
| `ad_monetization_logic.md` | จุดที่อนุญาต/ไม่อนุญาตให้แสดงโฆษณาใน Mini Game |

## เรื่องที่ยังไม่อนุมัติ
- Practice Mode / Mock Exam
- Referral Reward
- Daily / Weekly / Event Reward
- Continue Ticket / EXP Protection
- Forced Interstitial Ad ใน Mini Game
