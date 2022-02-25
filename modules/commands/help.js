module.exports.config = {
	name: "help",
	version: "1.0.2",
	hasPermssion: 0,
	credits: "Mirai Team ",
	description: "Hướng dẫn cho người mới",
	commandCategory: "system",
	usages: "[Tên module]",
	cooldowns: 5,
	envConfig: {
		autoUnsend: true,
		delayUnsend: 10
	}
};

module.exports.languages = {
	"vi": {
		"moduleInfo": "╭───╮\n    %1\n╰───╯ \n📜Mô tả: %2\n\n» 🧞Credit: %7\n» 💟Hướng dẫn cách dùng: %3\n» 🌟Thuộc nhóm: %4\n» ⏱Thời gian chờ: %5 giây(s)\n» 👥Quyền hạn: %6\n✎﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏\n💟 Điều Hành Bởi \n  ♥🅻🅴 🅲🅷🅸🅽🅷❤❤",
		"helpList": '≻───── •👇🏻• ─────≺\n💟 𝐻𝑖𝑒̣̂𝑛 𝑡𝑎̣𝑖 đ𝑎𝑛𝑔 𝑐𝑜́ %1 𝑙𝑒̣̂𝑛ℎ 𝑐𝑜́ 𝑡ℎ𝑒̂̉ 𝑠𝑢̛̉ 𝑑𝑢̣𝑛𝑔 𝑡𝑟𝑒̂𝑛 𝑏𝑜𝑡 𝑛𝑎̀𝑦💗\n🌟𝑆𝑢̛̉ 𝑑𝑢̣𝑛𝑔: "%2help + tên lệnh" đ𝑒̂̉ 𝑏𝑖𝑒̂́𝑡 𝑐𝑎́𝑐ℎ 𝑠𝑢̛̉ 𝑑𝑢̣𝑛𝑔 𝑙𝑒̣̂𝑛ℎ\n💟𝐵𝑜𝑡 đ𝑢̛𝑜̛̣𝑐 đ𝑖𝑒̂̀𝑢 ℎ𝑎̀𝑛ℎ 𝑏𝑜̛̉𝑖 \n ♥🅻🅴 🅲🅷🅸🅽🅷❤❤\n[💟] Đ𝑎̂𝑦 𝐿𝑎̀ 𝑇𝑜𝑎̀𝑛 𝐵𝑜̣̂ 𝐿𝑒̣̂𝑛ℎ[❗]\n🔰𝑉𝑢𝑖 𝐿𝑜̀𝑛𝑔 𝐾ℎ𝑜̂𝑛𝑔 𝑆𝑝𝑎𝑚  [❗]',
		"user": "Người dùng",
        "adminGroup": "Quản trị viên nhóm",
        "adminBot": "Quản trị viên bot"
	},
	"en": {
		"moduleInfo": "「 %1 」\n%2\n\n❯ Usage: %3\n❯ Category: %4\n❯ Waiting time: %5 seconds(s)\n❯ Permission: %6\n\n» Module code by %7 «",
		"helpList": '[ There are %1 commands on this bot, Use: "%2help nameCommand" to know how to use! ]',
		"user": "User",
        "adminGroup": "Admin group",
        "adminBot": "Admin bot"
	}
}

module.exports.handleEvent = function ({ api, event, getText }) {
  const fs = require("fs-extra");
	const { commands } = global.client;
	const { threadID, messageID, body } = event;
	const folderimg = __dirname + "/cache/menu";
	if (!fs.existsSync(folderimg)) fs.mkdir(folderimg);
	const listImg = fs.readdirSync(folderimg);
	
	if (!body || typeof body == "undefined" || body.indexOf("help") != 0) return;
	const splitBody = body.slice(body.indexOf("help")).trim().split(/\s+/);
	if (splitBody.length == 1 || !commands.has(splitBody[1].toLowerCase())) return;
	const threadSetting = global.data.threadData.get(parseInt(threadID)) || {};
	const command = commands.get(splitBody[1].toLowerCase());
	const prefix = (threadSetting.hasOwnProperty("PREFIX")) ? threadSetting.PREFIX : global.config.PREFIX;
	return api.sendMessage({ body: getText("moduleInfo", command.config.name, command.config.description, `${prefix}${command.config.name} ${(command.config.usages) ? command.config.usages : ""}`, command.config.commandCategory, command.config.cooldowns, ((command.config.hasPermssion == 0) ? getText("user") : (command.config.hasPermssion == 1) ? getText("adminGroup") : getText("adminBot")), command.config.credits), attachment: fs.createReadStream(folderimg+"/"+listImg[Math.floor(Math.random() * listImg.length)])}, threadID, messageID);
}

module.exports.run = function({ api, event, args, getText }) {
  const fs = require("fs-extra");
	const { commands } = global.client;
	const { threadID, messageID } = event;
	const command = commands.get((args[0] || "").toLowerCase());
	const folderimg = __dirname + "/cache/menu";
	if (!fs.existsSync(folderimg)) fs.mkdir(folderimg);
	const listImg = fs.readdirSync(folderimg);
	const threadSetting = global.data.threadData.get(parseInt(threadID)) || {};
	const { autoUnsend, delayUnsend } = global.configModule[this.config.name];
	const prefix = (threadSetting.hasOwnProperty("PREFIX")) ? threadSetting.PREFIX : global.config.PREFIX;

	if (!command) {
		const command = commands.values();
		var group = [], msg = "";
		for (const commandConfig of command) {
			if (!group.some(item => item.group.toLowerCase() == commandConfig.config.commandCategory.toLowerCase())) group.push({ group: commandConfig.config.commandCategory.toLowerCase(), cmds: [commandConfig.config.name] });
			else group.find(item => item.group.toLowerCase() == commandConfig.config.commandCategory.toLowerCase()).cmds.push(commandConfig.config.name);
		}
		group.forEach(commandGroup => msg += `💟${commandGroup.group.charAt(0).toUpperCase() + commandGroup.group.slice(1)}💟\n${commandGroup.cmds.join(', ')}\n\n`);
		return api.sendMessage({body: msg + getText("helpList", commands.size, prefix), attachment: fs.createReadStream(folderimg+"/"+listImg[Math.floor(Math.random() * listImg.length)])}, threadID, async (error, info) =>{
			if (autoUnsend) {
				await new Promise(resolve => setTimeout(resolve, delayUnsend * 25000));
				return api.unsendMessage(info.messageID);
			} else return;
		});

	}

	return api.sendMessage({ body: getText("moduleInfo", command.config.name, command.config.description, `${prefix}${command.config.name} ${(command.config.usages) ? command.config.usages : ""}`, command.config.commandCategory, command.config.cooldowns, ((command.config.hasPermssion == 0) ? getText("user") : (command.config.hasPermssion == 1) ? getText("adminGroup") : getText("adminBot")), command.config.credits), attachment: fs.createReadStream(folderimg+"/"+listImg[Math.floor(Math.random() * listImg.length)])}, threadID, messageID);
    }