const robot = require("robotjs");

const core = require("./core.main.js");
const corecolour = require("./core.color");

module.exports = {
    color: {
        greens: [
            // '#7fd0b4',
            // '#9fdbc7',
            '#0ecb81',
            '#59daa7',
            '#adebd2',
            '#5cdaa9',
            '#34d294',

            //'#d0f1e4',
            //'#e9f6f1',
        ],

        whites: [
            '#fafafa',
            '#f4f5f6',
        ],

        margins: [
            '#ecedf0',
        ]
    },

    get: async function(x, y) {
        let _y = y;
        let n = 1;

        // ไม่เอา high กับ low
        x = x + 1;

        const grainpoint = 1;

        let resultset = {
            color: '?',
            n: 0
        };

        while (true) {
            let linecolor = core.getColor(x, _y);
            let isgreen = await corecolour.beLikely(linecolor, this.color.greens, 30);

            if (isgreen) {
                // console.log('ยังเขียวอยู่', isgreen, _y);
                _y -= grainpoint;
                resultset.n += 1;
            } else {
                console.log('เปลี่ยนจากเขียวเป็นขาว ', x, _y, linecolor);
                break;
            }
        }

        return resultset;
    },

    findgreen: async function(x) {
        let _y = 740
            // x -= 1;
        let foundstatus = false;
        let resultset = {
            color: '?',
            n: 0,
        }

        while (true) {
            if (_y <= 0) break;

            let linecolor = core.getColor(x, _y);
            let iswhite = await corecolour.beLikely(linecolor, this.color.whites, 30);

            if (!iswhite) {
                foundstatus = true;
                break;
            }

            _y -= 1;
        }

        if (foundstatus) {
            // ... วนรูปเพื่อหา พื้นที่สีเขียว ...
            console.log('พบ สีเขียว ', x, _y - 2)

            // ไปนับสีเขียวต่อ ว่ามี พท. ขึ้นเยอะมากไหม
            resultset = await this.get(x, _y - 2);

            // step ต่อไป check ว่า แท่งที่แล้ว เขียวมั้ย
            // ถ้าเขียว แจ้ง noti เลย
            return resultset;
        } else {
            // ... ขาว โพลน or Error detected
            console.log('ขาวโพลน')
            return resultset;
        }
    },

    findmargin: async function(y) {
        let foundstatus = false;
        let _x = 1509;
        let _static_x = 1509;
        while (true) {
            if (_x <= 1400) break;

            let linecolor = core.getColor(_x, y);
            let ismargin = await corecolour.beLikely(linecolor, this.color.margins, 30);

            if (ismargin) {
                foundstatus = true;
                break;
            }

            _x -= 1;
        }

        if (foundstatus) {
            // ... วนรูปเพื่อหา เส้น margin ...
            return {
                width: _static_x - _x
            }
        } else {
            // default
            console.log('margin not found')
            return {
                width: 66
            }
        }
    },
}