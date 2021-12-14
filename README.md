### READ ME ###
## Flush data 1 days
1. ลง nodejs version ล่าสุด
2. สำหรับ window ให้ลง choco ด้วย powershell
https://chocolatey.org/

3. ต้องลง Microsoft Visual Studio (ประมาณ 6-8 gb เลยมันเป็น Engine สำหรับ dev c++  ไม่งั้นมันจะ read จอไม่ได้)
https://visualstudio.microsoft.com/

4. เปิด vs code (ด้วยสิทธิ์ admin) แล้วไปที่ โปรเจค
4.1 npm i

พอลง environment ได้แล้ว ให้ทดสอบ run node
nodejs capture.js

(Code เริ่มแรก จะอยู่ที่ /src/controller.js ฟังก์ชัน automove)

เพิ่มเติม
1. สำหรับการหาตำแหน่งจอ ให้ใช้ MS Paint ดู x,y ซ้ายล่าง เพื่อให้เม้าส์ไปที่ตำแหน่งนั้นๆ
2. คำสั่งเพิ่มเติมดูได้ที่ https://github.com/octalmage/robotjs 
   โดยฟีเจอร์ที่ทำได้มีดังนี้
2.1 ควบคุมเมาส์
2.2 ควบคุมคีย์บอร์ด
2.3 เทียบสี แคปภาพ เทียบภาพ บอทตัวนี้ยังไม่สามารถทำ object detetction ได้

v1.0

v1.8
เตรียมแผนที่จะเพิ่ม Algorithm ตัวใหม่
ฟังก์ชัน SHORT TRADE [เหรียญที่ Focused : SOL]
const base_price = 180

base_price จะอัปเดตไปตาม แท่งกราฟ 15 นาที ขึ้น/ลง ตามนั้น ซื้อ/ขาย ตาม base price 
