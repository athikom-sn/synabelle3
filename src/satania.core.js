// import { createRequire } from "module";
// const require = createRequire(
//     import.meta.url);



// import Tesseract from 'tesseract.js';

const core = require("./core/core.main.js");

const btc = require('./core/price.find.js');
const robot = require("robotjs");
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

    accessMM: function(x, y) {
        robot.moveMouse(x * 0.8, y * 0.8);
    },

    accessMMSmoothty: function(x, y) {
        robot.moveMouseSmooth(x * 0.8, y * 0.8);
    },

    automove: async function() {
        // ?????? run ahk
        // var exec = require('child_process').exec;
        // const res = exec('"%programfiles%/AutoHotkey/AutoHotkey.exe" "C:\\Users\\ammso\\Desktop\\foo\\synabelle\\assets\\ahk\\autowing.ahk"');

        // loop for coding..
        await core.sleep(1);
        this.accessMM(467, 110);

        // return;
        while (true) {
            await core.sleep(3);
            let solve = Math.floor(Math.random() * this.solves.length);
            // let
            solve = 1;

            await core.sleep(1);
            switch (solve) {
                case 1:
                    // coding
                    await this.coding();
                    break;
                case 2:
                    // searching
                    await this.searching();
                    break;
                case 3:
                    // do postman
                    await this.postman();
                    break;
            }
            await core.sleep(1);
        }
    },

    docoding: async function(textsx) {
        // newline
        robot.typeString("\n");
        await core.sleep(0.5);
        // ?? tab
        //robot.typeString('\t');
        await core.sleep(3);

        /**
         *
         * ?????????
         */
        for (var i = 0; i < textsx.length; i++) {
            if (textsx[i] == " ") await core.sleep(0.02);
            else await core.sleep(0.1);
            robot.typeString(textsx[i]);
        }
        await core.sleep(1);
        robot.keyTap("f1");
        await core.sleep(1);
        robot.keyTap("enter");
    },

    dosearching: async function(textsx) {
        await core.sleep(3);

        for (var i = 0; i < textsx.length; i++) {
            if (textsx[i] == " ") await core.sleep(0.02);
            else await core.sleep(0.1);
            robot.typeString(textsx[i]);
        }
        await core.sleep(1);
        //robot.typeString('\n');
        robot.keyTap("enter");
        await core.sleep(3);
    },
};