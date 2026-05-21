Mini Game Flow Bible
Status
Current source of truth for the Mini Game flow in the PIP Bimodal Exam Prep Application.

Core Concept
Mini Game is a short 10-question practice challenge.

The user starts from the Practice page, enters the Mini Game, answers exactly 10 questions, then sees a result summary.

The result determines whether the user can proceed to the next stage.

Entry Point
The Mini Game starts when the user taps:

เริ่มตะลุยโจทย์
From the Practice page.

Mini Game Rules
Each Mini Game contains exactly 10 questions.
User answers one question at a time.
User cannot exceed 10 questions in one Mini Game round.
At the end of question 10, the app must show the Result screen.
Passing Rule
Passed
User passes if:

Correct answers are 8/10 or higher.
Passed examples:

8/10
9/10
10/10
Failed
User fails if:

Correct answers are lower than 8/10.
Failed examples:

0/10 to 7/10
Result Screen
The Result screen must show:

Correct answer count
Wrong answer count
Pass or fail status
Reward information
Passed Result Flow
If the user passes:

Show result summary.
Show pass status.
Allow the user to continue.
Ask whether the user wants to watch an ad for x2 ค่าประสบการณ์.
If user watches ad, reward = 200 ค่าประสบการณ์.
If user skips ad, reward = 100 ค่าประสบการณ์.
User can proceed to the next stage.
Failed Result Flow
If the user fails:

Show result summary.
Show fail status.
User cannot proceed to the next stage.
Show button text: กลับหน้าหลัก
User returns to the main Practice/Home flow.
Ad Choice Flow
The ad choice only appears after the user passes the Mini Game.

Watch Ad
If the user chooses to watch an ad:

Play 1 ad.
After ad is completed, user receives 200 ค่าประสบการณ์.
This equals x2 reward.
Skip Ad
If the user skips the ad:

User receives 100 ค่าประสบการณ์.
No bonus is applied.
VIP Behavior
If VIP is active:

No ads are shown.
User automatically receives x2 ค่าประสบการณ์.
Mini Game reward becomes 200 ค่าประสบการณ์ automatically.
UI Wording
Use
เริ่มตะลุยโจทย์
ผ่านเกณฑ์
ยังไม่ผ่าน
กลับหน้าหลัก
รับค่าประสบการณ์ x2
รับ 100 ค่าประสบการณ์
รับ 200 ค่าประสบการณ์
ค่าประสบการณ์
Do Not Use
EXP
XP
Experience Point
กลับหน้า Practice
Screen Flow
Design Rule

The Mini Game UI must follow:

Sprint & Mock - Design System.html Do Keep the flow short and clear. Make the 10-question structure obvious. Make pass/fail feedback easy to understand. Make x2 ค่าประสบการณ์ attractive but not annoying. Keep Thai wording consistent. Don't Do not add more than 10 questions per Mini Game. Do not allow next stage if user scores below 8/10. Do not show ad choice when the user fails. Do not use EXP/XP in Thai UI. Do not make VIP complicated.

Practice Page
    ↓
Tap เริ่มตะลุยโจทย์
    ↓
Mini Game Question 1
    ↓
Question 2
    ↓
...
    ↓
Question 10
    ↓
Result Screen
    ↓
If Passed → Ad Choice / Reward
    ↓
If Failed → กลับหน้าหลัก


