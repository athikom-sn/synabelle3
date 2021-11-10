var robot = require("robotjs");
var Jimp = require('jimp');
const fs = require('fs');
const PNG = require('pngjs').PNG;
const pixelmatch = require('pixelmatch');

const { rejects } = require("assert");
const { resolve } = require("path");


const { PerformanceObserver, performance } = require('perf_hooks');

// const this = require('./core.main.js');

async function screenCaptureToFile2(robotScreenPic, path) {
    return await new Promise((resolve, reject) => {
        try {
            const image = new Jimp(robotScreenPic.width, robotScreenPic.height);
            let pos = 0;
            // 1172, 280
            image.scan(0, 0, image.bitmap.width, image.bitmap.height, (x, y, idx) => {
                image.bitmap.data[idx + 2] = robotScreenPic.image.readUInt8(pos++);
                image.bitmap.data[idx + 1] = robotScreenPic.image.readUInt8(pos++);
                image.bitmap.data[idx + 0] = robotScreenPic.image.readUInt8(pos++);
                image.bitmap.data[idx + 3] = robotScreenPic.image.readUInt8(pos++);
            });

            // console.log('image', image.bitmap.data);
            // console.log('\n');

            // save to db
            image.write(path, resolve);
        } catch (e) {
            console.error(e);
            reject(e);
        }
    });
}

async function screenCaptureRealTime(robotScreenPic, path) {
    return await new Promise((resolve, reject) => {
        try {
            const image = new Jimp(robotScreenPic.width, robotScreenPic.height);
            let pos = 0;
            // 1172, 280
            image.scan(0, 0, image.bitmap.width, image.bitmap.height, (x, y, idx) => {
                image.bitmap.data[idx + 2] = robotScreenPic.image.readUInt8(pos++);
                image.bitmap.data[idx + 1] = robotScreenPic.image.readUInt8(pos++);
                image.bitmap.data[idx + 0] = robotScreenPic.image.readUInt8(pos++);
                image.bitmap.data[idx + 3] = robotScreenPic.image.readUInt8(pos++);
            });
            //robotScreenPic.image.re

            // console.log('image', image.bitmap.data);
            // console.log('\n');
            resolve(image.bitmap.data);

            // save to db
            // image.write(path, resolve);
        } catch (e) {
            console.error(e);
            reject(e);
        }
    });
}

