const mineflayer = require('mineflayer');
const http = require('http');

http.createServer((req, res) => { res.end("Bot is Active"); }).listen(process.env.PORT || 3000);

const settings = {
    host: '185.107.193.116',
    port: 43820,
    username: 'Slobos_AFK',
    version: '1.21.1'
};

function startBot() {
    console.log("--- محاولة الدخول... ---");
    const bot = mineflayer.createBot(settings);

    // أول ما يدخل السيرفر (قبل الرسبون)
    bot.on('login', () => {
        console.log("--- البوت دخل، جاري محاولة تسجيل الدخول... ---");
        // نرسل الأمر بسرعة عشان AuthMe ما يطرده
        setTimeout(() => {
            bot.chat('/login Slobos123'); // تأكد أن الباسورد صحيحة
            console.log("--- تم إرسال أمر /login ---");
        }, 2000); 
    });

    bot.on('spawn', () => {
        console.log("--- البوت رسبن وجاهز ---");
        // نرسل الأمر مرة ثانية للاحتياط بعد الرسبون
        setTimeout(() => {
            bot.chat('/login Slobos123');
            bot.chat('/fly');
        }, 3000);
    });

    bot.on('error', (err) => console.log("خطأ: " + err.message));

    // أهم جزء: لو انطرد يرجع بعد 10 ثواني
    bot.on('end', () => {
        console.log("--- انقطع الاتصال (ممكن طرد من AuthMe)، بحاول أرجع بعد 10 ثواني ---");
        setTimeout(startBot, 10000);
    });
}

startBot();
