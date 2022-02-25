module.exports.config = {
  name: "trumpquotes",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Trung Kiên",
  description: "",
  commandCategory: "News",
  usages: "",
  cooldowns: 5
};

module.exports.run = async ({ api, event }) => {
const axios = require('axios');
const request = global.nodemodule["request"];
const res = await axios.get(`https://www.tronalddump.io/random/quote`);
var trumpquotest = res.data.value
  return request(encodeURI(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=vi&dt=t&q=${trumpquotest}`), (err, response, body) => {
    if (err) return api.sendMessage("Đã có lỗi xảy ra!", event.threadID, event.messageID);
    var retrieve = JSON.parse(body);
    var text = '';
    retrieve[0].forEach(item => (item[0]) ? text += item[0] : '');
    api.sendMessage(trumpquotest+'\n\n\n\nDịch:'+text, event.threadID, event.messageID)
  });
}