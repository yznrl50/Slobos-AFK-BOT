const mineflayer = require('mineflayer')
const http = require('http');

// 1. خادم ويب صغير لإقناع Render أن البوت هو موقع ويب نشط
http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.write("Slobos AFK Bot is Running!");
  res.end();
}).listen(process.env.PORT || 3000);

// 2. إعدادات البوت
const botArgs = {
  host: 'Slobos.mcraft.pro', // آيبي السيرفر
  port: 25565,               // بورت السيرفر
  username: 'Slobos_AFK',    // اسم البوت
  version: "1.19.4",         // نسخة الماينكرافت
  viewDistance: "tiny",      // تقليل الرؤية لتوفير الرام (مهم جداً)
  loadInternalPlugins: false
};

let bot;

function createBot() {
  bot = mineflayer.createBot(botArgs);

  bot.on('login', () => {
    console.log("البوت دخل السيرفر بنجاح!");
  });

  bot.on('end', () => {
    console.log("انقطع الاتصال، جاري إعادة المحاولة بعد 10 ثواني...");
    setTimeout(createBot, 10000);
  });

  bot.on('error', (err) => {
    console.log("حدث خطأ: " + err);
  });
}

createBot();
