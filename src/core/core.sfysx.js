const robot = require("robotjs");

const core = require("./core.main.js");
const corecolour = require("./core.color");

module.exports = {
    color: {
        greens: [
            '#7fd0b4',
            '#9fdbc7',
        ],
    },

    get: async function(x) {
        let _y = 885;
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
                break;
            }
        }

        //resultset.color = isgreen ? 'green' : '?';

        return resultset;
    },
}