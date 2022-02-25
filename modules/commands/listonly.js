module.exports.config = {
    name: "listonly",
    version: "1.0",
    hasPermssion: 1,
    credits: "D-Jukie fix Kadeer",
    description: "Quản lý admin bot",
    commandCategory: "Admin",
    usages: "qtvonly",
    cooldowns: 5,
    dependencies: {
        "fs-extra": ""
    }
};

module.exports.onLoad = function() {
    const { writeFileSync, existsSync } = require('fs-extra');
    const { resolve } = require("path");
    const path = resolve(__dirname, 'cache', 'databox.json');
    if (!existsSync(path)) {
        const obj = {
            listbox: {}
        };
        writeFileSync(path, JSON.stringify(obj, null, 4));
    } else {
        const data = require(path);
        if (!data.hasOwnProperty('listbox')) data.listbox = {};
        writeFileSync(path, JSON.stringify(data, null, 4));
    }
}
module.exports.run = async function ({ api, event, args }) {
const { threadID, messageID, mentions } = event;

        const { resolve } = require("path");
        const pathData = resolve(__dirname, 'cache', 'databox.json');
        const database = require(pathData);
        const { listbox } = database;   
        if (listbox[threadID] == true) {
            listbox[threadID] = false;
            api.sendMessage("» Tắt thành công chế độ admin (tất cả mọi người đều có thể sử dụng bot)", threadID, messageID);
        } else {
            listbox[threadID] = true;
            api.sendMessage("» Bật thành công chế độ admin (chỉ box được duyệt mới có thể sử dụng bot)", threadID, messageID);
        }
}