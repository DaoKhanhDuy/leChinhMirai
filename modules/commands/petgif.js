module.exports.config = {
	name: "petgif",
	version: "1.0.0",
	hasPermssion: 0, 
	credits: "chinhle-lawerteam",
	description: "Tạo gif",
	commandCategory: "Tạo gif",
	usages: "x",
	cooldowns: 5
};

module.exports. run = ({event, api, global, Config, logger, Threads, Users, args, body, is}) => {
   try{
  const axios = require("axios");
  const fs = require("fs-extra");
  const request = require("request");
  var id = Object.keys(event.mentions)[0] || event.senderID;
  const image = event.messageReply.attachments[0].url;
  const params = { image };
        const pathsave = __dirname + `/cache/petpetgif.gif`;
        let imageBuffer;
        axios.get("https://lawerpr0ject.herokuapp.com/other/petpetgif?", {
            params,
            responseType: "arraybuffer"
        })
        .then(data => {
            const imageBuffer = data.data;
            fs.writeFileSync(pathsave, Buffer.from(imageBuffer));
            api.sendMessage({
                attachment: fs.createReadStream(pathsave)
            }, event.threadID, () => fs.unlinkSync(pathsave), event.messageID);
        })
        }catch(err) {
            return api.sendMessage(`Đã xảy ra lỗi`, event.threadID);
        };
}