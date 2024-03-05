module.exports.config = {
    name: "cnamebot",
    version: "1.0.4",
    hasPermssion: 0,
    creditss: "DRIDI-RAYEN",
    description: "Automatically prevent change bot nickname",
    commandCategory: "〘 النظام 〙",
    usages: "",
    cooldowns: 5
};


module.exports.handleEvent = async function ({ api, args, event, client, __GLOBAL, Threads, Currencies }) {
    const { threadID } = event;
    let { nicknames } = await api.getThreadInfo(event.threadID)
    const nameBot = nicknames[api.getCurrentUserID()]
    if (nameBot !== `[ ${config.PREFIX} ] • ${config.BOTNAME}`) {
        api.changeNickname(`[ ${global.config.PREFIX} ] • ${(!global.config.BOTNAME) ? "Made by CatalizCS and SpermLord" : global.config.BOTNAME}`, threadID, api.getCurrentUserID());
        setTimeout(() => {
            return api.sendMessage(`| ⚠️ | ممنوع لعبث بكنية لبوت و شكرا لكم على استخدام 
く愛[ . ]↬ 𝗕𝗢𝗧 𝗟𝗨𝗡𝗔↫⚠️☠️🇩🇿
⌔┇↜{ المـــطــور } ← m.me/100044725279836
⌔┇↜{ المـــطــور } ← m.me/100013384479798
⌔┇↜{ تلقرام} ← https://t.me/mohamd_and_zino`, threadID);
        }, 1500);
    }
}

module.exports.run = async({ api, event, Threads}) => {
    let data = (await Threads.getData(event.threadID)).data || {};
    if (typeof data["cnamebot"] == "undefined" || data["cnamebot"] == false) data["cnamebot"] = true;
    else data["cnamebot"] = false;

    await Threads.setData(event.threadID, { data });
    global.data.threadData.set(parseInt(event.threadID), data);

    return api.sendMessage(`✅ ${(data["cnamebot"] == true) ? "Turn on" : "Turn off"} successfully cnamebot!`, event.threadID);

}