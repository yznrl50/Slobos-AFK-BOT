const mineflayer = require('mineflayer');
const http = require('http');

// فتح منفذ ويب عشان Render ما يطردنا
http.createServer((req, res) => {
  res.writeHead(200);
  res.end("Slobos Bot is Running on 1.21.1");
}).listen(process.env.PORT || 3000);

console.log("--- [1] تشغيل السيرفر الوهمي بنجاح ---");

const settings = {
    host: '185.107.193.116', // الأرقام بدون أقواس
    port: 43820,
    username: 'Slobos_AFK',
    version: '1.21.1' // بما أن عندك ViaVersion فهذه النسخة ستعمل 100%
};

function startBot() {
    console.log("--- [2] جاري محاولة الدخول بالآيبي العددي... ---");
    const bot = mineflayer.createBot(settings);

    bot.on('spawn', () => {
        console.log("--- [3] نجاح! البوت دخل السيرفر الآن ---");
        
        setTimeout(() => {
            // تسجيل الدخول
            bot.chat('/login Slobos123'); 
            console.log("--- [4] تم إرسال أمر تسجيل الدخول ---");
        }, 3000);

        setTimeout(() => {
            // تفعيل الطيران
            bot.chat('/fly'); 
            bot.creative.startFlying(); // أمر برمجي لجعل البوت يطير فعلياً
            console.log("--- [5] تم تفعيل وضع الطيران لمنع الـ AFK ---");
        }, 6000);
    });

    bot.on('error', (err) => {
        console.log("--- [!] حدث خطأ: " + err.message);
    });

    bot.on('end', () => {
        console.log("--- [!] انقطع الاتصال، سأحاول العودة بعد 20 ثانية ---");
        setTimeout(startBot, 20000);
    });
}

startBot();
