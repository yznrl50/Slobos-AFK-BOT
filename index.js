const mineflayer = require('mineflayer');
const http = require('http');

// إبقاء ريندر متصلاً
http.createServer((req, res) => { res.end("Bot is Online"); }).listen(process.env.PORT || 3000);

const settings = {
    host: '185.107.193.116', // الرقم اللي استخرجته
    port: 43820,
    username: 'Slobos_AFK',
    version: '1.21.1' 
};

function startBot() {
    console.log("--- جاري محاولة الدخول بالآيبي المباشر... ---");
    const bot = mineflayer.createBot(settings);

    bot.on('login', () => {
        console.log("--- [نجاح باهر] البوت داخل السيرفر الآن! ---");
    });

    bot.on('spawn', () => {
        console.log("--- البوت رسبن في العالم ---");
        setTimeout(() => {
            bot.chat('/login Slobos123'); // تأكد من كلمة سر البوت في السيرفر
            bot.chat('/fly');
        }, 5000);
    });

    bot.on('error', (err) => {
        console.log("--- [خطأ] " + err.message);
    });

    bot.on('end', () => {
        console.log("--- انقطع الاتصال، سأحاول العودة بعد 30 ثانية ---");
        setTimeout(startBot, 30000);
    });
}

startBot();
