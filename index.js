const mineflayer = require('mineflayer');
const http = require('http');

// خادم ويب بسيط لإبقاء الخدمة تعمل على Render
http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.write("Slobos AFK Bot is Running!");
  res.end();
}).listen(process.env.PORT || 3000);

const botArgs = {
  host: 'mrx1ever.aternos.me',
  port: 43820,
  username: 'Slobos_AFK',
  version: '1.21', 
  hideErrors: false,
  checkTimeoutInterval: 60000 
};

function createBot() {
  console.log("--- [بوت] محاولة الاتصال بـ " + botArgs.host + " ---");
  
  const bot = mineflayer.createBot(botArgs);

  // مراقبة الاتصال الأولي
  bot.once('spawn', () => {
    console.log("--- [تنبيه] البوت رسبن الآن في العالم! ---");
    setTimeout(() => {
        bot.chat('/register Slobos123 Slobos123'); 
        bot.chat('/login Slobos123');
        console.log("--- [AuthMe] تم إرسال الأوامر بنجاح ---");
    }, 2000);
  });

  bot.on('login', () => {
    console.log("--- [نجاح] تم تسجيل الدخول للسيرفر! ---");
  });

  bot.on('error', (err) => {
    console.log("--- [خطأ] حدثت مشكلة: " + err.message);
  });

  bot.on('kicked', (reason) => {
    console.log("--- [طرد] السبب: " + reason);
  });

  bot.on('end', () => {
    console.log("--- [إعادة] انقطع الاتصال، سأحاول مجدداً بعد 30 ثانية ---");
    setTimeout(createBot, 30000);
  });
}

// بدء التشغيل
createBot();
