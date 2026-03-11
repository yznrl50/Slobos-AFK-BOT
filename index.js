const mineflayer = require('mineflayer');
const net = require('net');

const settings = {
    host: 'basenji.aternos.host',
    port: 43820,
    username: 'Slobos_AFK',
    version: '1.12.2' // نسخة خفيفة لتخطي الحماية
};

console.log("--- [1] جاري فحص هل السيرفر مفتوح أصلاً؟ ---");

// فحص الاتصال بالمنفذ أولاً
const client = net.connect(settings.port, settings.host, () => {
    console.log("--- [2] تم العثور على السيرفر! جاري إرسال البوت... ---");
    client.destroy();
    startBot();
});

client.on('error', (err) => {
    console.log("--- [!] السيرفر لا يرد (غالباً محظور من ريندر): " + err.message);
});

function startBot() {
    const bot = mineflayer.createBot(settings);

    bot.on('login', () => {
        console.log("--- [3] نجاح! البوت دخل السيرفر ---");
    });

    bot.on('spawn', () => {
        console.log("--- [4] البوت رسبن وجاهز ---");
        bot.chat('/login Slobos123');
    });

    bot.on('error', (err) => console.log("خطأ البوت: " + err.message));
    bot.on('end', () => setTimeout(startBot, 10000));
}
