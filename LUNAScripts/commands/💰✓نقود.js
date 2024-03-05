module.exports.config = {
name: "نقود",
  version: "1.0.0",
  hasPermssion: 2,
  credits: "ZINO く愛",
  description: "مكسل اكتب شرح",
  usePrefix: true,
  commandCategory: "مكسل اشرحها ايضن",
  usages: "رسالة",
  cooldowns: 5,
   envConfig: {
        cooldownTime: 100
   }
}; 
 module.exports.languages = { 

    "en": {
        "cooldown": "تقدر تاخذ مجددا بعد: %1 دقيقة (🤭) %2 ثوان(🤭)."
    }
}
module.exports.handleReply = async ({ event, api, handleReply, Currencies, getText }) => {
    const { threadID, messageID, senderID } = event;
    let data = (await Currencies.getData(senderID)).data || {};
//random coins nhận được khi làm việc ít nhất 200
var coinscn = Math.floor(Math.random() * 99999999) + 10000; //random coins khi làm ở khu công nghiệp
var coinsdv = Math.floor(Math.random() * 11000000) + 20000; //random coins khi làm ở khu dịch vụ
var coinsmd = Math.floor(Math.random() * 1100000) + 2000; //random coins khi làm ở mỏ dầu
var coinsq = Math.floor(Math.random() * 100000) + 20000; //random coins khi khai thác quặng
var coinsdd = Math.floor(Math.random() * 10000000) + 20000; //random coins khi đào đá
var coinsdd1 = Math.floor(Math.random() * 1000000) + 2000; //random coins khi đào đá

//random things to do
var rdcn = ['hiring staff', 'hotel administrator', 'at the power plant', 'restaurant chef', 'worker']; //random job when working in industrial park
var work1 = rdcn[Math.floor(Math.random() * rdcn.length)];   

var rddv = ['plumber', 'neighbors air conditioner repair', 'multi-level sale', 'flyer distribution', 'shipper', 'computer repair', 'tour guide', 'breastfeeding' ]; //random work when working in the service area
var work2 = rddv[Math.floor(Math.random() * rddv.length)]; 

var rdmd = ['earn 13 barrels of oil', 'earn 8 barrels of oil', 'earn 9 barrels of oil', 'earn 8 barrels of oil', 'steal the oil', 'take water and pour it into oil and sell it']; //random job while working at an oil field
var work3 = rdmd[Math.floor(Math.random() * rdmd.length)]; 

var rdq = ['iron ore', 'gold ore', 'coal ore', 'lead ore', 'copper ore', 'oil ore']; //random job when mining ore
var work4 = rdq[Math.floor(Math.random() * rdq.length)]; 

var rddd = ['diamond', 'gold', 'coal', 'emerald', 'iron', 'ordinary stone', 'lazy', 'bluestone']; //random job when digging rock
var work5 = rddd[Math.floor(Math.random() * rddd.length)]; 

var rddd1 = ['vip guest', 'patent', 'stranger', '23-year-old fool', 'stranger', 'patron', '92-year-old tycoon', '12-year-old boyi']; //random work when digging rock
var work6 = rddd1[Math.floor(Math.random() * rddd1.length)];


var msg = "";
    switch(handleReply.type) {
        case "choosee": {
            
            switch(event.body) {
                case "1": msg = `〘━━━❪𝗕𝗢𝗧 𝗟𝗨𝗡𝗔❫━━━━〙
♡_ لانك اجمل انسان وقلبك ابيض ساهديك ${coinscn}$` ; Currencies.increaseMoney(event.senderID, coinscn); break;             
                case "2": msg = `〘━━━❪𝗕𝗢𝗧 𝗟𝗨𝗡𝗔❫━━━━〙
♡_ لانك اجمل انسان وقلبك ابيض ساهديك ${coinscn}$`; Currencies.increaseMoney(event.senderID, coinsdv); break;
                case "3": msg = `〘━━━❪𝗕𝗢𝗧 𝗟𝗨𝗡𝗔❫━━━━〙
♡_ لانك اجمل انسان وقلبك ابيض ساهديك ${coinscn}$`; Currencies.increaseMoney(event.senderID, coinsmd); break;
                case "4": msg = `〘━━━❪𝗕𝗢𝗧 𝗟𝗨𝗡𝗔❫━━━━〙
♡_ لانك اجمل انسان وقلبك ابيض ساهديك ${coinscn}$`; Currencies.increaseMoney(event.senderID, coinsq); break;
                case "5": msg = `〘━━━❪𝗕𝗢𝗧 𝗟𝗨𝗡𝗔❫━━━━〙
♡_ لانك اجمل انسان وقلبك ابيض ساهديك ${coinscn}$` ; Currencies.increaseMoney(event.senderID, coinsdd); break;
                case "6": msg = `〘━━━❪𝗕𝗢𝗧 𝗟𝗨𝗡𝗔❫━━━━〙
♡_ لانك اجمل انسان وقلبك ابيض ساهديك ${coinscn}$`; Currencies.increaseMoney(event.senderID, coinsdd1); break;
                case "7": msg = "🇦🇱🇩🇿🇵🇸🐧هكر ولله"; break; //add case if you want 
                default: break;
            };
            const choose = parseInt(event.body);
            if (isNaN(event.body)) return api.sendMessage("〘━━━❪𝗕𝗢𝗧 𝗟𝗨𝗡𝗔❫━━━━〙\nاختيارك خطا يرجا رد برقم", event.threadID, event.messageID);
            if (choose > 7 || choose < 1) return api.sendMessage("⚡️Option i", event.threadID, event.messageID); //thay số case vào số 7
            api.unsendMessage(handleReply.messageID);
            if (msg == "⚡️Chưa update...") {
                msg = "⚡️Update soon...";
            };
            return api.sendMessage(`${msg}`, threadID, async () => {
            data.work2Time = Date.now();
            await Currencies.setData(senderID, { data });
            
        });

    };
}
}
module.exports.run = async ({  event, api, handleReply, Currencies, getText }) => {
    const { threadID, messageID, senderID } = event;
    const cooldown = global.configModule[this.config.name].cooldownTime;
    let data = (await Currencies.getData(senderID)).data || {};
    //cooldownTime for each receipt 
    if (typeof data !== "undefined" && cooldown - (Date.now() - data.work2Time) > 0) {

        var time = cooldown - (Date.now() - data.work2Time),
            minutes = Math.floor(time / 60000),
            seconds = ((time % 60000) / 1000).toFixed(0); 
        return api.sendMessage(getText("cooldown", minutes, (seconds < 10 ? "0" + seconds : seconds)), event.threadID, event.messageID);
    }
    else {    
    return api.sendMessage("〘━━━❪𝗕𝗢𝗧 𝗟𝗨𝗡𝗔❫━━━━〙\n♡_ قائمة شركة لونا للاموال\n\n❶ . 50000000$\n❷ . 40000000$.\n❸ . 30000000$\n❹ . 20000000$\n❺ . 10000000$\n❻ . 1000000$\n\nيرجا اختيار اموال لسحب من لبنك" //add case display here ||  \n[number]. [Career]" +
            , event.threadID, (error, info) => {
                data.work2Time = Date.now();
        global.client.handleReply.push({
            type: "choosee",
            name: this.config.name,
            author: event.senderID,
            messageID: info.messageID
          })  
        })
    }
}
/*
@credit P-SeverTeam
@Vui lòng không đổi credit!
*/