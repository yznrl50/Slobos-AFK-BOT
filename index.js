const mineflayer = require('mineflayer');
const http = require('http');

http.createServer((req, res) => { res.end("System Status: Double-Strike Active"); }).listen(process.env.PORT || 3000);

const connectionSettings = {
    host: '185.107.194.193', // تأكد أن هذا الآيبي لا يزال صحيحاً في أترنوس
    port: 43820,
    version: '1.21.1'
};

// هذا هو الاسم الذي يجب أن تضيفه في الـ Unrestricted
const OFFICIAL_NAME = 'Slobos_AFK'; 

function launchSystem() {
    console.log("--- [1] إرسال البوت التمويهي (Ghost) لفتح الطريق... ---");
    
    const decoy = mineflayer.createBot({
        ...connectionSettings,
        username: 'Ghost_' + Math.floor(Math.random() * 100)
    });

    // ننتظر 12 ثانية ثم ندخل بالبوت الرسمي
    setTimeout(() => {
        console.log("--- [2] إرسال البوت الرسمي الآن: " + OFFICIAL_NAME + " ---");
        launchOfficial();
        
        // إخراج البوت التمويهي بهدوء
        decoy.quit();
    }, 12000);
}

function launchOfficial() {
    const bot = mineflayer.createBot({
        ...connectionSettings,
        username: OFFICIAL_NAME
    });

    bot.on('spawn', () => {
        console.log("--- [نجاح] البوت الرسمي " + OFFICIAL_NAME + " استقر في السيرفر ---");
        
        // حركة بسيطة لمنع الـ Timeout
        bot.setControlState('jump', true);
        setTimeout(() => bot.setControlState('jump', false), 1000);

        setTimeout(() => {
            bot.chat('/fly');
            console.log("--- تم تفعيل الطيران للبوت الرسمي ---");
        }, 5000);
    });

    bot.on('error', (err) => {
        console.log("--- [خطأ في الرسمي]: " + err.message);
    });

    bot.on('end', () => {
        console.log("--- البوت الرسمي فصل، إعادة تشغيل النظام بعد 40 ثانية ---");
        setTimeout(launchSystem, 40000);
    });
}

launchSystem();
