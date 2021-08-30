const { range } = require('rxjs');
const { map, filter, takeUntil } = require('rxjs/operators');
const { interval } = require('rxjs');
const { resolve } = require('path');
const { rejects } = require('assert');

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

// const fiveEvenNumbers = evenNumberCount.pipe(filter(val => val > 5));

module.exports = {
    get: function() {
        return interval(1000)
            .pipe(
                map(function(i) {
                    var res = checkConnection();
                    return res
                }),
                // takeUntil(
                //     filter(res => {
                //         console.log(res)
                //     })
                // )
            );
    },
};