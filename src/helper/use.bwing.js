var robot = require("robotjs");

const core = require('../core/core.main.js');

module.exports = {
    do: async function() {
        // เปิดกระเป๋า
        await core.sleep(1);
        robot.moveMouse(1338, 110);
        robot.mouseClick();
        await core.sleep(1);

        // คลิก ช่อง item
        await core.sleep(1);
        robot.moveMouse(1261, 101);
        robot.mouseClick();

        // b wing
        await core.sleep(1);
        robot.moveMouse(1144, 225);
        robot.mouseClick();

        // คลิปใช้
        await core.sleep(1);
        robot.moveMouse(592, 839);
        robot.mouseClick();

        await core.sleep(1);
        // รอ 7.5 วิ
        await core.sleep(7.5);


        await core.sleep(15);
        // var container = {}
        // container.x = 1338
        // container.y = 97
        // container.color = '#a4494d'
        // container.color2 = '#a3494c'
        // robot.moveMouse(1338, 97);
        // await core.sleep(0.5);
        // await core.colorcheck(container);
    },
}