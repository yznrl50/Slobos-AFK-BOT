const mineflayer = require('mineflayer')
const http = require('http');

// خادم الويب لإبقاء Render مستيقظاً
http.createServer((req, res) => {
  res.writeHead(200);
  res.end("Slobos Bot is Online!");
}).listen(process.env.PORT || 3000);

console.log("--- [النظام] جاري بدء التشغيل باستخدام Dyn IP ---");

const botArgs = {
  host: 'basenji.aternos.host', // العنوان الجديد هنا
  port: 43820,                  // البورت
  username: 'Slobos_AFK',
  version: false,
  hideErrors: false
};

function createBot() {
  console.log("--- [بوت] محاولة الاتصال بـ " + botArgs.host + " ---");
  const bot = mineflayer.createBot(botArgs);

  bot.on('login', () => {
    console.log("--- [نجاح] تم الاتصال بالسيرفر! ---");
  });

  bot.on('spawn', () => {
    console.log("--- [تنبيه] البوت رسبن الآن ---");
    setTimeout(() => {
        bot.chat('/register Slobos123 Slobos123'); // تأكد من تغيير كلمة السر
        bot.chat('/login Slobos123');
        console.log("--- [AuthMe] تم إرسال الأوامر ---");
    }, 2000);
  });

  bot.on('error', (err) => {
    console.log("--- [خطأ] " + err.message);
  });

  bot.on('kicked', (reason) => {
    console.log("--- [طرد] السبب: " + reason);
  });

  bot.on('end', () => {
    console.log("--- [إعادة] محاولة اتصال جديدة بعد 20 ثانية ---");
    setTimeout(createBot, 20000);
  });
}

createBot();
