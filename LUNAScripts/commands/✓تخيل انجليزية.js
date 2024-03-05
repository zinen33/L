module.exports = {
  config: {
    name: "emi",
    version: "1.0.1",
    hasPermssion: 0,
    credits: "ZINO and Mohamed",
    description: "",
    usePrefix: true,
    commandCategory: "〘 المجموعات 〙",
    usages: "رد على رسالة البوت اكتب حذف",
    cooldowns: 5,
  },
  run: async function({api, event, args}){
    let url = "https://ai-tools.replit.app";
    const { get } = require('axios'), fs = require('fs');
    let f = __dirname+'/cache/emi.png';
    
    function r(msg){
      api.sendMessage(msg, event.threadID, event.messageID);
    }
    
    if (!args[0]) return r('النص المطلوب مفقود!');
    
    const a = args.join(" ")
    if (!a) return r('النص المطلوب مفقود!');
    try {
      const d = (await get(url+'/emi?prompt='+a, {
        responseType: 'arraybuffer'
      })).data;
      fs.writeFileSync(f, Buffer.from(d, "utf8"));
      return r({attachment: fs.createReadStream(f, () => fs.unlinkSync(f))});
    } catch (e){
      return r(e.message)
    }
  }
}
