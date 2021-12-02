var robot = require("robotjs");

const { rejects } = require("assert");
const { resolve } = require("path");

module.exports = {
    setup: function({ reset }) {
        if (true === reset) {
            this.lanecolor = null;
        }
    },
    // temp สำหรับบันทึกภาพเลนส์นั้น เพื่อความไว
    lanecolor: null,
    get: function(x, y) {
        return { color: `#${robot.screen.capture(x, y, 1, 1).colorAt(0, 0)}` };
    },

    // start ต้องเอา พิกัดมุมซ้ายบนมา
    // height คือความสูง จากมุมซ้ายบน - มุมซ้ายล่าง
    colorlane: function(x, y, { start, height } = { start: Number(400), height: Number(400) }) {
        if (this.lanecolor == null) {
            // console.log('create lane color : เพื่อความไวในการแคปสี');
            // ใช้ temp ใน การช่วย จะได้ไม่ต้อง แคปสกรีน ซ้ำไปซ้ำมา
            this.lanecolor = robot.screen.capture(x, start, 1, height);
        }
        // return { color: `#${this.lanecolor.colorAt(0, y-height-1)}` };
        // console.log(0, y, height)
        return { color: `#${this.lanecolor.colorAt(0, y-height-1)}` };
    },

    // start ต้องเอา พิกัดมุมซ้ายบนมา
    // height คือความสูง จากมุมซ้ายบน - มุมซ้ายล่าง
    colorlaneTest: function(x, y, { start, height, fy } = { start: Number(400), height: Number(400), fy: Number(0) }) {
        if (this.lanecolor == null) {
            // console.log('create lane color : เพื่อความไวในการแคปสี for test');
            // ใช้ temp ใน การช่วย จะได้ไม่ต้อง แคปสกรีน ซ้ำไปซ้ำมา
            this.lanecolor = robot.screen.capture(x, start, 1, height);
        }
        // return { color: `#${this.lanecolor.colorAt(0, y-height-1)}` };
        // console.log(0, y, height, n)
        return { color: `#${this.lanecolor.colorAt(0, fy-1)}` };
    },

    diff: function(e1, e2, thresholdWish) {
        let rmean = (e1.r + e2.r) / 2;
        let r = e1.r - e2.r;
        let g = e1.g - e2.g;
        let b = e1.b - e2.b;
        let threshold = Math.sqrt(
            (((512 + rmean) * r * r) >> 8) +
            4 * g * g +
            (((767 - rmean) * b * b) >> 8)
        );
        //console.log('threshold', threshold, thresholdWish)
        if (threshold < thresholdWish) {
            return true;
        } else {
            return false;
        }
    },

    hexToRgb: function(hex) {
        const normal = hex.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);
        if (normal) return normal.slice(1).map((e) => parseInt(e, 16));
        const shorthand = hex.match(/^#([0-9a-f])([0-9a-f])([0-9a-f])$/i);
        if (shorthand) return shorthand.slice(1).map((e) => 0x11 * parseInt(e, 16));
        return null;
    },

    isLikely: async function(hex1, hex2) {
        const colours1 = this.hexToRgb(hex1);
        const colours2 = this.hexToRgb(hex2);
        return this.diff({
            r: colours1[0],
            g: colours1[1],
            b: colours1[2],
        }, {
            r: colours2[0],
            g: colours2[1],
            b: colours2[2],
        });
    },

    beLikely: async function(hex1, hex2, threshold = 30) {
        let status = false;
        // สีที่จิ้มได้
        const colours1 = this.hexToRgb(hex1);

        const parents = this;
        // สีที่ล้อคไว้
        Array.from(hex2).forEach((colours2) => {
            const cr2 = parents.hexToRgb(colours2);
            if (!status)
                status = parents.diff({
                        r: colours1[0],
                        g: colours1[1],
                        b: colours1[2],
                    }, {
                        r: cr2[0],
                        g: cr2[1],
                        b: cr2[2],
                    },
                    threshold
                );
        });
        return status;
    },
};