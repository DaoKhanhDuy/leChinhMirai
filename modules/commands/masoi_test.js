module.exports.config = {
  name: "masoi",
  version: "0.0.1 beta",
  hasPermssion: 0,
  credits: "Duy",
  description: "Là ma sói nhưng chơi bằng bot Miraiv2",
  commandCategory: "Giải trí",
  cooldowns: 0
};

module.exports.handleReply = async function({ api, event }) { 
  if (event.isGroup == false) { 
    api.sendMessage(event.body, event.senderID);
    // nhắn box
    return api.sendMessage(event.body, global.masoi.threadID);
  }
}
module.exports.handleEvent = async function({ api, event }) {
  if (event.isGroup == false && !event.body && event.body < 1 && event.body > 2) return api.sendMessage('Vui lòng chọn số hợp lệ nha pri!!!', event.senderID, event.messageID);
}
module.exports.run = async function ({ api, event }) { 
  return api.sendMessage('Check tin nhắn đi pr?', event.threadID, () => { 
    api.sendMessage('Chọn 1,2 nhé pri', event.senderID, (err, data) => { 
      global.masoi = { 
        senderID: event.senderID,
        choose: null,
        threadID: event.threadID
      }
      global.client.handleReply.push({ 
        name: this.config.name,
        messageID: data.messageID
      })
    })
  }, event.messageID);
}