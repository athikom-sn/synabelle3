// Move the mouse across the screen as a sine wave.

const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();

// import observerable
const { Observable } = require('rxjs')

// import controller
const controller = require('./src/controller.js');

var internetStatus = true;

// server เปิดมาเพื่อ test เฉยๆ จ้า
router.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
    //__dirname : It will resolve to your project folder.
});

//add the router
app.use('/', router);
app.listen(process.env.port || 3001);
console.log('Running at Port 3000w');



// const subscription = interval(1000)
//     .pipe(
//         map(async function(i) {
//             var res = await checkConnection();
//             console.log(res);
//             return res
//         })
//     ).subscribe(function(res) {
//         console.log('eiei', res);
//     });

// o.subscribe(x => console.log(x))

// const observable = new Observable(subscriber => {
//     subscriber.next("Hello,")
//     subscriber.next("My name is...")
//     subscriber.next("Linus :)")
//         // subscriber.complete()
// })

// console.log(observable)

// observable.subscribe({
//     next: x => { console.log(x) },
//     error: err => { console.log("Error : " + err) },
//     complete: () => { console.log("Done...") }
// })

//controller.init();

async function checkConnection() {
    return await new Promise((resolve, _) => {
        require('dns').lookup('google.com', function(err) {
            if (err && err.code == "ENOTFOUND") {
                // เน็ตตัดเด้อ
                // console.log('OFF เน็ตตัดค่ะ')
                internetStatus = false;
                resolve(false);
            } else {
                // console.log('ONเน็ตติดอยู่ค่ะ')
                internetStatus = true;
                resolve(true);
                // เน็ตยังไม่ตัดจ้า ...
            }
        })
    }).finally(res => res)
}

async function connection_() {
    return await new Promise((resolve, __) => {
        var interval = setInterval(async function() {
            var res = await checkConnection();

            if (!res) {
                // clearInterval(interval);
                resolve(res);
            }
        }, 1000);
    }, );
}

// connection_();