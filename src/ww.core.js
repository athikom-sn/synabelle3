var SYS_STATUS = 1;

const core = require("./core/core.main.js");

const { createWorker } = require("tesseract.js");

const worker = createWorker({
    langPath: "C:\\Users\\ammso\\foo\\satania\\",
    cacheMethod: "none",
    gzip: false,
});

//const btc = require('./core/price.find.js');
const volume = require("./core/volume.find");

const sfysx = require("./core/core.sfysx");
const robot = require("robotjs");

const api = require("./api/api.caller");
const coinapi = require("./api/api.coin");

const browser = require("./helper/helper.browser");
const util = require("util");
const { performance } = require("perf_hooks");

// const statusApi = require('./api/api.status');

const { models } = require("./result.set");
const corecolour = require("./core/core.color.js");

module.exports = {
    color: {
        whites: ["#ffffff"],
    },

    getY: async function() {
        let foundstatus = false;
        let _y = 1017;
        let _static_y = 1017;
        while (true) {
            if (_y <= 750) break;

            let linecolor = core.getColor(909, _y);
            let ismargin = await corecolour.beLikely(linecolor, ["#ffffff"], 60);

            if (ismargin) {
                foundstatus = true;
                break;
            }

            _y -= 1;
        }

        if (foundstatus) {
            // ... วนรูปเพื่อหา เส้น margin ...
            console.log("height", {
                height: _static_y - _y,
            });

            // core.move(965, _y - 10);
            return _y;
        } else {}

        return _y;
    },

    // main script
    doing: async function() {
        await core.sleep(1.5);

        while (true) {
            //965,919, //966.933
            let y = await this.getY();
            core.move(956, y - 10);

            robot.mouseClick();

            await core.sleep(12.5);

            //core.move(1417, 338);
            core.move(1895, 123);

            robot.mouseClick();

            await core.sleep(1.5);

            y = await this.getY();

            core.move(956, y - 10);

            robot.mouseClick();

            // 899,979
            while (true) {
                y = await this.getY();
                const { color } = corecolour.get(956, y - 10);
                console.log(color);
                const iswhite = await corecolour.beLikely(color, this.color.whites, 30);
                await core.sleep(1);
                if (iswhite) {
                    console.log("white");
                    break;
                }
            }

            await core.sleep(1);
        }

        //core.move(965, y - 3);

        // robot.mouseClick();

        // robot.mouseClick();

        return;
        await core.sleep(1);

        const isTest = process.argv.slice(2)[0] == null ? false : true;

        //const coins = ['ANY', 'RSR', 'SAND', 'GALA', 'RSR', 'DAR', 'AXS', 'MBOX', 'COTI', 'QI', 'SUPER', 'XTZ', 'ZIL', 'SUSHI', 'STX', 'BETA', 'MBOX'];
        // const coins = await coinapi.get();
        // const coins = { data: [{ name: "GTO" }, { name: "NULS" }, { name: "FIO" }, { name: 'AXS' }, { name: 'MBOX' }] };
        const coins = isTest ? { data: [{ name: "BAT" }] } : await coinapi.get();

        const mainurl = `https://www.binance.com/en/trade`;

        var r = 0;
        const maxround = isTest ? 1 : 6;
        while (r < maxround) {
            const { status } = await statusApi.get();
            if (status != 1) {
                break;
            }

            for (var index = 0; index < coins.data.length; index++) {
                const { name } = coins.data[index];

                if (!isTest) await browser.open(`${mainurl}/${name}_USDT`);

                const { width } = await sfysx.findmargin(864).then(function(result) {
                    return { width: 66 - result.width };
                });

                let stacks = 0;
                let stacksum = 0;

                let result = [];

                // เอากี่แท่ง
                for (var i = 0; i < 2; i++) {
                    const current = {
                        x: Number(1391 + width - i * 8),
                        // x: 1444 - (i * 8),
                        y: 0,
                    };

                    // หาความยาว แท่งเขียว
                    const res = await sfysx.findall(current.x);
                    // console.log('ความสูงแท่งเขียว', res.n);

                    // volume ที่แลกเปลี่ยนกันในช่วงนี้
                    const { n } = await volume.greenzone(current.x);
                    // console.log('แท่งที่ ${i} bar', res.n, 'vol', n);

                    result.push({
                        price: res.n,
                        volume: n,
                    });

                    // ให้หาว่า แท่งนี้ กับแท่งที่แล้ว จำนวนห่างกันเท่าไร
                    // แล้วยังเขียวอยุ่ไหม อันนี้น่าสน ..
                }

                const resultB = models.precedures(result);
                // console.log(resultB)
                if (resultB == true) {
                    const datestring = new Date().toLocaleString("en-US", {
                        timeZone: "Asia/Bangkok",
                    });
                    await api.dispatch(`${name} => ${datestring}`);
                }

                // เขียว 3 ส่ง line
                // if (stacks >= 3) {
                //     await api.dispatch(`${name} => bar เขียว สาม ${datestring}`);
                // }

                // if (stacksum >= 200) {
                //     // ..
                //     await api.dispatch(`${name} => bar sum เยอะ ${datestring}`);
                // }
            }
            r++;
        }
        // var ends = performance.now();

        // await api.dispatch('Heyyy' + (ends - starts));

        // console.log('test', ends - starts);

        return;
    },

    //
    findAvailableTrade: async function() {
        // รอ 1 วิ เพื่อ เริ่มต้นโลกใหม่ ..
        await core.sleep(1);

        // เปิดหน้าตลาดขึ้นมา
        await browser.openMarket();

        const coins = await coinapi.get();
        console.log(coins.data);
    },
};