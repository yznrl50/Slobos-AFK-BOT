const mineflayer = require('mineflayer');
const http = require('http');

http.createServer((req, res) => { res.end("Bot System Online"); }).listen(process.env.PORT || 3000);

// إذا كان السيرفر شغال، استخدم هذا الرقم. إذا طفى واشتغل، تأكد من الرقم الجديد.
const settings = {
    host: '185.107.194.193', 
    port: 43820,
    username: 'Slobos_AFK_' + Math.floor(Math.random() * 100), // يغير الاسم بسيط عشان يتخطى التعليق
    version: '1.21.1'
};

function startBot() {
    console.log("--- محاولة دخول انتحارية بالاسم: " + settings.username + " ---");
    const bot = mineflayer.createBot(settings);

    bot.once('spawn', () => {
        console.log("--- [أخيراً] البوت في الداخل! ---");
        setTimeout(() => {
            bot.chat('/fly');
            console.log("--- تم تفعيل الطيران ---");
        }, 5000);
    });

    bot.on('error', (err) => {
        console.log("--- خطأ: " + err.message);
    });

    bot.on('end', () => {
        console.log("--- انقطع، بحاول بعد 30 ثانية ---");
        setTimeout(startBot, 30000);
    });
}

startBot();
