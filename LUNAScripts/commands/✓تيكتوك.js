module.exports.config = {
  name: "تيكتوك",
  version: "1.0.0",
  hasPermssion: "0",
  credits: "Jonell Magallanes", //original code Kim Joseph DG Bien
  description: "tiktok search",
   usePrefix: true,
  commandCategory: "tiktok",
  usage: "[Tiktok <search>]",
  cooldowns: 5,
};

const axios = require("axios");
const fs = require("fs");
const path = require("path");

module.exports.run = async function({ api, event, args }) {
  try {
    const searchQuery = args.join(" ");
    if (!searchQuery) {
      api.sendMessage("| لونا | تيكتوك [ نص البحث]", event.threadID);
      return;
    }
    
    api.sendMessage("| ⏱ | جارٍ البحث، يرجى الانتظار....", event.threadID);
    
    const response = await axios.get(`https://cc-project-apis-jonell-magallanes.onrender.com/api/tiktok/searchvideo?keywords=${encodeURIComponent(searchQuery)}`);
    const videos = response.data.data.videos;
    
    if (!videos || videos.length === 0) {
      api.sendMessage("No videos found for the given search query.", event.threadID);
      return;
    }

    const videoData = videos[0];
    const videoUrl = videoData.play;
    
    const message = `〘━━━━━❪ نتيجة ❫━━━━〙\n⦿¦✗¦←BOT : ${videoData.author.nickname}\n⌔┇↜{ حساب الناشر} ← ${videoData.author.unique_id}\n| فيديو | ${videoData.title}\n〘━━━❪𝗕𝗢𝗧 𝗟𝗨𝗡𝗔❫━━━━`;
    
    const filePath = path.join(__dirname, `/cache/tiktok_video.mp4`);
    const writer = fs.createWriteStream(filePath);

    const videoResponse = await axios({
      method: 'get',
      url: videoUrl,
      responseType: 'stream'
    });

    videoResponse.data.pipe(writer);

    writer.on('finish', () => {
      api.sendMessage(
        { body: message, attachment: fs.createReadStream(filePath) },
        event.threadID,
        () => fs.unlinkSync(filePath)
      );
    });
  } catch (error) {
    console.error('Error:', error);
    api.sendMessage("| ⚠ | خطا تواصل معا لمطور محمد او زينو او اعد تجربة", event.threadID);
  }
};