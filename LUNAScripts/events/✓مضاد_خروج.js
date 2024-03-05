module.exports.config = {
 name: "مضاد_خروج",
 eventType: ["log:unsubscribe"],
 version: "0.0.1",
 credits: "🇩🇿MOHAMED🇦🇱AND🇦🇱ZINO🇵🇸",
 description: "لبوت راح يردك للمجموعة"
};

module.exports.run = async({ event, api, Threads, Users }) => {
 let data = (await Threads.getData(event.threadID)).data || {};
 if (data.antiout == false) return;
 if (event.logMessageData.leftParticipantFbId == api.getCurrentUserID()) return;
 const name = global.data.userName.get(event.logMessageData.leftParticipantFbId) || await Users.getNameUser(event.logMessageData.leftParticipantFbId);
 const type = (event.author == event.logMessageData.leftParticipantFbId) ? "self-separation" : "طرده الأدمن 🐺✅";
 if (type == "self-separation") {
  api.addUserToGroup(event.logMessageData.leftParticipantFbId, event.threadID, (error, info) => {
   if (error) {
    api.sendMessage(`  ${name}. مش هيرجع لنو فاشل ولله `, event.threadID)
   } else api.sendMessage(`🥺يا حبيبي ${name} انا بحبك ليش بتغادر شوفني شتقتلك و رديتك \n〘━━━❪𝗕𝗢𝗧 𝗟𝗨𝗡𝗔❫━━━━〙`,event.threadID);//رسالة عندما ترجع لقروب ${name}
  })
 }
}
