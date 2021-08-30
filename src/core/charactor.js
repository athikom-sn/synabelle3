var robot = require("robotjs");


const core = require("./core.main.js");
const coreimage = require("./core.image");

module.exports = {
    changeCharactor: async function(from, to) {
        switch (to) {
            case 1:
                robot.moveMouse(131, 145);
                await core.sleep(1);
                robot.mouseClick();

                await core.sleep(3);

                robot.moveMouse(1692, 672);
                await core.sleep(1);
                robot.mouseClick();


                break;
            case 2:
                // from 1

                break;
            case 3:
                break;
        }
    },

    openBag: async function(container) {
        // ไปที่กระเป๋า
        robot.moveMouse(1329, 110);

        // const res = await coreimage.fastdiff({ x: 1299, y: 72, name2: 'x1299y72.png' })
        const res = true
        if (res) {
            robot.mouseClick();
            // robot.mouseClick();
            await core.sleep(2);

            await core.scrollup({ x: 1264, y: 221, y2: 550 });
            await core.sleep(2);

            robot.moveMouse(1472, 219);
            await core.sleep(1);
            robot.mouseClick();




            // robot.moveMouse(1333, 183);
        }
    },
}