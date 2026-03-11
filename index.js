const botArgs = {
  host: 'basenji.aternos.host',
  port: 43820,
  username: 'Slobos_AFK',
  // حدد نسخة السيرفر بدقة (مثلاً 1.21 أو 1.20.1) 
  // إذا كنت تستخدم ViaVersion، جرب '1.20.1' أو '1.21'
  version: '1.21', 
  hideErrors: false,
  checkTimeoutInterval: 60000 // مهلة دقيقة كاملة للاتصال
};

function createBot() {
  console.log("--- [بوت] محاولة الاتصال بـ " + botArgs.host + " ---");
  const bot = mineflayer.createBot(botArgs);

  // سطر إضافي لمراقبة حالة الاتصال بالشبكة
  bot._client.on('connect', () => {
    console.log("--- [شبكة] تم فتح اتصال أولي مع السيرفر! ---");
  });

  bot.on('login', () => {
    console.log("--- [نجاح] تم تسجيل الدخول للسيرفر! ---");
  });

  bot.on('spawn', () => {
    console.log("--- [تنبيه] البوت رسبن الآن في العالم! ---");
    setTimeout(() => {
        bot.chat('/register Slobos123 Slobos123'); 
        bot.chat('/login Slobos123');
        console.log("--- [AuthMe] تم إرسال الأوامر بنجاح ---");
    }, 2000);
  });

  bot.on('error', (err) => {
    console.log("--- [خطأ] حدث مشكلة: " + err.message);
    if(err.message.includes('ethrottle')) {
       console.log("--- [تنبيه] تم حظر الآيبي مؤقتاً بسبب كثرة المحاولات (Throttle) ---");
    }
  });

  bot.on('kicked', (reason) => {
    console.log("--- [طرد] السبب: " + reason);
  });

  bot.on('end', () => {
    console.log("--- [إعادة] سأحاول مجدداً بعد 30 ثانية ---");
    setTimeout(createBot, 30000);
  });
}

createBot();
