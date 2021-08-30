const core = require('./core/core.main.js');

var robot = require("robotjs");

module.exports = {
    codelists: [
        `<div class="display-3"><p>SURVEY (RESEARCH)</p></div>`,
        `<a  href="mailto:hello@epicmax.co"  
            target="_blank"  
            class="app-navbar__mailto-link"  
            :style="{color: this.$themes.primary}" >`,
        `<va-button  
            href="https://github.com/epicmaxco/vuestic-admin"  
            color="#000000"  
            class="app-navbar__button" 
            target="_blank" >`,
        `<va-icon-menu-collapsed  class="app-navbar__menu"  v-if="minimized && !isTopBar"  @click.native="$emit('update:minimized', !minimized)"  :color="contextConfig.invertedColor ? $themes.gray : 'white'" />`
    ],

    automove: async function() {
        // สำหรับ run ahk
        // var exec = require('child_process').exec;
        // const res = exec('"%programfiles%/AutoHotkey/AutoHotkey.exe" "C:\\Users\\ammso\\Desktop\\foo\\synabelle\\assets\\ahk\\autowing.ahk"');

        // loop for coding..
        while (true) {
            /**
             * Position x,y หาจากได้จาก โปรแกรม Paint ซ้ายล่าง
             */
            await core.sleep(3);
            robot.setMouseDelay(1000);

            robot.moveMouse(428, 103);

            // ????????
            // robot.mouseToggle("down");

            robot.moveMouseSmooth(524, 100);
            await core.sleep(1);
            robot.mouseClick();

            /**
             * สุ่มโค้ดด้านบน
             * มาเขียนโปรแกรม
             */
            let textsx = this.codelists[Math.floor(Math.random() * this.codelists.length)];

            /**
             * ตัวอย่างการสร้าง tab และ เว้นบรรทัด
             */
            await core.sleep(1);
            robot.moveMouse(453, 221);
            robot.mouseClick();
            robot.typeString('\n');
            robot.typeString('\t');
            await core.sleep(4);
    
            /**
             * พิมพ์โค้ด
             */        
            for (var i = 0; i < textsx.length; i++) {
                if (textsx[i] == ' ')
                    await core.sleep(0.02);
                else
                    await core.sleep(0.1);
                robot.typeString(textsx[i]);
            }

            /**
             * ไป tab อื่นๆ
             * 1. ควรหา Position (x,y) ใน tab ใหม่
             */
            await core.sleep(3);
            robot.moveMouseSmooth(827, 673);

            robot.moveMouseSmooth(827, 873);
            await core.sleep(15);

            robot.moveMouseSmooth(775, 98);
            robot.mouseClick();
            await core.sleep(35);

            robot.moveMouseSmooth(1215, 104);
            robot.mouseClick();
            await core.sleep(65);
        }
    },
};