module.exports = {
    sleep: function(ms) { return new Promise(resolve => setTimeout(resolve, ms * 1000)) },

    save: async function(container, img2) {
        // await this.sleep(1)
        //var t0 = performance.now();
        const pic = robot.screen.capture(container.x, container.y, img2.width, img2.height);
        // around 12 millisec



        await screenCaptureToFile2(pic, `C:\\Users\\ammso\\foo\\satania\\assets\\image\\${container.name}`)
            // const bitmap = await screenCaptureRealTime(pic, `C:\\Users\\ammso\\foo\\satania\\assets\\image\\${container.name}`);

        //var t1 = performance.now();
        //console.log(`(x ${t1 - t0}) + " milliseconds.`);
        // console.log(bitmap);
        // await this.sleep(1)
        //return bitmap;
    },

    // pic1 คือที่ capture มา => save
    // pic2 มาจาก database
    diff: async function(pic1, img2) {
        await this.sleep(1)
        const img1 = PNG.sync.read(fs.readFileSync(`C:\\Users\\ammso\\foo\\satania\\assets\\image\\${pic1}`));
        // const img2 = PNG.sync.read(fs.readFileSync(`C:\\Users\\ammso\\foo\\satania\\assets\\image\\${pic2}`));
        const { width, height } = img1;
        const diff = new PNG({ width, height });

        const difference = await pixelmatch(img1.data, img2.data, diff.data, width, height, { threshold: 0.1 });

        const compatibility = 100 - difference * 100 / (width * height);
        return compatibility
    },

    // name 2 : 
    // {name, name2}
    diffImage: async function(container) {
        // minimum 20 รอบ .. 
        if (!container.hasOwnProperty('name'))
            container.name = 'demo2.png'

        // name 2 คือ name ของ database
        if (!container.hasOwnProperty('name2'))
            return false

        const img2 = PNG.sync.read(fs.readFileSync(`C:\\Users\\ammso\\foo\\satania\\assets\\image\\${container.name2}`));

        var isitok = false
            // 10 วิ พอ
        for (let i = 0; i < 10; i++) {
            console.log('first console')
            await this.sleep(1);
            console.log('last console')
                // this is pic 2
            await this.save(container, img2)

            const percent = await this.diff(container.name, img2)

            console.log('try to diff image')

            if (percent >= 90) {
                isitok = true
                break
            }
        }
        await this.sleep(1)
        return isitok
    },

    fastdiff: async function(container) {
        // minimum 20 รอบ .. 
        if (!container.hasOwnProperty('name'))
            container.name = 'demo2.png'

        // name 2 คือ name ของ database
        if (!container.hasOwnProperty('name2'))
            return false

        const img2 = PNG.sync.read(fs.readFileSync(`C:\\Users\\ammso\\foo\\satania\\assets\\image\\${container.name2}`));

        var isitok = false
            // 10 วิ พอ
        for (let i = 0; i < 3; i++) {
            await this.sleep(1);

            // this is pic 2
            await this.save(container, img2);

            const percent = await this.diff(container.name, img2)

            // console.log('กำลังเปรียบเทียบรูปภาพ ครั้งที่ ..')

            if (percent >= 90) {
                isitok = true
                return true
                break
            }
        }
        await this.sleep(1)
        return isitok
    },

    diffWithOutWating: async function(pic1, img2) {

        const img1 = PNG.sync.read(fs.readFileSync(`C:\\Users\\ammso\\foo\\satania\\assets\\image\\${pic1}`));

        // const img2 = PNG.sync.read(fs.readFileSync(`C:\\Users\\ammso\\foo\\satania\\assets\\image\\${pic2}`));
        const { width, height } = img1;
        const diff = new PNG({ width, height });

        const difference = await pixelmatch(img1.data, img2.data, diff.data, width, height, { threshold: 0.25 });

        const compatibility = 100 - difference * 100 / (width * height);
        return compatibility
    },

    onceDiff: async function(container) {
        if (!container.hasOwnProperty('name'))
            container.name = 'demo2.png';

        // name 2 คือ name ของ database
        if (!container.hasOwnProperty('name2'))
            return false;
        // var t0 = performance.now();
        const img2 = PNG.sync.read(fs.readFileSync(`C:\\Users\\ammso\\foo\\satania\\assets\\image\\${container.name2}`));

        const pic = robot.screen.capture(container.x, container.y, img2.width, img2.height);
        await screenCaptureToFile2(pic, `C:\\Users\\ammso\\foo\\satania\\assets\\image\\${container.name}`);

        const percent = await this.diffWithOutWating(container.name, img2)

        // console.log(container.name + ' : ' + percent)

        console.log('real percent ' + container.name, percent);

        if (percent >= 61.6) {
            return true
        } else return false
    },

    onceDiff2: async function(container) {
        if (!container.hasOwnProperty('name'))
            container.name = 'demo2.png';

        // name 2 คือ name ของ database
        if (!container.hasOwnProperty('name2'))
            return false;

        const img2 = PNG.sync.read(fs.readFileSync(`C:\\Users\\ammso\\foo\\satania\\assets\\image\\${container.name2}`));

        var isitok = false
            // 10 วิ พอ

        const pic = robot.screen.capture(container.x, container.y, img2.width, img2.height);
        await screenCaptureToFile2(pic, `C:\\Users\\ammso\\foo\\satania\\assets\\image\\${container.name}`);

        const percent = await this.diffWithOutWating(container.name, img2)

        // console.log(container.name + ' : ' + percent)

        console.log('real percent ' + container.name, percent);

        if (percent >= 61.6) {
            return true
        } else return false
    }
}