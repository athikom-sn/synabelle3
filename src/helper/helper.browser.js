const robot = require("robotjs");

const core = require("./../core/core.main");
const corecolour = require("./../core/core.color");

const clipboardy = require('clipboardy');

module.exports = {
    coord: {
        url: [315, 68]
    },
    redirector: async function(url) {
        //require('child_process').spawn('clip').stdin.end(util.inspect(url).replace(/'/g, ""));
        clipboardy.writeSync(url);

        core.moveto(this.coord.url);
        robot.mouseClick();
        await robot.keyTap("a", "control");

        await core.sleep(0.5);

        robot.keyTap("v", "control");

        core.submit()

        //await core.sleep(10);
    },

    color: {
        greens: [
            // '#7fd0b4',
            // '#9fdbc7',
            '#0ecb81',
            '#adebd2',
            '#5cdaa9',
            '#d0f1e4'
        ],

        whites: [
            '#fafafa',
            '#f4f5f6',
        ]
    },

    get: async function(x, y) {
        let _y = y;
        let n = 1;

        const grainpoint = 2;

        let resultset = {
            color: '?',
            n: 0
        };

        while (true) {
            let linecolor = core.getColor(x, _y);
            let isgreen = await corecolour.beLikely(linecolor, this.color.greens);

            if (isgreen) {
                _y -= grainpoint;
                resultset.n += 1;
            } else {
                console.log('not green', linecolor);
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
            let iswhite = await corecolour.beLikely(linecolor, this.color.whites);

            if (!iswhite) {
                foundstatus = true;
                break;
            }

            _y -= 2;
        }

        if (foundstatus) {
            // ... ???????????? ?????????????? ...
            resultset = await this.get(x, _y);
            return resultset;
        } else {
            // ... ??? ???? or Error detected
            return resultset;
        }
    },
}