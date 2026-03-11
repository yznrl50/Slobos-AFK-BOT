const mineflayer = require('mineflayer');
const http = require('http');

// تشغيل سيرفر الويب أولاً لإرضاء ريندر
http.createServer((req, res) => {
  res.writeHead(200);
  res.end("Bot is online");
}).listen(process.env.PORT || 3000);

console.log("--- [1] بدأت المحاولة الآن ---");

const bot = mineflayer.createBot({
  host: 'basenji.aternos.host', // استخدم الـ Dyn IP لأنه أقوى في تجاوز الحظر
  port: 43820,
  username: 'Slobos_AFK',
  version: '1.21.1', // جربنا 1.21، الحين نجرب 1.21.1 بدقة
  hideErrors: false,
  connectTimeout: 60000
});

// هذا السطر سيطبع لك أي رد فعل من السيرفر فوراً
bot.on('connect', () => console.log("--- [2] تم فتح الاتصال الأولي! ---"));
bot.on('login', () => console.log("--- [3] البوت دخل السيرفر! ---"));
bot.on('spawn', () => {
    console.log("--- [4] البوت رسبن وجاهز ---");
    bot.chat('/login Slobos123');
});

// إذا فيه حظر آيبي، هذا السطر بيكشفه فوراً باللون الأحمر
bot.on('error', (err) => {
    console.log("--- [!] خطأ في الاتصال: " + err.message + " ---");
});

bot.on('end', () => {
    console.log("--- [!] انتهى الاتصال، جاري الإعادة بعد قليل ---");
    // لا تضع إعادة تشغيل هنا حالياً لنرى الخطأ بوضوح
});
