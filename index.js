const mineflayer = require('mineflayer');
const http = require('http');

// 1. فتح منفذ ويب فوراً عشان Render ما يقفل البوت
http.createServer((req, res) => {
  res.writeHead(200);
  res.end("Bot Status: Searching for Server...");
}).listen(process.env.PORT || 3000);

console.log("--- [1] صفحة الويب جاهزة، Render المفروض الحين يرتاح ---");

const settings = {
    host: '185.107.193.116',
    port: 43820,
    username: 'Slobos_AFK',
    version: '1.21.1'
};

function startBot() {
    console.log("--- [2] محاولة الاتصال بـ أترنوس... ---");
    
    const bot = mineflayer.createBot(settings);

    bot.on('login', () => {
        console.log("--- [3] نجاح! البوت دخل السيرفر ---");
    });

    bot.on('spawn', () => {
        console.log("--- [4] البوت رسبن وجاهز ---");
        // تأكد من كلمة السر، إذا كانت خطأ البوت بيطرد
        setTimeout(() => {
            bot.chat('/login Slobos123');
        }, 5000);
    });

    bot.on('error', (err) => {
        console.log("--- [!] خطأ: " + err.message);
    });

    bot.on('end', () => {
        console.log("--- [!] انقطع الاتصال، بحاول أرجع بعد 30 ثانية ---");
        setTimeout(startBot, 30000);
    });
}

// ابدأ المحاولة
startBot();
