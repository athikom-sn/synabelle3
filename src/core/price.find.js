const { createWorker } = require("tesseract.js");
const worker = createWorker();

const robot = require("robotjs");

const core = require("./core.main.js");
const coreimage = require("./core.image.js");
const corecolour = require("./core.color");

const { exec } = require("child_process");

const mariadb = require("mariadb");
const pool = mariadb.createPool({
    host: "localhost",
    user: "root",
    password: "DontForgetMeAgain",
    database: "santacia",
});

module.exports = {
    barwidth: 8.4,
    color: {
        green: '#7fd0b4',
        red: '#f8a0ac'
    },
    basepath: `C:\\Users\\ammso\\foo\\satania\\assets\\image\\`,
    path: `C:\\Users\\ammso\\foo\\satania\\assets\\image\\price.png`,
    getPrice: async function(pattern, isthisfisrt) {
        if (pattern == "buy") {
            robot.moveMouse(48 * 0.8, 46 * 0.8);
            robot.mouseClick();
            await core.sleep(1);
        } else {
            robot.moveMouse(1003 * 0.8, 45 * 0.8);
            robot.mouseClick();
            await core.sleep(1);
        }

        let res = await new Promise(async(resolve, reject) => {
            // if (isthisfisrt) {
            //     exec(
            //         "start chrome https://www.binance.com/en/buy-sell-crypto?channel=card",
            //         (error, stdout, stderr) => {
            //             if (error) {
            //                 reject(false);
            //             }
            //             if (stderr) {
            //                 reject(false);
            //             }
            //             resolve(true);
            //         }
            //     );
            // } else {
            await robot.keyTap("f5");
            await core.sleep(7);
            resolve(true);
            // }
        });

        console.log(55555555);

        // error or somethings...
        if (!res) {
            return 0;
        }

        const parent = this;

        // wait 1 second
        await core.sleep(1);

        // มุมซ้ายบน
        let pos = [886, 348];
        // มุมขวาบน
        let pos2 = [1003, 373];

        // แบ่ง sell buy
        if (pattern == "buy") {
            pos = [407, 359];
            pos2 = [525, 383];
        } else {
            pos = [1365, 361];
            pos2 = [1482, 383];
        }

        // ความยาว บล้อคค
        let block = {
            width: pos2[0] - pos[0],
            height: pos2[1] - pos[1],
        };

        let container = {
            x: pos[0],
            y: pos[1],
            name: "price.png",
        };

        await coreimage.save(container, block);

        return await new Promise(async(resolve, reject) => {
            await worker.load();
            await worker.loadLanguage("eng");
            await worker.initialize("eng");

            const {
                data: { text },
            } = await worker.recognize(parent.path);
            let price = text.replace(/,/g, "");

            pool
                .getConnection()
                .then((conn) => {
                    conn
                        .query("SELECT 1 as val")
                        .then((rows) => {
                            return conn.query(
                                "INSERT INTO price (id, price, pattern) value (?,?, ?)", [null, price, pattern]
                            );
                        })
                        .then(async(res) => {
                            console.log(res);
                            // { affectedRows: 1, insertId: 1, warningStatus: 0 }
                            conn.end();
                        })
                        .catch((err) => {
                            //handle error
                            console.log(err);
                            conn.end();

                            reject(false);
                        });
                })
                .catch((err) => {
                    reject(false);
                });

            // await worker.terminate();
            resolve(price);
        });
    },

    getVolume: async function() {
        // ใช้ กราฟ 5 นาที
        // พิกัดแท่งแรก
        //let first_px = 482,
        let first_px = 1106,
            py = 863;

        let sums = 0.00;
        let n = 0;

        let sumn = 0.00;
        let rn = 0;

        let max = 0.00;

        for (var i = 0; i < 108; i++) {
            core.move(first_px + i * this.barwidth, py);

            // มุมซ้ายบน, // มุมขวาล่าง
            let pos = [533, 763],
                pos2 = [587, 781];

            // ความยาว บล้อคค
            let block = {
                width: pos2[0] - pos[0],
                height: pos2[1] - pos[1],
            };

            let container = {
                x: pos[0],
                y: pos[1],
                name: `volume${i}.png`,
            };

            await coreimage.save(container, block);

            await worker.load();
            await worker.loadLanguage("eng");
            await worker.initialize("eng");

            const {
                data: { text },
            } = await worker.recognize(this.basepath + container.name);

            // # เอาเฉพาะ number และ . เท่านั้น
            let price = text.replace(/[^\d.]/g, "");

            if (price > 100) {
                price = price / 1000;
            }

            //const endcolor
            // const barcolor = core.getColor(first_px + i * this.barwidth, 592);
            // const endcolor = await corecolour.isLikely(barcolor, '#fafafa');
            // if (endcolor == true) {
            //     break;
            // }

            const linecolor = core.getColor(first_px + i * this.barwidth, 884);

            // const barcolor = core.getColor(first_px + i * this.barwidth, 592);
            const endcolor = await corecolour.isLikely(linecolor, '#fafafa');
            if (endcolor == true) {
                console.log('end', linecolor, [first_px + i * this.barwidth, 884]);
                break;
            }
            // 1396, 592
            // #fafafa
            // is it end


            const color = await corecolour.isLikely(linecolor, this.color.green);

            if (color) {
                // กราฟเขียว
                //console.log(price, ' green', '[', linecolor, this.color.green, ']')
                console.log('green', price);

                sums += parseFloat(price);
                n++;
            } else {
                //console.log(price, 'red')
                //console.log('red')
                //sumn += parseFloat(price);
                sums += parseFloat(price);
                n++;
            }

            if (parseFloat(price) > max) {
                max = parseFloat(price);
            }
            // ถ้า vol ของสีเขียวมีค่าเกินกว่า ค่า average เมื่อไร ละก็ รู้เรื่อง
        }

        // check ว่า last node มากกว่า max และเป็น สีเขียวไหม ถ้าเขา สองกรณีนี้ คือ ขาขึ้น ต้องรีบช้อน

        //console.log(arrays.reduce((a, b) => a + b, 0) / arrays.length)
        //console.log(sums, n);
    },
};