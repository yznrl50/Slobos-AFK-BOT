const mineflayer = require('mineflayer');
const http = require('http');

// فتح منفذ ويب لإبقاء ريندر شغالاً
http.createServer((req, res) => {
  res.writeHead(200);
  res.end("Slobos AFK Bot: Running smoothly without AuthMe");
}).listen(process.env.PORT || 3000);

const settings = {
    host: '185.107.193.116', // الآيبي المباشر الذي استخرجناه
    port: 43820,
    username: 'Slobos_AFK',
    version: '1.21.1'
};

function startBot() {
    console.log("--- جاري محاولة الدخول بالآيبي المباشر... ---");
    const bot = mineflayer.createBot(settings);

    bot.on('spawn', () => {
        console.log("--- [نجاح باهر] البوت داخل السيرفر الآن! ---");
        // بما أن AuthMe لم يعد عائقاً، نكتفي بتفعيل الطيران بعد 3 ثوانٍ
        setTimeout(() => {
            bot.chat('/fly');
            bot.creative.startFlying();
            console.log("--- البوت الآن في وضع الطيران ---");
        }, 3000);
    });

    bot.on('error', (err) => {
        console.log("--- [خطأ] " + err.message);
    });

    bot.on('end', () => {
console.log("انقطع الاتصال، سأنتظر 40 ثانية لتجنب رسالة 'Username already playing'");
        setTimeout(startBot, 40000); // زدنا الوقت هنا
    });
}

startBot();
