var robot = require("robotjs");

const { rejects } = require("assert");
const { resolve } = require("path");

module.exports = {

    diff: function(e1, e2) {
        let rmean = (e1.r + e2.r) / 2;
        let r = e1.r - e2.r;
        let g = e1.g - e2.g;
        let b = e1.b - e2.b;
        let threshold = Math.sqrt((((512 + rmean) * r * r) >> 8) + 4 * g * g + (((767 - rmean) * b * b) >> 8));

        if (threshold < 30) {
            return true;
        } else {
            return false;
        }
    },

    hexToRgb: function(hex) {
        const normal = hex.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);
        if (normal) return normal.slice(1).map(e => parseInt(e, 16));
        const shorthand = hex.match(/^#([0-9a-f])([0-9a-f])([0-9a-f])$/i);
        if (shorthand) return shorthand.slice(1).map(e => 0x11 * parseInt(e, 16));
        return null;
    },

    isLikely: async function(hex1, hex2) {
        const colours1 = this.hexToRgb(hex1);
        const colours2 = this.hexToRgb(hex2);
        return this.diff({
            r: colours1[0],
            g: colours1[1],
            b: colours1[2]
        }, {
            r: colours2[0],
            g: colours2[1],
            b: colours2[2]
        })
    },
}