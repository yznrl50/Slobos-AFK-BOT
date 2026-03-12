const mineflayer = require('mineflayer');
const http = require('http');

// للحفاظ على استمرارية الخدمة في ريندر
http.createServer((req, res) => { res.end("Slobos AFK: System Online"); }).listen(process.env.PORT || 3000);

const settings = {
    host: '185.107.193.201', // الرقم الجديد اللي استخرجته
    port: 43820,
    username: 'Slobos_AFK',
    version: '1.21.1'
};

function startBot() {
    console.log("--- جاري محاولة الدخول بالآيبي الجديد (.201)... ---");
    const bot = mineflayer.createBot(settings);

    bot.on('login', () => {
        console.log("--- [نجاح باهر] البوت داخل السيرفر الآن! ---");
    });

    bot.on('spawn', () => {
        console.log("--- البوت رسبن وجاهز للعمل ---");
        // حركة بسيطة للتأكيد
        bot.setControlState('jump', true);
        setTimeout(() => bot.setControlState('jump', false), 1000);

        setTimeout(() => {
            bot.chat('/fly');
            console.log("--- تم إرسال أمر الطيران ---");
        }, 5000);
    });

    bot.on('error', (err) => {
        console.log("--- [خطأ]: " + err.message);
    });

    bot.on('end', () => {
        console.log("--- انقطع الاتصال، سأحاول العودة بعد 30 ثانية ---");
        setTimeout(startBot, 30000);
    });
}

startBot();
