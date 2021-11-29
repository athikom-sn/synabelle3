var robot = require("robotjs");

const { rejects } = require("assert");
const { resolve } = require("path");

const coreimage = require('./core.image.js');

module.exports = {
    img: null,
    sleep: function(ms) { return new Promise(resolve => setTimeout(resolve, ms * 1000)) },

    move: async function(x, y) { robot.moveMouse(x * 0.8, y * 0.8) },
    moveto: async function(coord) { robot.moveMouse(coord[0] * 0.8, coord[1] * 0.8) },
    typing: async function(text) {
        await this.sleep(0.5 D);
        for (var i = 0; i < text.length; i++) {
            if (text[i] == ' ')
                await this.sleep(0.02);
            else
                await this.sleep(0.02);
            robot.typeString(text[i]);
        }
    },
    submit: async function() {
        robot.keyTap('enter');
        await this.sleep(1);
    },

    getColor: function(x, y) {
        // พื้นที่ ที่จะรับสี
        this.img = robot.screen.capture(x, y, 1, 1);

        // เอาสี ที่ตำแหน่ง x,y ....
        const hex = this.img.colorAt(0, 0);
        return `#${hex}`
    },

    _loop: async function(fn, ms) {
        return await new Promise((resolve, rejects) => {
            var interval = setInterval(async function() {
                var res = await fn();
                if (res == 0) {
                    // continue
                } else {
                    clearInterval(interval);
                    resolve(res);
                }
            }, ms);
        });
    },

    scrollup: async function(container) {
        robot.setMouseDelay(1000);

        robot.moveMouse(container.x, container.y);

        // คลิกค้าง
        robot.mouseToggle("down");

        robot.moveMouseSmooth(container.x, container.y2);
        await this.sleep(1);
        robot.mouseToggle("up");
        await this.sleep(1);

        await this.sleep(1);
        robot.moveMouse(container.x, container.y);
        await this.sleep(1);
        // คลิกค้าง
        robot.mouseToggle("down");
        //
        await this.sleep(1);
        robot.setMouseDelay(1500);
        robot.moveMouseSmooth(container.x, container.y2);
        await this.sleep(1);
        robot.mouseToggle("up");
        await this.sleep(1);
    },

    colorcheck: async function(container) {
        return await this._loop(async() => {
            return await new Promise((resolve, _) => {
                if ('#' + robot.getPixelColor(container.x, container.y) == container.color) {
                    resolve(1)
                } else if (container.hasOwnProperty('color2') && ('#' + robot.getPixelColor(container.x, container.y) == container.color2)) {
                    resolve(2)
                } else {
                    resolve(0)
                }
            })
        }, container.hasOwnProperty('ms') ? (parseInt(container.hasOwnProperty('ms'))) : 1000)
    },

    isColor: function(container) {
        console.log('iscolor robot:', ('#' + robot.getPixelColor(container.x, container.y)), 'container:', container.color)
        if ('#' + robot.getPixelColor(container.x, container.y) == container.color) {
            return true;
        } else return false;
    },

    openTap: async function() {
        await this.sleep(2);
        // เปิดแผนที่ขวาบน
        robot.moveMouse(1641, 178);
        robot.mouseClick();
        robot.mouseClick();
        await this.sleep(1);
    },
    stopTap: async function() {
        var container = { x: 1251, y: 818, color: '#3662c5' }
        if (this.isColor(container)) {
            // ปิด tab
            await this.sleep(1)
            robot.keyTap('tab')
            await this.sleep(1)
        } else {
            container = { x: 1251, y: 818, color: '#3662c3' }
            if (this.isColor(container)) {
                // ปิด tab
                await this.sleep(1)
                robot.keyTap('tab')
                await this.sleep(1)
            } else {
                await this.sleep(1)
                const diffS = await coreimage.fastdiff({ x: 1120, y: 787, name2: 'closetab.png' })
                if (diffS) {
                    await this.sleep(1)
                    robot.keyTap('tab')
                }
                await this.sleep(1)
            }
            // 1120, 787
        }


        // robot.moveMouse(1251, 818)
    },
}