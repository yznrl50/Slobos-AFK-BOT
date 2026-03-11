const mineflayer = require('mineflayer');
const http = require('http');

// خادم الويب
http.createServer((req, res) => {
  res.writeHead(200);
  res.end("Bot is trying...");
}).listen(process.env.PORT || 3000);

console.log("--- [1] بدأت المحاولة الآن ---");

const bot = mineflayer.createBot({
  host: 'basenji.aternos.host', 
  port: 43820,
  username: 'Slobos_AFK',
  version: '1.20.1', // جرب هذه النسخة حتى لو سيرفرك 1.21، فهي الأسرع في الربط
  hideErrors: false,
  connectTimeout: 90000 // رفعنا المهلة لـ 90 ثانية
});

// هذا السطر سيكشف لنا لو أترنوس رد علينا بأي شيء
bot._client.on('connect', () => {
    console.log("--- [2] تم فتح الاتصال الأولي (السيرفر رد)! ---");
});

bot.on('login', () => {
    console.log("--- [3] البوت دخل السيرفر! ---");
});

bot.on('spawn', () => {
    console.log("--- [4] البوت رسبن وجاهز ---");
    bot.chat('/login Slobos123');
});

bot.on('error', (err) => {
    console.log("--- [!] خطأ تقني: " + err.message + " ---");
});

bot.on('end', () => {
    console.log("--- [!] انتهى الاتصال، جاري الإعادة بعد 30 ثانية ---");
    setTimeout(() => { location.reload(); }, 30000);
});
