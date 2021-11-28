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

    getVolume: async function() {
        // ใช้ กราฟ 5 นาที
        // พิกัดแท่งแรก
        //let first_px = 482,
        let first_px = 1106,
            py = 863,
            last_px = 1391;

        let sums = 0.00;
        let n = 0;

        let sumn = 0.00;
        let rn = 0;

        let max = 0.00;

        let rounds = Math.ceil((last_px - first_px) / this.barwidth);

        for (var i = 0; i < rounds; i++) {
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

            const linecolor = core.getColor(first_px + i * this.barwidth, 884);

            // const barcolor = core.getColor(first_px + i * this.barwidth, 592);

            // เช็ครอบจบ
            // const endcolor = await corecolour.isLikely(linecolor, '#fafafa');
            // if (endcolor == true) {
            //     console.log('end', linecolor, [first_px + i * this.barwidth, 884]);
            //     break;
            // }

            const color = await corecolour.isLikely(linecolor, this.color.green);

            if (color) {
                // กราฟเขียว
                //console.log(price, ' green', '[', linecolor, this.color.green, ']')
                // console.log('green', price);

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
                console.log(max);
            }
            // ถ้า vol ของสีเขียวมีค่าเกินกว่า ค่า average เมื่อไร ละก็ รู้เรื่อง
        }
        // ถ้ามันเขียวต้องเช้คว่า แท่งก่อนมันเขียวมั้ย ถ้าเขียว แล้ว volume มากกว่าแท่งเก่า รับรองว่าขึ้นแน่นอน ... 
        // ให้เช็คจากแท่งปัจจุบัน



        // final step
        // check ว่า last node มากกว่า max และเป็น สีเขียวไหม ถ้าเขา สองกรณีนี้ คือ ขาขึ้น ต้องรีบช้อน
        core.move(last_px, py);

        await this.captureVolumeText(`volumefinal.png`);
        await worker.load();
        await worker.loadLanguage("eng");
        await worker.initialize("eng");

        const {
            data: { text },
        } = await worker.recognize(this.basepath + `volumefinal.png`);

        // # เอาเฉพาะ number และ . เท่านั้น
        let price = text.replace(/[^\d.]/g, "");

        if (price > 100) {
            price = price / 1000;
        }

        const linecolor = core.getColor(last_px, 884);

        const color = await corecolour.isLikely(linecolor, this.color.green);
        if (color == true) {
            console.log('last volume เขียว', price, 'vs', max);
        } else {
            console.log('last volume แดง', price, 'vs', max);
        }
    },

    captureVolumeText: async function(filename) {
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
            name: filename,
        };

        await coreimage.save(container, block);
    },
};