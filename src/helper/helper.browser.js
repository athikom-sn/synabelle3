const robot = require("robotjs");

const core = require("./../core/core.main");
const corecolour = require("./../core/core.color");

const clipboardy = require('clipboardy');
const { performance } = require('perf_hooks');

module.exports = {
    coord: {
        url: [315, 68],
        arrowDown: [447, 382],
    },

    redirector: async function(url) {
        //require('child_process').spawn('clip').stdin.end(util.inspect(url).replace(/'/g, ""));
        clipboardy.writeSync(url);

        core.moveto(this.coord.url);
        robot.mouseClick();
        await robot.keyTap("a", "control");

        await core.sleep(0.5);

        robot.keyTap("v", "control");

        core.submit()

        //await core.sleep(10);
    },

    open: async function(url = String('https://www.binance.com/en/trade/SAND_USDT'), option = {}) {
        clipboardy.writeSync(url);
        core.moveto(this.coord.url);
        robot.mouseClick();
        robot.keyTap("a", "control");

        await core.sleep(0.05);

        robot.keyTap("v", "control");

        core.submit();

        await core.sleep(0.3);

        // find til it already open ...
        // หาตำแหน่ง Arrow Down ว่ากราฟโหลดเสร็จหรือยัง

        // var startTime = performance.now();
        for (let i = 0; i < 100; i++) {
            const linecolor = core.getColor(this.coord.arrowDown[0], this.coord.arrowDown[1]);
            const iswhite = await corecolour.beLikely(linecolor, this.color.loading, 60);

            if (!iswhite) {
                // foundstatus = true;
                await core.sleep(0.2);
                // console.log('last', linecolor);
                break;
            }

            await core.sleep(0.1);
        }

        //await core.sleep(0.5);

        // const endTime = performance.now();

        // const timeDiff = (endTime - startTime);

        // console.log('exit [browser openning]', timeDiff);
    },

    marketScript: {
        o1: `let coins = [];`,
        o2: `document.querySelectorAll('.css-vlibs4').forEach(item => {
            const coin = item.querySelector('[data-bn-type="text"]').innerText;
            (coins.indexOf(coin) === -1) && coins.push(coin);
        });`,
        o3: `document.querySelector('[data-bn-type="button"][aria-label="Next page"]').click();`,

        o4: `var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        
        var raw = JSON.stringify({
          "coins": coins
        });
        
        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        };
        
        fetch("http://localhost:3000/update", requestOptions)
          .then(response => response.text())
          .then(result => console.log(result))
          .catch(error => console.log('error', error));`
    },
    openMarket: async function(url = String('https://www.binance.com/en/markets/spot-USDT')) {
        clipboardy.writeSync(url);
        core.moveto(this.coord.url);
        robot.mouseClick();
        robot.keyTap("a", "control");

        await core.sleep(0.05);

        robot.keyTap("v", "control");

        core.submit();
        await core.sleep(3);

        robot.keyTap("f12");
        await core.sleep(1);

        core.move(56, 119);
        robot.mouseClick();
        await core.sleep(0.5);

        core.move(349, 261);
        robot.mouseClick();

        // รันสคริปต์ 
        // รันสคริปต์ : ประกาศตัวแปร
        await this.runscript(this.marketScript.o1);

        for (var i = 0; i < 17; i++) {
            // scirpt : เก็บเหรียญ
            await this.runscript(this.marketScript.o2);

            // scirpt : กดปุ่ม next
            await this.runscript(this.marketScript.o3);
        }

        await this.runscript(this.marketScript.o4);
    },

    runscript: async function(textscript = String('')) {
        clipboardy.writeSync(textscript);
        robot.keyTap("a", "control");
        await core.sleep(0.05);
        robot.keyTap("v", "control");
        core.submit();
        await core.sleep(0.5);
    },

    color: {
        greens: [
            // '#7fd0b4',
            // '#9fdbc7',
            '#0ecb81',
            '#adebd2',
            '#5cdaa9',
            '#d0f1e4'
        ],

        whites: [
            '#fafafa',
            '#f4f5f6',
        ],
        loading: ['#f3f3f3', '#ffffff']
    },

    get: async function(x, y) {
        let _y = y;
        let n = 1;

        const grainpoint = 2;

        let resultset = {
            color: '?',
            n: 0
        };

        while (true) {
            let linecolor = core.getColor(x, _y);
            let isgreen = await corecolour.beLikely(linecolor, this.color.greens);

            if (isgreen) {
                _y -= grainpoint;
                resultset.n += 1;
            } else {
                console.log('not green', linecolor);
                break;
            }
        }

        return resultset;
    },

    findgreen: async function(x) {
        let _y = 740
            // x -= 1;
        let foundstatus = false;
        let resultset = {
            color: '?',
            n: 0,
        }

        while (true) {
            if (_y <= 0) break;

            let linecolor = core.getColor(x, _y);
            let iswhite = await corecolour.beLikely(linecolor, this.color.whites);

            if (!iswhite) {
                foundstatus = true;
                break;
            }

            _y -= 2;
        }

        if (foundstatus) {
            // ... ???????????? ?????????????? ...
            resultset = await this.get(x, _y);
            return resultset;
        } else {
            // ... ??? ???? or Error detected
            return resultset;
        }
    },
}