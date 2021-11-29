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

const browser = require('./helper/helper.browser');
const util = require('util');

// Set up OCR ..
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

        // const res4 = await volume.get(1372.5, 'แท่ง 4 ');
        // max = res4.volume > max && res4.color == 'green' ? res4.volume : max
        //     //     // console.log(res4);

        // const res3 = await volume.get(1380.5, 'แท่ง 3 ');
        // max = res3.volume > max && res3.color == 'green' ? res3.volume : max
        //     //     // console.log(res3);

        // const res2 = await volume.get(1388.5, 'แท่ง 2 ');

        // const average = (res2.volume + res3.volume + res4.volume) / 3;

        // const res1 = await volume.get(1396.5, worker, 'แท่ง 1 ');

        //let cres1 = await sfysx.get(1396.5);
        // core.move(1396.5, 758);
        // const cres1 = await sfysx.findgreen(1396.5);


        const coins = ['RSR', 'SAND', 'GALA', 'RSR', 'DAR', 'AXS', 'MBOX', 'COTI', 'QI', 'SUPER', 'XTZ', 'ZIL', 'SUSHI'];

        await core.sleep(1);

        const mainurl = `https://www.binance.com/en/trade`;

        for (var i = 0; i < coins.length; i++) {
            const coin = coins[i];

            await core.sleep(1);
            await browser.redirector(`${mainurl}/${coin}_USDT`);

            const { width } = await sfysx.findmargin(864);
            const current = {
                x: 1391 + (66 - width),
                y: 0
            }

            core.move(current.x, 738)
            const res = await sfysx.findgreen(current.x);
            if (res.n > 10) {
                console.log('green ??????? ...');

                let datestring = new Date().toLocaleString("en-US", { timeZone: "Asia/Bangkok" });
                await api.dispatch(coin + '/USDT : ' + res.n + ' ' + datestring);
            }
        }

        await api.dispatch('หมดคู่ search แล้ว');

        /*
        coins.forEach(async function(coin) {
            await browser.redirector(`${mainurl}/${coin}_USDT`);

            //require('child_process').spawn('clip').stdin.end(util.inspect(`${mainurl}/${coin}_USDT`).replace(/'/g, ""));


            //await core.sleep(1.25);
            //console.log('why')

            // const { width } = await sfysx.findmargin(864);
            // const current = {
            //     x: 1391 + (66 - width),
            //     y: 0
            // }

            // core.move(current.x, 738)
            // const res = await sfysx.findgreen(current.x);
            // if (res.n > 10) {
            //     console.log('green ??????? ...');

            //     let datestring = new Date().toLocaleString("en-US", { timeZone: "Asia/Bangkok" });
            //     await api.dispatch(coin + '/USDT : ' + res.n + ' ' + datestring);
            // }
        });
        */

        //await api.dispatch('หมดคู่ search แล้ว');
        return;
    },
};