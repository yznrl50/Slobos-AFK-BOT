const mineflayer = require('mineflayer');
const http = require('http');

// خادم الويب لإبقاء Render شغال
http.createServer((req, res) => {
  res.writeHead(200);
  res.end("Bot status: Connecting...");
}).listen(process.env.PORT || 3000);

console.log("--- [النظام] جاري محاولة اختراق جدار حماية أترنوس... ---");

const botArgs = {
  host: 'mrx1ever.aternos.me', 
  port: 43820,
  username: 'Slobos_AFK',
  version: '1.21.1',
  hideErrors: false,
  keepAlive: true,
  checkTimeoutInterval: 120000 // رفع المهلة لدقيقتين
};

function createBot() {
  console.log(`--- [بوت] محاولة اتصال جديدة بـ ${botArgs.host}:${botArgs.port} ---`);
  
  const bot = mineflayer.createBot(botArgs);

  // مراقبة الاتصال قبل الدخول
  bot._client.on('connect', () => {
    console.log("--- [نجاح مؤقت] تم فتح المنفذ! السيرفر رد علينا ---");
  });

  bot.on('login', () => {
    console.log("--- [نجاح] البوت دخل السيرفر فعلياً! ---");
  });

  bot.on('spawn', () => {
    console.log("--- [تنبيه] البوت رسبن الآن ---");
    setTimeout(() => {
      bot.chat('/register Slobos123 Slobos123');
      bot.chat('/login Slobos123');
      console.log("--- [AuthMe] تم إرسال الأوامر ---");
    }, 5000);
  });

  bot.on('error', (err) => {
    console.log("--- [خطأ] " + err.code + " : " + err.message);
    if (err.code === 'ECONNREFUSED') {
       console.log("--- [تنبيه] أترنوس رفض الاتصال تماماً (حظر آيبي) ---");
    }
  });

  bot.on('end', () => {
    console.log("--- [إعادة] محاولة بعد 30 ثانية ---");
    setTimeout(createBot, 30000);
  });
}

createBot();
