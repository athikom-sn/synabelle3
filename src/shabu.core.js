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
const e = require("cors");

module.exports = {
    color: {
        // ,, "#c4c3ba"
        whites: ["#ffffff", "#e3dfde", "#c4c3ba"],
        greens: ["#7cc24a"],

        redopen: ["#ba5f56"],
        noti: ["#ebedee"],
    },

    checkNotification: async function() {
        let { color } = corecolour.get(1160, 93);
        const isnoti = await corecolour.beLikely(color, this.color.noti, 30);

        if (isnoti) {
            await core.sleep(3);
        }
    },

    // main script
    doing: async function() {
        const p = this;
        // await p.reopen();
        // return;

        let m = 0;

        var axis = [
            //[1354, 115], /// ขวาบน // ยังไม่ใช้

            [1344, 114], /// ขวาบน
            [995, 110], ///ซ้าย
            [1354, 132], /// ขวา 2

            //[1367, 122],
            [1363, 118], //ขวาบน // small screen
            [1349, 157], //ขวาบน // small screen
        ];

        await core.sleep(1);

        var count_z = 0;

        while (m < 10000000) {
            // y = await this.getY();

            /// always declare in every loop ...

            var i = 0;
            var status_s = false;
            while (i < axis.length) {
                let { color } = corecolour.get(axis[i][0], axis[i][1]);
                const iswhite = await corecolour.beLikely(color, this.color.whites, 60);

                console.log("color", i, iswhite, color);
                if (iswhite) {
                    await core.sleep(1);

                    /// x+6 if background is white
                    const cc = corecolour.get(axis[i][0] + 6, axis[i][1]);
                    const iswhite2 = await corecolour.beLikely(cc.color, ["#ffffff"], 60);

                    /// still white ??
                    if (iswhite2) {
                        console.log("impossible coz belikely white");
                    } else {
                        // const cc2 = corecolour.get(1369, 104);
                        const cc2 = corecolour.get(axis[i][0] + 25, axis[i][1] - 10);
                        const iswhite3 = await corecolour.beLikely(
                            cc2.color, ["#ffffff"],
                            60
                        );

                        if (iswhite3 && i != 3) {
                            console.log("impossible coz belikely white 2");
                            /// is it really white so lucky
                            const cc3 = corecolour.get(axis[i][0] + 25 + 10, axis[i][1] - 10);
                            const iswhite4 = await corecolour.beLikely(
                                cc3.color, ["#ffffff"],
                                60
                            );

                            if (iswhite4) {
                                console.log(
                                    "prepare move double white impossible",
                                    axis[i][0],
                                    axis[i][1]
                                );
                                /// next
                                status_s = true;
                                break;
                            } else {
                                /// continue;
                            }
                        } else {
                            console.log("prepare move", axis[i][0], axis[i][1]);
                            /// next
                            status_s = true;
                            break;
                        }
                    }
                }
                i++;
            }

            if (status_s) {
                count_z = 0;

                robot.moveMouse(axis[i][0], axis[i][1]);

                await core.sleep(2);

                await p.checkNotification();

                /// ปิด โฆษณา
                robot.mouseClick();
                robot.mouseClick();

                await core.sleep(1);

                /// ทุกๆ 6 รอบ รีใหม่แม่งเลย
                if (m % 6 == 0) {
                    count_z = 0;

                    m += 1;

                    await p.reopen();

                    continue;
                }

                // ไปที่่คลิกปุ่มเพชร
                robot.moveMouse(1120, 88);

                await core.sleep(1);

                await p.checkNotification();

                // คลิกปุ่มเพชร
                robot.mouseClick();

                await core.sleep(1);

                /// ไปที่ปุ่มเขียว
                robot.moveMouse(1264, 394);

                await core.sleep(1);

                /// 5 second pass after video see
                // await core.sleep(50);

                /// til it's green
                /// 1271, 372
                let stil = 0;
                while (stil < 60) {
                    let { color } = corecolour.get(1271, 372);
                    const isgreen = await corecolour.beLikely(
                        color,
                        this.color.greens,
                        30
                    );

                    if (isgreen) {
                        stil = 100001;
                    }

                    await core.sleep(1);
                    stil++;
                }

                ///await core.sleep(1);

                /// คลิกปุ่มเขียว
                /// start video to see
                robot.mouseClick();

                console.log("ads runnalbe wait 49 sec hold on.");

                /// 5.5 sec after video see
                await core.sleep(48);

                await core.sleep(1);
            } else {
                count_z += 1;
            }

            /// รอมานาน 1 นาที ก็ดูเหมือนว่าจะอ่าน โฆษณาไม่ได้
            ///
            if (count_z >= 60) {
                count_z = 0;

                await p.reopen();
            } else {
                console.log("wait", count_z);
            }

            m += 1;
            await core.sleep(1);
        }

        return;
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

    /// re openning apps.
    reopen: async function() {
        await core.sleep(1);

        /// ไปที่ 3 ปุ่มด้านล่าง
        robot.moveMouse(1238, 1016);
        await core.sleep(1);
        robot.mouseClick();
        await core.sleep(2);
        /// ไปที่ "ปิดทั้งหมด"
        robot.moveMouse(1172, 818);
        await core.sleep(1);
        robot.mouseClick();
        await core.sleep(2.5);
        /// ไปที่ "ปิดทั้งหมด"
        robot.moveMouse(1096, 455);
        await core.sleep(1);
        robot.mouseClick();

        /// รอเกมเปิด
        await core.sleep(3.5);
        /// ไปที่ ปุ่มสีแดง
        robot.moveMouse(1181, 570);

        let ii = true;
        while (ii) {
            let { color } = corecolour.get(1181, 570);
            const isredopen = await corecolour.beLikely(
                color,
                this.color.redopen,
                30
            );

            if (isredopen) {
                robot.moveMouse(1181, 570);
                await core.sleep(1);
                robot.mouseClick();
            }

            await core.sleep(1);

            const cs = corecolour.get(1181, 570);
            ii = await corecolour.beLikely(cs.color, this.color.redopen, 30);
        }

        await core.sleep(1);

        // ไปที่่คลิกปุ่มเพชร
        robot.moveMouse(1120, 88);

        await core.sleep(1);

        // คลิกปุ่มเพชร
        robot.mouseClick();

        await core.sleep(1);

        /// ไปที่ปุ่มเขียว
        robot.moveMouse(1264, 394);

        await core.sleep(1);

        /// 5 second pass after video see
        // await core.sleep(50);

        /// til it's green
        /// 1271, 372
        let stil = 0;
        while (stil < 60) {
            let { color } = corecolour.get(1271, 372);
            const isgreen = await corecolour.beLikely(color, this.color.greens, 30);

            if (isgreen) {
                stil = 100001;
            }

            await core.sleep(1);
            stil++;
        }
        // #ba5f56

        /// คลิกปุ่มเขียว
        /// start video to see
        robot.mouseClick();

        /// 5.5 sec after video see
        await core.sleep(48);
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