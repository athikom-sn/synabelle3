const core = require('./src/core/core.main.js');
const coreimage = require('./src/core/core.image.js');

const login = require('./src/core/login.jsc.js');
const jsc = require('./src/core/jsc.farming.js');
const teleport = require('./src/helper/go.to.teleport.js');

const charactor = require('./src/core/charactor.js');

var robot = require("robotjs");

async function init() {
    // start 293,201
    // end 1652,201

    // screen size = 1359 pixel
    // 1 block = 194 px (แกน x)
    //

    // end y 293,939 
    // screen y = 939-201 = 738 pixel
    // 1 block (y) = 738/7 = 105.42

    // crop size = 194, 106 (7*7)

    // กว้าง w, สูง h (พื้นที่สำรวจ)
    const w = 50;
    const h = 50;

    const sx = 293;
    const sy = 201;

    let nx = Math.round(1359 / w);
    let ny = Math.round(738 / h);

    await core.sleep(2)


    let result = false;

    // let res = await coreimage.onceDiff({ x: 293, y: 939, name2: 'fabre.png', name: `demo2.png` });

    for (let i = 0; i < nx; i++) {
        for (let j = 0; j < ny; j++) {
            let res = await coreimage.onceDiff({ x: (i * w + sx), y: (j * h + sy), name2: 'fabre.png', name: `demo${i}${j}.png` });

            if (res) {
                console.log('found fabre ...');
                result = true;
            }
        }
    }

    if (!result) {
        console.log('not found anything');
    }
}

init();