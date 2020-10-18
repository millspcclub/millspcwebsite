const fs = require('fs');
const Discord = require("discord.js");
const bot = new Discord.Client();

const { Message } = require("discord.js");
const { prefix, token } = require("./bot/bot-config.json");

bot.on("ready", () => {
    console.log("[✔]: Poggers! We are running!");
});

bot.on("message", msg => {
    if (msg.content === "hello") msg.channel.send(`👋 Hello, ${msg.author}`);
    if (msg.content === "are developers better than designers?") msg.channel.send(`yes.`);
    if (msg.content === "are designers better than developers?") msg.channel.send(`no.`);

    if (!msg.content.startsWith(prefix)) return;
    if (msg.author.bot) return;

    const args = msg.content.substring(prefix.length).split(" ");

    switch (args[0]) {
        case "start":
            msg.channel.send("\n▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬\n@here - 🏁 Game started!\n▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬")
                .then(message => {
                    startGame(message)
                });
            break;
        case "lists":
        case "list":
            parts = getPartLists();
            msg.channel.send(partsListString(parts))
                .then(message => {
                    message.react("😎")
                });
    }
});

// PC LIST THINGS

function getPartLists() {
    let raw = fs.readFileSync("bot/student.json");
    let parts = JSON.parse(raw);
}

function partsListString(parts) {
    var output = "**PART LISTS**";

    for (const list in parts.list) {
        output += `\n${list.name} - $${list.price}`
    }

    return output;
}

// EMOJI THINGS

function getEmoji(message, name) {
    return message.guild.emojis.cache.find(emoji => emoji.name == name)
}

async function startGame(message) {
    try {
        await message.react("🔈");
        await message.react("🔊");
        await message.react("🏁");
    } catch (error) {
        console.error('One of the emojis failed to react.' + error);
    }
}

bot.login(token);

module.exports = {
    init: bot.login(token)
}