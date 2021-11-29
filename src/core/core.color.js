var robot = require("robotjs");

const { rejects } = require("assert");
const { resolve } = require("path");

module.exports = {

    diff: function(e1, e2, thresholdWish) {
        let rmean = (e1.r + e2.r) / 2;
        let r = e1.r - e2.r;
        let g = e1.g - e2.g;
        let b = e1.b - e2.b;
        let threshold = Math.sqrt((((512 + rmean) * r * r) >> 8) + 4 * g * g + (((767 - rmean) * b * b) >> 8));
        //console.log('threshold', threshold, thresholdWish)
        if (threshold < thresholdWish) {
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

    beLikely: async function(hex1, hex2, threshold = 30) {
        let status = false;
        // สีที่จิ้มได้
        const colours1 = this.hexToRgb(hex1);

        const parents = this;
        // สีที่ล้อคไว้
        Array.from(hex2).forEach(colours2 => {
            const cr2 = parents.hexToRgb(colours2)
            if (!status)
                status = parents.diff({
                    r: colours1[0],
                    g: colours1[1],
                    b: colours1[2]
                }, {
                    r: cr2[0],
                    g: cr2[1],
                    b: cr2[2]
                }, threshold);
        });
        return status;
    },
}