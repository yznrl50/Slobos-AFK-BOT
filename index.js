const mineflayer = require('mineflayer');
const http = require('http');

http.createServer((req, res) => { res.end("System: Split-Bot Active"); }).listen(process.env.PORT || 3000);

const connectionSettings = {
    host: '185.107.194.193',
    port: 43820,
    version: '1.21.1'
};

const OFFICIAL_NAME = 'Slobos_AFK'; 

function launchSystem() {
    console.log("--- [1] إرسال التمويهي لفك الحظر... ---");
    const decoy = mineflayer.createBot({
        ...connectionSettings,
        username: 'Ghost_' + Math.floor(Math.random() * 100)
    });

    // بعد 10 ثوانٍ، نغلق التمويهي تماماً وننتظر قليلاً
    setTimeout(() => {
        console.log("--- [2] إغلاق التمويهي وانتظار 5 ثوانٍ لتنظيف الجلسة... ---");
        decoy.quit();

        // ننتظر 5 ثوانٍ إضافية بعد خروج التمويهي قبل دخول الرسمي
        setTimeout(() => {
            console.log("--- [3] إرسال الرسمي الآن: " + OFFICIAL_NAME + " ---");
            launchOfficial();
        }, 5000);

    }, 10000);
}

function launchOfficial() {
    const bot = mineflayer.createBot({
        ...connectionSettings,
        username: OFFICIAL_NAME
    });

    bot.once('spawn', () => {
        console.log("--- [نجاح] " + OFFICIAL_NAME + " استقر في السيرفر! ---");
        bot.setControlState('jump', true);
        setTimeout(() => bot.setControlState('jump', false), 1000);
        setTimeout(() => { bot.chat('/fly'); }, 5000);
    });

    bot.on('error', (err) => {
        console.log("--- خطأ في الرسمي: " + err.message);
    });

    bot.on('end', () => {
        console.log("--- انقطع الرسمي، إعادة النظام بعد 40 ثانية ---");
        setTimeout(launchSystem, 40000);
    });
}

launchSystem();
