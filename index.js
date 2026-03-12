const mineflayer = require('mineflayer');
const http = require('http');

// للحفاظ على ريندر شغّال
http.createServer((req, res) => { res.end("Bot is Active on Lemur Host"); }).listen(process.env.PORT || 3000);

const settings = {
    host: 'lemur.aternos.host', // تأكدت من العنوان الجديد هنا
    port: 43820,
    username: 'Slobos_AFK',
    version: '1.21.1',
    connectTimeout: 30000
};

function startBot() {
    console.log("--- جاري محاولة الدخول إلى عنوان Lemur الجديد... ---");
    const bot = mineflayer.createBot(settings);

    // مؤقت أمان إذا علق الاتصال
    const failSafe = setTimeout(() => {
        console.log("--- الاتصال معلق، سأعيد المحاولة ---");
        bot.quit();
        startBot();
    }, 45000);

    bot.on('login', () => {
        clearTimeout(failSafe);
        console.log("--- [نجاح] البوت دخل السيرفر! ---");
    });

    bot.on('spawn', () => {
        console.log("--- البوت رسبن وجاهز ---");
        bot.setControlState('jump', true);
        setTimeout(() => bot.setControlState('jump', false), 1000);
        
        setTimeout(() => {
            bot.chat('/fly');
            console.log("--- تم تفعيل الطيران ---");
        }, 5000);
    });

    bot.on('error', (err) => {
        clearTimeout(failSafe);
        console.log("--- [خطأ]: " + err.message);
    });

    bot.on('end', () => {
        clearTimeout(failSafe);
        console.log("--- انقطع الاتصال، سأعود بعد 30 ثانية ---");
        setTimeout(startBot, 30000);
    });
}

startBot();
