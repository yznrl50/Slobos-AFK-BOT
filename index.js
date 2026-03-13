const mineflayer = require('mineflayer');
const http = require('http');

http.createServer((req, res) => { res.end("System: Forced Entry Active"); }).listen(process.env.PORT || 3000);

const connectionSettings = {
    host: '185.107.194.193',
    port: 43820,
    version: '1.21.1'
};

const OFFICIAL_NAME = 'Slobos_AFK'; 

function launchSystem() {
    console.log("--- [1] محاولة إرسال بوت التمويه... ---");
    const decoy = mineflayer.createBot({
        ...connectionSettings,
        username: 'Ghost_' + Math.floor(Math.random() * 100)
    });

    // نضع تايم آوت للبوت التمويهي عشان ما يعلق النظام لو فشل
    const decoyTimeout = setTimeout(() => {
        console.log("--- [!] التمويهي أخذ وقت طويل، سيتم إغلاقه إجبارياً ---");
        decoy.quit();
    }, 15000);

    decoy.once('login', () => {
        console.log("--- التمويهي نجح في الدخول (Login) ---");
    });

    // الجزء الأهم: محاولة دخول البوت الرسمي بشكل مستقل تماماً
    setTimeout(() => {
        console.log("--- [2] محاولة إرسال البوت الرسمي الآن: " + OFFICIAL_NAME + " ---");
        const officialBot = mineflayer.createBot({
            ...connectionSettings,
            username: OFFICIAL_NAME
        });

        officialBot.once('spawn', () => {
            console.log("--- [نجاح] البوت الرسمي استقر في السيرفر! ---");
            setTimeout(() => { officialBot.chat('/fly'); }, 5000);
        });

        officialBot.on('error', (err) => {
            console.log("--- خطأ في البوت الرسمي: " + err.message);
        });

        officialBot.on('end', () => {
            console.log("--- خرج الرسمي، إعادة المحاولة بعد دقيقة ---");
            setTimeout(launchSystem, 60000);
        });

    }, 20000); // ينتظر 20 ثانية ليدخل الرسمي مهما كانت نتيجة الأول
}

launchSystem();
