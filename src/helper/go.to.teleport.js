var robot = require("robotjs");

const core = require('../core/core.main.js');
const coreimage = require('../core/core.image.js');

const bwings = require('./use.bwing.js');

module.exports = {
    do: async function(channel) {
        await core.sleep(1);

        await bwings.do();
        console.log('กลับเมือง')

        await core.sleep(2);
        // เปิดแผนที่ขวาบน
        robot.moveMouse(1641, 178);
        robot.mouseClick();

        // ไปที่ npc teleport
        await core.sleep(1);
        robot.moveMouse(1495, 574);
        robot.mouseClick();

        // ถึงที่ npc หรือยัง
        // var container = { x: 720, y: 853, color: '#f3be1d', color2: '#f0a71a' }
        // robot.moveMouse(container.x, container.y);
        // await core.sleep(0.5);
        // await core.colorcheck(container);

        // รอ 13 วิ
        await core.sleep(13);

        // คุยกับ npc
        await core.sleep(1);
        robot.moveMouse(683, 747);
        robot.mouseClick();
        robot.mouseClick();

        // ปิดแจ้งเตือน
        // สีเขยวๆ ทุกสัปดาห์
        await core.sleep(1);

        // robot.moveMouse(1053, 763);
        // robot.moveMouse(1115, 766);
        // if (core.isColor({ x: 1115, y: 766, color: '#46a60e' }))
        //     robot.mouseClick();
        // 

        //920, 721
        const lslsls = await coreimage.fastdiff({ x: 920, y: 721, name2: 'teleport7daysconfig.png' })
        if (lslsls) {
            console.log('เจอภาพ')
            robot.moveMouse(1115, 766);
            await core.sleep(1);
            robot.mouseClick();
        } else {
            console.log('ไม่เจอค่ะ')
        }

        await core.sleep(1);

        // เลือก เส้นโลก
        await core.sleep(1);
        robot.moveMouse(1542, 584);
        robot.mouseClick();
        await core.sleep(1);

        // เลือก ภาษา TH
        robot.moveMouse(612, 741);
        robot.mouseClick();
        await core.sleep(0.5);
        robot.moveMouse(459, 462);
        robot.mouseClick();
        await core.sleep(1);

        // กรอก Channel 1
        robot.moveMouse(1469, 260);
        robot.mouseClick();
        await core.sleep(1);
        robot.typeString(channel);
        await core.sleep(1);

        // กดตกลงเลือก Channel
        robot.moveMouse(1662, 942);
        robot.mouseClick();

        // กด ปุ่ม กระโดดข้ามเส้นโลก
        await core.sleep(0.5);
        robot.moveMouse(1279, 926);
        robot.mouseClick();

        //920, 721
        const asasas = await coreimage.fastdiff({ x: 920, y: 721, name2: 'teleport7daysconfig.png' })
        if (asasas) {
            console.log('เจอภาพ')
            robot.moveMouse(1115, 766);
            await core.sleep(1);
            robot.mouseClick();
        } else {
            console.log('ไม่เจอค่ะ')
        }

        // รอ 4 วิ (ย้าย channel)
        await core.sleep(4);

        // ปิดแทป
        await core.sleep(0.5);
        robot.moveMouse(1701, 214);
        robot.mouseClick();
    },

    listenMusic: async function() {
        await bwings.do();
        console.log('กลับเมือง')

        await core.sleep(2);
        // เปิดแผนที่ขวาบน
        robot.moveMouse(1641, 178);
        robot.mouseClick();

        // ไปที่ kafra
        await core.sleep(1);
        robot.moveMouse(1445, 568);
        robot.mouseClick();

        // รอ 7 วิ
        await core.sleep(7);

        // คุยกับ kafra
        robot.moveMouse(750, 463);
        robot.mouseClick();
        robot.mouseClick();

        // เลือก teleport -> south gate
        await core.sleep(1);
        robot.moveMouse(1531, 683);
        robot.mouseClick();
        await core.sleep(1);
        robot.moveMouse(1463, 516);
        robot.mouseClick();
        await core.sleep(1);

        // รอ 10 วิ โหลด Screen
        await core.sleep(10);

        // ไปฟังเพลง
        robot.moveMouse(1486, 400);
        robot.mouseClick();
        robot.mouseClick();

        await core.sleep(15);

        // รอ 33 นาที ฟั งเพลง
        await core.sleep(3760);
        // await core.sleep(60);

        // ถึงที่ npc หรือยัง
        // var container = { x: 673, y: 847, color: '#e6bc38' }
        // robot.moveMouse(container.x, container.y);
        // await core.sleep(0.5);
        // await core.colorcheck(container);
        // console.log('ถึงคาฟราแล้ว')




    },
}