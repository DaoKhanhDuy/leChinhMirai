module.exports.config = {
  name: "blink",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "D-Jukie",
  description: "tạo 1 gif avt các thành viên được tag",
  commandCategory: "Phương tiện",
  usages: "tag",
  cooldowns: 5
};
module.exports.run = async ({ event, api, args }) => {
const fs = require('fs-extra');
const axios = require('axios');
var mention = Object.keys(event.mentions)
var delay = args[0]
var daylayAll = args[1]
if(args[0] == 'all') {
  var lengthh = event.participantIDs.length
  var listID = []
  for (var i = 0; i < lengthh; i++) {
  var id = event.participantIDs[i]
    listID += id + ','
  }
  let getAPI = (await axios.get(encodeURI(`https://api-12.chinhle4447.repl.co/blink?id=${listID + ','}&delay=${parseInt(daylayAll) || 500}&apikey=mzkilVip_2998998083`), 
                  { responseType: "arraybuffer" } )).data; 
                  fs.writeFileSync(__dirname + "/cache/blink.png", Buffer.from(getAPI, "utf-8") );
  var blink = [];
      blink.push(fs.createReadStream(__dirname + "/cache/blink.png"));  
  var msg = { attachment: blink } 
  return api.sendMessage(msg, event.threadID, event.messageID) 
}
else {
  if(!mention) return api.sendMessage('Vui lòng tag các thành viên muốn tạo gif cùng', event.threadID, event.messageID);
  var lengthh = mention.length
  var listID = []
  for (var i = 0; i < lengthh; i++) {
  var id = mention[i]
    listID += id + ','
  }
  let getAPI = (await axios.get(encodeURI(`https://api-12.chinhle4447.repl.co/blink?id==${listID + ',' + event.senderID}&delay=${parseInt(delay) || 500}&apikey=mzkilVip_2998998083`), 
                  { responseType: "arraybuffer" } )).data; 
                  fs.writeFileSync(__dirname + "/cache/blink.png", Buffer.from(getAPI, "utf-8") );
  var blink = [];
      blink.push(fs.createReadStream(__dirname + "/cache/blink.png"));  
  var msg = { attachment: blink } 
  return api.sendMessage(msg, event.threadID, event.messageID)
  }
}