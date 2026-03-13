const dns = require('dns');
const http = require('http');

http.createServer((req, res) => { res.end("Scanning..."); }).listen(process.env.PORT || 3000);

// العنوان اللي انت كتبته لي
const hostName = 'mastiff.aternos.host'; 

console.log("--- جاري فحص العنوان الجديد: " + hostName + " ---");

dns.lookup(hostName, (err, address) => {
    if (err) {
        console.log("--- فشل الفحص: تأكد من كتابة العنوان صح ---");
    } else {
        console.log("--- الرقم السري الجديد هو: " + address + " ---");
        console.log("--- استخدم هذا الرقم في خانة الـ host وجرب ---");
    }
});
