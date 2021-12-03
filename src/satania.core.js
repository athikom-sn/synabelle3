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

    findVolume: async function() {
        //const coins = ['RSR', 'SAND', 'GALA', 'RSR', 'DAR', 'AXS', 'MBOX', 'COTI', 'QI', 'SUPER', 'XTZ', 'ZIL', 'SUSHI', 'STX', 'BETA', 'MBOX'];
        const coins = ['BETA'];

        await core.sleep(1);

        const mainurl = `https://www.binance.com/en/trade`;

        //while (true) {
        for (var i = 0; i < coins.length; i++) {
            const coin = coins[i];

            // search browser
            // await browser.redirector(`${mainurl}/${coin}_USDT`);

            // รอ browser load ...
            // await core.sleep(2.35);

            const { width } = await sfysx.findmargin(864).then(function(result) { return { width: 66 - result.width } });
            let current = {
                x: 1391 + width,
                y: 0
            }

            // ความสูงของกราฟ
            const res = await sfysx.findgreen(current.x);
            console.log(`${coin} ${res.n}`);

            // volume ที่แลกเปลี่ยนกันในช่วงนี้
            const { n } = await volume.zone(current.x);
            console.log('พื้นที่สีเขียว', n);

            // threshold
            if (res.n > 1) {
                // console.log('green ??????? ...', res.n);

                /*
                let datestring = new Date().toLocaleString("en-US", { timeZone: "Asia/Bangkok" });

                current.x = current.x - 8;
                // บาร์ที่แล้ว
                let altbar = await sfysx.findgreen(current.x);
                if (altbar.n > 5) {
                    console.log('green 2 ...', altbar.n);
                }*/

                // await api.dispatch(coin + '/USDT : ' + res.n + ' ' + datestring);
            }

            //            await core.sleep(1.5);

        }
        //    await core.sleep(10);


        await api.dispatch('done');

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

    doing: async function() {
        await core.sleep(1);
        const { width } = await sfysx.findmargin(864).then(function(result) { return { width: 66 - result.width } });

        // prepare improve search engine
        const coins = ['RSR', 'SAND', 'GALA', 'RSR', 'DAR', 'AXS', 'MBOX', 'COTI', 'QI', 'SUPER', 'XTZ', 'ZIL', 'SUSHI', 'STX', 'BETA', 'MBOX'];
        const mainurl = `https://www.binance.com/en/trade`;


        let stacks = 0;

        // ทั้งหมด 5 แท่ง
        for (var i = 0; i < 5; i++) {
            let current = {
                x: Number(1391 + width - (i * 8)),
                y: 0
            }

            // หาความยาว แท่งเขียว 
            const res = await sfysx.findall(current.x);
            console.log('ความสูงแท่งเขียว', res.n);

            // volume ที่แลกเปลี่ยนกันในช่วงนี้
            const { n } = await volume.greenzone(current.x);
            console.log('พื้นที่สีเขียว', n);

            // เงื่อนไขคือ res.n > 20 หรือ ... ว่าไป
            if (true) {
                stacks++;
            }
        }

    },
};