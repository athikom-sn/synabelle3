var robot = require("robotjs");

const core = require('./core.main.js');
const coreimage = require('./core.image.js');

const subscription = require('../connection.js');
const { resolve } = require("path");
const { rejects } = require("assert");

var async = require("async");

const bwings = require('../helper/use.bwing.js');

const { Readable } = require('stream')
const readStream = new Readable({
    read() {}
})

readStream.on('end', () => {
    console.log("No more data")
})

var connx = true

module.exports = {
    init: async function() {
        var outoffLoop = true

        // async.parallel([
        //     function(callback) {
        //         subscription.get().subscribe(async function(conn) {
        //             var res = await conn
        //             if (res) {
        //                 // เนตติด
        //                 connx = true
        //                     // console.log('เนตติด', res)
        //                     // callback();
        //                     // clearInterval(intervalId);
        //             } else {
        //                 // เนตตัด
        //                 connx = false
        //             }
        //         })
        //     },
        //     function(c) {
        //         series()
        //         c()
        //     },
        // ], (err, data) => {
        //     if (err) {
        //         // console.log('error', err)
        //         // you handle the errors here
        //     }
        // });

        // return await new Promise(async(resolve, reject) => {
        //         // series();
        //     })
        //     .catch(err => {
        //         console.log('latest err', err)
        //     })

        try {
            // console.log('555555555')

            // await core.sleep(5);

            // console.log('77777777777');

            // subscription.get().subscribe(function(conn) {
            //     console.log('hey', conn)
            // });

            // subscription.get().subscribe(conn => {
            // subscription.get().subscribe(async function(conn) {
            //         var res = await conn
            //         if (res) {
            //             throw new Error('43434')
            //         }

            //     })
            // console.log(conn)

            // conn.then(res => {
            //     if (res == false) {
            //         (async function() {
            //             return await new Promise((_, rejects) => {
            //                 rejects(new Error('5055555'))
            //             })
            //         })
            //     } else {
            //         (async function() {
            //             return await new Promise((_, rejects) => {
            //                 rejects(new Error('5055555'))
            //             }).catch(err => {
            //                 throw new Error(err)
            //             })
            //         })();
            //         // console.log(555)
            //     }
            // })
            // })

            var container = {};

            // ไปที่ nox
            robot.moveMouse(611, 1066);
            robot.mouseClick();

            // ไปที่ run emu ตัวแรก
            // (หน้า setting ใน nox)
            await core.sleep(2);
            container = {}
            container.x = 1138
            container.y = 393
            robot.moveMouse(container.x, container.y);
            robot.mouseClick();

            // รอเครื่องเปิดสำเร็จ
            // container.color = '#0f052a'
            // await core.colorcheck(container);
            await core.sleep(20);

            // กดออกจาก settings
            await core.sleep(1);
            robot.keyTap('escape')
            robot.keyTap('escape')

            // เปิด Ragnarok
            robot.moveMouse(1237, 328);
            robot.mouseClick();

            // เปิด core แยก หากเจอ noti ..
            // robot.moveMouse(939, 887);
            console.log('OPEN ROM...')


            const dlres = await coreimage.diffImage({ x: 961, y: 695, name2: 'downloadx961y695.png' })
            if (dlres) {
                console.log('found download need download')
                robot.moveMouse(1092, 728);
                await core.sleep(1);
                robot.mouseClick();
                // รอ ดาวโหลด 5 นาที
                await core.sleep(300);
                console.log('finished download')
            } else {
                console.log('no download')
            }

            console.log('ทะลุการตรวจภาพออกมาเลย ยังงั้นรึ');


            // รอจน fb มา
            // await core.sleep(15);
            (async function() {
                for (let i = 0; i < 15; i++) {
                    setTimeout(function() {
                        console.log('aw', 'login');
                        if (core.isColor({ x: 934, y: 895, color: '#3f5aa9' })) {
                            robot.moveMouse(934, 895);
                            // await core.sleep(1);
                            robot.mouseClick();
                        }
                    }, 1000);
                }
            })();
            // stand by to open ro
            robot.moveMouse(1237, 328);
            console.log('standby')

            // cut 566,403 => 623,81
            // 57, 81 px
            // 



            container = {};
            container.x = 1136;
            container.y = 443;
            container.color = '#3b5998';
            container.color2 = '#d38983';
            container.ms = 150;

            robot.moveMouse(container.x, container.y);
            // const cased = await core.colorcheck(container);

            // const cased = await core.isColor(container)
            // const cased = core.isColor(container)
            robot.moveMouse(1136, 443);
            var cased = 1;
            var res = core.isColor({ x: 1136, y: 443, color: '#3b5998' });

            if (res) {
                console.log(res, 'final res');
                cased = res;
                // if (core.isColor({ x: 1136, y: 443, color: '#3b5998' })) {
                //     cased = 1
                // } else {
                //     cased = 0
                // }
            } else {
                cased = false;
            }

            const lslsls = await coreimage.diffImage({ x: 566, y: 403, name2: 'facebook.png' });
            if (lslsls) {
                console.log('this is fb login');
                cased = true;
            } else {
                console.log('no fb login');
                cased = false;
            }

            // console.log('cased', cased, core.isColor({ x: 1136, y: 443, color: '#3b5998' }))
            if (cased == 1) {
                await core.sleep(1);
                // login FB
                robot.mouseClick();

                // ดำเนินการต่อ
                // เช้คด้วยดำเนินการต่อ
                container = {}
                container.x = 1011;
                container.y = 679;
                container.color = '#3578e5'
                robot.moveMouse(1011, 679);
                await core.colorcheck(container);
                robot.mouseClick();

                // container = {}
                // container.x = 932
                // container.y = 687
                // container.color = '#ffb3c7'
                robot.moveMouse(932, 687);
                // await colorcheck(container);
                await core.sleep(2);
                robot.mouseClick();
                await core.sleep(0.3);
                robot.mouseClick();
                await core.sleep(0.3);
                robot.mouseClick();
                await core.sleep(0.3);
                robot.mouseClick();
                await core.sleep(0.3);
            } else {
                robot.moveMouse(148, 406);
                robot.mouseClick()
                await core.sleep(1)
                robot.mouseClick()
                await core.sleep(1)
                robot.mouseClick()
                await core.sleep(1)
                robot.mouseClick()
                await core.sleep(1)
                robot.mouseClick()
                await core.sleep(1)
                robot.mouseClick()
            }

            // เลือกตัว JSC
            await core.sleep(12)
            console.log('กำลังเลือก jsc')
            robot.moveMouse(148, 406);
            robot.mouseClick()
            robot.mouseClick()

            // กดปุ่มส้ม
            await core.sleep(1)
            robot.moveMouse(1490, 924);
            robot.mouseClick()
            await core.sleep(1)
            robot.mouseClick()

            // หลัง เลือกตัวเสร็จ ให้รอ Load screen 15 วิ
            await core.sleep(15)
            robot.keyTap('escape')
            await core.sleep(1)

            // await core.sleep(1)
            // robot.moveMouse(1490, 924);
            // robot.mouseClick()
            // await core.sleep(1)
            // robot.mouseClick()

            // robot.moveMouse(1364, 134);
            // robot.mouseClick()
            // robot.mouseClick()
            // await core.sleep(1)

            // ปิด แทป ขวา สุด
            robot.moveMouse(1720, 352);
            robot.mouseClick()

            console.log('finished')

            await bwings.do();

            console.log('back to the town')
        } catch (err) {
            console.log('low loop', err)
        }
    }
}