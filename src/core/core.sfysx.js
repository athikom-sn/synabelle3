const robot = require("robotjs");

const core = require("./core.main.js");
const corecolour = require("./core.color");

module.exports = {
    color: {
        greens: [
            '#99e6c8',
            '#0ecb81',
            '#19ce87',
            '#6ddeb2',
            '#59daa7',
            '#adebd2',
            '#5cdaa9',
            '#34d294',
        ],

        whites: [
            '#fafafa',
            '#f6f6f7'
            // '#f4f5f6',
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

        console.log('เริ่มหา พื้นที่สีเชียวที่ตำแหน่ง ', x, y);

        const grainpoint = 2;

        let resultset = {
            color: '?',
            n: 0
        };

        while (true) {
            let linecolor = core.getColor(x, _y);
            console.log('green?', linecolor)
            let isgreen = await corecolour.beLikely(linecolor, this.color.greens, 30);

            if (isgreen) {
                console.log('ยังเขียวอยู่', isgreen, _y);
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

        x += 1;

        let foundstatus = false;
        let resultset = {
            color: '?',
            n: 0,
        }

        while (true) {
            if (_y <= 0) break;

            let linecolor = core.getColor(x, _y);
            let iswhite = await corecolour.beLikely(linecolor, this.color.whites, 60);

            if (!iswhite) {
                // ใช้เช็คว่า สีขาวที่อ่านเจอ คือ สีอะไร
                //console.log('color indicators', linecolor, x, _y);
                foundstatus = true;
                break;
            }

            _y -= 1;
        }

        if (foundstatus) {
            // ... วนรูปเพื่อหา พื้นที่สีเขียว ...
            console.log('พบ สีเขียว ', x, _y - 1)

            // ไปนับสีเขียวต่อ ว่ามี พท. ขึ้นเยอะมากไหม
            // ใช้ -1 เพื่อจะเลื่อนขึ้นไป อีก 1 ขีด
            resultset = await this.get(x, _y - 1);

            // step ต่อไป check ว่า แท่งที่แล้ว เขียวมั้ย
            // ถ้าเขียว แจ้ง noti เลย
            return resultset;
        } else {
            // ... ขาว โพลน or Error detected
            console.log('ขาวโพลน')
            return resultset;
        }
    },

    // ใช้สำหรับหาระยะห่าง ระหว่าง พท. margin กับเส้นแรก เพื่อให้ พิกัดของ graph นิ่งขึ้น
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