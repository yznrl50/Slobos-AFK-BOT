const mineflayer = require('mineflayer');
const dns = require('dns');
const http = require('http');

// تشغيل الويب عشان ريندر ما يقفل
http.createServer((req, res) => { res.end("Bot Scanning..."); }).listen(process.env.PORT || 3000);

const hostName = 'basenji.aternos.host';

console.log("--- [1] جاري استخراج الرقم السري للسيرفر... ---");

dns.lookup(hostName, (err, address) => {
    if (err) {
        console.log("--- [!] فشلنا في استخراج الرقم، تأكد أن السيرفر شغال (Online) ---");
        return;
    }
    
    console.log("--- [2] الرقم السري هو: " + address + " ---");
    
    const bot = mineflayer.createBot({
        host: address, // هنا الكود بيستخدم الرقم اللي لقاه تلقائياً
        port: 43820,
        username: 'Slobos_AFK',
        version: '1.21.1'
    });

    bot.on('login', () => console.log("--- [3] نجاح! البوت دخل بالرقم: " + address));
    
    bot.on('error', (err) => {
        console.log("--- [!] خطأ في الاتصال: " + err.message);
        console.log("نصيحة: تأكد أن Cracked مفعل في أترنوس");
    });
});
