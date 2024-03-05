const axios = require("axios");
const fs = require("fs");

const translateText = async (text) => {
  try {
    const translationResponse = await axios.get(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=en&dt=t&q=${encodeURIComponent(text)}`);
    return translationResponse.data[0][0][0];
  } catch (error) {
    console.error('Error translating text:', error);
    throw error;
  }
};

module.exports.config = {
  name: "تخيلي",
  version: "2.7",
  hasPermssion: 0,
  credits: "Hazeyy",
  description: "بكسارت يتخيل",
  commandCategory: "ذكاء اصطناعي",
  usages: "ا",
  cooldowns: 3,
};

module.exports.handleEvent = async function ({ api, event }) {
  if (!(event.body.indexOf("تخيلي") === 0 || event.body.indexOf("تخيلي") === 0)) return;
  const args = event.body.split(/\s+/);
  args.shift();

  const prompt = args.join(" ");  

  api.setMessageReaction("📸", event.messageID, (err) => {}, true);

  if (!prompt) {
    api.sendMessage("✨ مرحبا انا لونا.\n\nاستخدم: لونا [ كلامك ]", event.threadID);
    return;
  }

  api.sendMessage("🕟 | لونا تتخيل, انتضر قليلاً...", event.threadID);

  try {
    const translatedText = await translateText(prompt);

    const response = await axios.get('https://code-merge-api-hazeyy01.replit.app/kandinsky/api', {
      params: {
        prompt: translatedText,  
      },
    });

    console.log('🤖 تفضل يحلو:', response.data);

    if (response.data.output) {
      const imageData = response.data.output;

      if (imageData && Array.isArray(imageData)) {
        const item = imageData[0];
        const image = await axios.get(item, { responseType: "arraybuffer" });
        const path = __dirname + "/cache/" + Math.floor(Math.random() * 999999) + ".jpg";

        const promptMessage = `🤖 لونا ( تخيل )\n\n🖋️ كلامك: '${prompt}'\n\n✨ تفضل يحلو:`;

        fs.writeFileSync(path, image.data);

        api.sendMessage({ body: promptMessage, attachment: fs.createReadStream(path) }, event.threadID, () => {
          fs.unlinkSync(path);
        });
      }
    } else {
      api.sendMessage('🚫 𝙰𝚗 𝚎𝚛𝚛𝚘𝚛 𝚘𝚌𝚌𝚞𝚛𝚎𝚍 𝚍𝚞𝚛𝚒𝚗𝚐 𝚝𝚑𝚎 𝙿𝚒𝚡𝙰𝚛𝚝 𝚙𝚛𝚘𝚌𝚎𝚜𝚜.', event.threadID);
    }
  } catch (error) {
    console.error('🚫 𝙴𝚛𝚛𝚘𝚛:', error);
    api.sendMessage('🚫 𝙰𝚗 𝚎𝚛𝚛𝚘𝚛 𝚘𝚌𝚌𝚞𝚛𝚎𝚍 𝚠𝚑𝚒𝚕𝚎 𝚐𝚎𝚗𝚎𝚛𝚊𝚝𝚒𝚗𝚐 𝚝𝚑𝚎 𝚒𝚖𝚊𝚐𝚎.', event.threadID);
  }
};

module.exports.run = async function({ api, event }) {};