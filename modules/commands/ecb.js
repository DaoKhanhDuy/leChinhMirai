module.exports.config = {
	name: "ecb",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "tdunguwu",
	description: "encode pin thoi",
	commandCategory: "Other",
	usages: "Pin",
	cooldowns: 5,
	dependencies: {"axios" : ""}

	
};

module.exports. run = async ({ api, event,args }) => {
const axios = global.nodemodule["axios"];
let en = args.join(" ");
const res = await axios.get(`https://api.popcat.xyz/encode?text=${en}`);
var binary = res.data.binary;
if (!en) return api.sendMessage("địt mẹ chưa nhập nội dung để coi kìa ", event.threadID, event.messageID);

return api.sendMessage(`${binary}`, event.threadID, event.messageID)
}