var robot = require("robotjs");

const core = require('./core.main.js');
const bwings = require('../helper/use.bwing.js');


module.exports = {
    init: async function() {
        await core.sleep(1);

        await core.stopTap();

        await bwings.do();
        console.log('กลับเมือง')

        // open map
        await core.openTap();
        console.log('open tap')

        // ค้นหา kafra
        robot.moveMouse(1478, 817);
        await core.sleep(1);
        robot.mouseClick();

        // open navigate
        robot.moveMouse(942, 216);
        await core.sleep(1);
        robot.mouseClick();

        // choose kafra from map (คุยกับ kafra)
        robot.moveMouse(898, 511);
        await core.sleep(1);
        robot.mouseClick();

        // รอ 7 วิ
        await core.sleep(7);

        // เลือก teleport 
        await core.sleep(1);
        robot.moveMouse(1531, 683);
        robot.mouseClick();

        // -> rachel 
        await core.sleep(1);
        // robot.moveMouse(1463, 516);
        // เลือกเมือง
        robot.moveMouse(755, 410);

        // เลื่อนมา
        // robot.mouseToggle("up");

        await core.sleep(1);

        // check macro
        robot.moveMouse(1765, 351);
        await core.sleep(1);
        var c = { x: 1765, y: 351, color: '#1d87ff' }
        var res = await core.isColor(c)

        if (res) {
            robot.moveMouse(1765, 351);
            await core.sleep(1);
            robot.mouseClick();
            // await core.sleep(1);
            // robot.moveMouse(1774, 372);
            // robot.mouseClick();
            // await core.sleep(1);
        }

        robot.moveMouse(1762, 372);
        await core.sleep(1);
        var d = { x: 1765, y: 372, color: '#1f232d' }
        var res2 = await core.isColor(d)
        if (res2) {
            await core.sleep(1);
            robot.mouseClick();
            await core.sleep(1);
        }
        await core.sleep(1);

        // เปิด มาโคร
        robot.moveMouse(1812, 212);
        await core.sleep(1);
        robot.mouseClick();

        await core.sleep(1);
        // ใช้มาโคร
        robot.moveMouse(1172, 367);
        await core.sleep(1);
        robot.mouseClick();

        await core.sleep(5);

        // ปิดมาโคร
        robot.moveMouse(1245, 244);
        await core.sleep(1);
        robot.mouseClick();

        await core.sleep(2);

        await core.sleep(1);
        // เลือก rachel
        robot.moveMouse(742, 758);
        robot.mouseClick();

        // -> the plain of ida
        await core.sleep(1);
        robot.moveMouse(1435, 410);
        robot.mouseClick();
        robot.mouseClick();

        // รอ 13 วิ ชัวร์สุด
        await core.sleep(13);

        //
        // ถึง plain of ida แล้ว
        await core.sleep(1);

        await core.stopTap();

        await core.sleep(1);

        // open map
        await core.openTap();

        await core.sleep(2);
        robot.keyTap('2');
        await core.sleep(2);

        robot.moveMouse(1439, 355);
        await core.sleep(1);
        robot.mouseClick();

        // รอ น้องเจสเดินไป
        await core.sleep(10);

        // ถึงที่ฟาร์มแล้ว
        // 1 เช็ค คน => ย้ายแนล
        // open macro
        // 2 วนลูป เช็ค ตาย => ย้ายแนล

        await core.sleep(1);
        await core.stopTap();
        await core.sleep(1);

        // open auto atk
        robot.moveMouse(1685, 787);
        await core.sleep(1);
        robot.mouseClick();

        await core.sleep(1);
        robot.moveMouse(1347, 540);
        await core.sleep(1);
        robot.mouseClick();
        await core.sleep(1);

        await core.sleep(1);
        await core.openTap();
        await core.sleep(1);

        // เปิด มาโคร
        robot.moveMouse(1812, 212);
        await core.sleep(1);
        robot.mouseClick();

        await core.sleep(1);
        // ใช้มาโคร
        robot.moveMouse(1172, 510);
        await core.sleep(1);
        robot.mouseClick();

        await core.sleep(5);

        // ปิดมาโคร
        robot.moveMouse(1245, 244);
        await core.sleep(1);
        robot.mouseClick();

    },
}