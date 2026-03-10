const mineflayer = require('mineflayer')
const http = require('http');

// 1. خادم ويب لإبقاء Render مستيقظاً
http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.write("Slobos AFK Bot is Running!");
  res.end();
}).listen(process.env.PORT || 3000);

// 2. إعدادات البوت بالبيانات الجديدة (Aternos)
const botArgs = {
  host: 'mrx1ever.aternos.me', // الآيبي الصحيح
  port: 43820,                // البورت الصحيح
  username: 'Slobos_AFK',     
  version: false,             // خله false عشان يتوافق مع ViaVersion تلقائياً
  hideErrors: false,
  viewDistance: "tiny",
  loadInternalPlugins: false
};

let bot;

function createBot() {
  bot = mineflayer.createBot(botArgs);

  bot.on('login', () => {
    console.log("تم الاتصال بنجاح بسيرفر mrx1ever!");
  });

  bot.on('spawn', () => {
console.log("البوت رسبن الآن داخل العالم!");
    
    // ننتظر ثانية واحدة ثم نرسل الأوامر
    setTimeout(() => {
       // استبدل PASSWORD بكلمة السر الحقيقية التي اخترتها للبوت
       bot.chat('/register mrx1ever mrx1ever'); 
       bot.chat('/login mrx1ever'); 
       console.log("تم إرسال أوامر تسجيل الدخول!");
    }, 1000);
  });

  bot.on('kicked', (reason) => {
    console.log("البوت طُرد من السيرفر! السبب: " + reason);
  });

  bot.on('messagestr', (message) => {
    console.log("رسالة من السيرفر: " + message);
  });

  bot.on('end', () => {
    console.log("انقطع الاتصال، جاري إعادة المحاولة بعد 15 ثانية...");
    setTimeout(createBot, 15000); // زدنا الوقت قليلاً لراحة سيرفر أترنوس
  });

  bot.on('error', (err) => {
    console.log("حدث خطأ تقني: " + err);
  });
}

createBot();
