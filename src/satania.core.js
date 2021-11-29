const core = require("./core/core.main.js");

const { createWorker } = require("tesseract.js");

const worker = createWorker({
    langPath: 'C:\\Users\\ammso\\foo\\satania\\',
    cacheMethod: 'none',
    gzip: false
});

const btc = require('./core/price.find.js');
const volume = require('./core/volume.find');

const sfysx = require('./core/core.sfysx');
const robot = require("robotjs");

const api = require('./api/api.caller');

(async() => {
    await worker.load();
    await worker.loadLanguage("eng");
    await worker.initialize("eng");

    volume.construct({ worker: worker });
})();

module.exports = {
    ocr: async() => {
        let isthisfisrt = true;
        await core.sleep(5);
        while (true) {
            await btc.getPrice('buy', isthisfisrt);

            await core.sleep(1);

            await btc.getPrice('sell', isthisfisrt);

            await core.sleep(15);

            isthisfisrt = false;
        }
    },

    findVolume: async() => {
        await core.sleep(1.5);

        // วัดปริมาณขายจาก สีเขียว แต่ต้องถึงเท่าไรละ ถึงจะเข้า ????
        //await volume.getVolume();
        // await volume.getBeforeLastVolume();
        // await core.sleep(0.5);
        // await volume.getLastVolume();

        // เช็ค 3 bar ถ้ามัน ขึ้น 2 บาร์ และบาร์ ที่ 3 มี volume (หรือพื้นที่เขียว ที่มากขึ้น)
        // bar 1 เขียว
        // bar 2 เขียว
        // bar 3 มีพื้นที่เขียว + volume ที่เยอะ = แจ้งเตือนไลน์

        //while (true) {
        let max = 0.00;

        // const res4 = await volume.get(1372.5, 'แท่ง 4 ');
        // max = res4.volume > max && res4.color == 'green' ? res4.volume : max
        //     //     // console.log(res4);

        // const res3 = await volume.get(1380.5, 'แท่ง 3 ');
        // max = res3.volume > max && res3.color == 'green' ? res3.volume : max
        //     //     // console.log(res3);

        // const res2 = await volume.get(1388.5, 'แท่ง 2 ');
        // max = res2.volume > max && res2.color == 'green' ? res2.volume : max

        // const average = (res2.volume + res3.volume + res4.volume) / 3;

        const res1 = await volume.get(1396.5, worker, 'แท่ง 1 ');
        console.log(res1);

        let cres1 = await sfysx.get(1396.5);
        console.log(cres1);

        // แท่ง ปัจจุบัน
        // for (let i = 0; i < 10; i++) {
        //     let res1 = await volume.get(1396.5, 'แท่ง 1 ');
        //     // ต้องวัดความสูง ของ แท่งเขียวด้วย
        //     if (res1.color == 'green') {
        //         if (res1.volume > 1.5 * max) {
        //             await api.dispatch('COCOS/USDT : ' + res1.volume);
        //         }
        //     }

        //     await core.sleep(1);
        // }
        //}

        // send message to line
        // await api.dispatch(res2.volume);

        //let res1 = await volume.get(1391.1, 'แท่ง 1 ');

        // เขียว
        // volume 
        //console.log(res1.color)
        // [1397,570]

        // for (let i = 0; i < 10; i++) {
        //     let res1 = await volume.getVolumeAlternated(1391.1, 'แท่ง 1 ');

        //     console.log(res1, 'res1 ');

        //     //await api.dispatch('GALA/USDT : ' + res1.color + ' | volume (5min) : ' + res1.volume);

        //     //await core.sleep(2);
        // }
    },
};