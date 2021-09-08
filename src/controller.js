const core = require('./core/core.main.js');

var robot = require("robotjs");

module.exports = {
    solves: [1, 2, 3],

    /**
     * Code lists ที่อยากให้สุ่ม และพิมพ์
     */
    codelists: [
        `<div class="display-3"><p>SURVEY (RESEARCH)</p>`,
        `<a  href="mailto:hello@epicmax.co"  
target="_blank"  
class="app-navbar__mailto-link"  
:style="{color: this.$themes.primary}" >`,
        `<va-button  
href="https://github.com/epicmaxco/vuestic-admin"  
color="#000000"  
class="app-navbar__button" 
target="_blank" >`,
        `<va-icon-menu-collapsed  class="app-navbar__menu"  v-if="minimized && !isTopBar"  @click.native="$emit('update:minimized', !minimized)"  :color="contextConfig.invertedColor ? $themes.gray : 'white'" />`,
        `<div id="app-2"><span v-bind:title="message">
Hover your mouse over me for a few seconds
to see my dynamically bound title!

</div>`,
        `<label>{{ label }}<input
v-bind="$attrs"
v-bind:value="value"
v-on:input="$emit('input', $event.target.value)"
>
`,
        `<text-document
v-bind:title="doc.title"
v-on:update:title="doc.title = $event"
        >`,
        `<div id="components-demo">
<button-counter>
<button-counter>
<button-counter>
        `,
        `<div><blog-post title="My journey with Vue">
<blog-post title="Blogging with Vue">
<blog-post title="Why Vue is so fun">`,
        `<div>
<!-- Dynamically assign the value of a variable -->
<blog-post v-bind:title="post.title">

<!-- Dynamically assign the value of a complex expression -->
<blog-post
v-bind:title="post.title + ' by ' + post.author.name"
>
`,
        `<div>
<!-- Even though the object is static, we need v-bind to tell Vue that -->
<!-- this is a JavaScript expression rather than a string.             -->
<blog-post
v-bind:author="{
    name: 'Veronica',
    company: 'Veridian Dynamics'
}"
>

<!-- Dynamically assign to the value of a variable. -->
<blog-post v-bind:author="post.author">`,
    ],

    searchlists: [
        'boostrap vue',
        'flutter dynamic link',
        'vuetify button size sm',
        'postman how to declare variable',
        'vuex stores not send files',
        'vue router redirect',
        'a href link not working',
        'span css3 display',
        'how to center div',
        'boostrap grid system stackoverflow',
        'stackoverflow react-native ios build code error 65',
        'what is 403 meaning in apache',
        'nginx can i setting override path',
        'dockerignore is not working',
        'gitlab ci cd build fail in 2nd pipeline stackoverflow',
        'git restore . is not working when clearing files',
        'gitignore not working how can i do',
        'jquery modal is not wokring',
        'javascript async await not working stackoverflow',
        'centos7 cant set bridge network',
        'centos7 firewall apache',
        'mariadb cant set index in table',
    ],

    accessMM: function(x,y) {
        robot.moveMouse(x*0.8, y*0.8);
    },

    accessMMSmoothty: function(x,y) {
        robot.moveMouseSmooth(x*0.8, y*0.8);
    },

    automove: async function () {
        // สำหรับ run ahk
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

    searching: async function () {
        await core.sleep(3);
        robot.setMouseDelay(1000);

        // เลือกโครม
        this.accessMM(912, 1005);
        robot.mouseClick();
        await core.sleep(2);

        // เลือก 1 แถบตรงกลาง
        this.accessMM(913, 931);
        robot.mouseClick();
        await core.sleep(2);

        // ไปหน้าแรก
        this.accessMMSmoothty(222,124);
        robot.mouseClick();
        await core.sleep(3.5);

        // ไปแทบเสิช
        this.accessMMSmoothty(758, 486);
        robot.mouseClick();
        await core.sleep(1);
        
        let textsx = this.searchlists[Math.floor(Math.random() * this.searchlists.length)];

        await this.dosearching(textsx);
        await core.sleep(3);

        this.accessMMSmoothty(498, 332);
        robot.mouseClick();

        await core.sleep(0.5);
        this.accessMM(303, 364);
        robot.mouseClick();

        await core.sleep(12);
    },

    coding: async function () {
        /**
         * Position x,y หาจากได้จาก โปรแกรม Paint ซ้ายล่าง
         */
        await core.sleep(3);
        robot.setMouseDelay(1000);

        // เลือกโปรแกรม
        this.accessMM(699, 1056);
        robot.mouseClick();
        await core.sleep(2);
        // ไปที่ เลือก
        this.accessMM(902, 977);
        await core.sleep(0.25);
        robot.mouseClick();

        // ????????
        // robot.mouseToggle("down");

        // ไปแทบแรก
        this.accessMMSmoothty(471, 110);
        await core.sleep(1);
        robot.mouseClick();
        await core.sleep(2.5);

        // presition (code ไม่โค้ด)
        if (!Math.round(Math.random())) {
            //771,187
            await core.sleep(2);
            this.accessMMSmoothty(777, 187);
            await core.sleep(1);
            robot.mouseClick();


            /**
             * สุ่มโค้ดด้านบน
             * มาเขียนโปรแกรม
             */
            let textsx = this.codelists[Math.floor(Math.random() * this.codelists.length)];

            await this.docoding(textsx);
        }

        // ไปแทป 3
        this.accessMMSmoothty(687, 113);
        await core.sleep(1);
        robot.mouseClick();
        await core.sleep(2.5);

        // presition (code ไม่โค้ด)
        if (!Math.round(Math.random())) {
            //771,187
            await core.sleep(2);
            this.accessMMSmoothty(682, 208);
            await core.sleep(1);
            robot.mouseClick();

            let textsx = this.codelists[Math.floor(Math.random() * this.codelists.length)];

            await this.docoding(textsx);
        }

        await core.sleep(2);
        // ไปแทป 5 มั้ง
        this.accessMMSmoothty(815, 113);
        await core.sleep(1);
        robot.mouseClick();

        await core.sleep(12);
        // ไปแทป 6
        this.accessMMSmoothty(995, 111);
        await core.sleep(1);
        robot.mouseClick();

        // บังคับโค้ด
        if (true) {
            await core.sleep(2);
            this.accessMMSmoothty(624, 337);
            await core.sleep(1);
            robot.mouseClick();

            let textsx = this.codelists[Math.floor(Math.random() * this.codelists.length)];

            await this.docoding(textsx);
        }
        await core.sleep(12);
        

        /**
         * ตัวอย่างการสร้าง tab และ เว้นบรรทัด
         */
        // await core.sleep(1);
        // this.accessMM(453, 221);
        // robot.mouseClick();


        /**
         * ไป tab อื่นๆ
         * 1. ควรหา Position (x,y) ใน tab ใหม่
         */
        await core.sleep(3);
        // this.accessMMSmoothty(827, 673);

        // this.accessMMSmoothty(827, 873);
        // await core.sleep(15);

        // this.accessMMSmoothty(775, 98);
        // robot.mouseClick();
        // await core.sleep(35);

        // this.accessMMSmoothty(1215, 104);
        // robot.mouseClick();
        // await core.sleep(65);
    },

    postman: async function () {
        /**
         * Position x,y ??????????? ??????? Paint ????????
         */
        await core.sleep(3);
        robot.setMouseDelay(1000);

        // open Postman
        this.accessMM(955, 1007);
        robot.mouseClick();
        await core.sleep(2);


        await core.sleep(60);
    },

    docoding: async function (textsx) {

        // newline
        robot.typeString('\n');
        await core.sleep(0.5);
        // กด tab
        //robot.typeString('\t');
        await core.sleep(3);

        /**
         * 
         * ?????????
         */
        for (var i = 0; i < textsx.length; i++) {
            if (textsx[i] == ' ')
                await core.sleep(0.02);
            else
                await core.sleep(0.1);
            robot.typeString(textsx[i]);
        }
        await core.sleep(1);
        robot.keyTap('f1');
        await core.sleep(1);
        robot.keyTap('enter');
    },

    dosearching: async function (textsx) {
        await core.sleep(3);

        for (var i = 0; i < textsx.length; i++) {
            if (textsx[i] == ' ')
                await core.sleep(0.02);
            else
                await core.sleep(0.1);
            robot.typeString(textsx[i]);
        }
        await core.sleep(1);
        //robot.typeString('\n');
        robot.keyTap('enter');
        await core.sleep(3);
    }
};