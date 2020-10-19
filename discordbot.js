const fs = require('fs');
const Discord = require("discord.js");
const bot = new Discord.Client();

const { Message } = require("discord.js");
const { prefix, token } = require("./bot/bot-config.json");

bot.on("ready", () => {
    bot.user.setPresence({
        status: 'online',
        activity: {
            name: 'with new hardware',
            type: 'PLAYING',
            url: 'https://pcclub.now.sh'
        }
    })

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
        case "help":

            msg.channel.send("");

        case "start":

            msg.channel.send("\n▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬\n@here - 🏁 Game started!\n▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬")
                .then(message => {
                    startGame(message)
                });
            break;

        case "lists":
        case "list":

            parts = getPartLists();
            text = partsListString(parts);

            const filter = (reaction, user) => [emojisChars[1], emojisChars[2], emojisChars[3]].includes(reaction.emoji.name) && user.id === msg.author.id;

            msg.channel.send(text[0])
                .then(async message => {

                    reactNum(text[1], message)

                    const collector = message.createReactionCollector(filter, {
                        time: 24 * 60 * 60 * 1000
                    })

                    collector.on("collect", (reaction, user) => {
                        const n = reverseNums[reaction.emoji.name] - 1;
                        message.channel.send(`\n**Enjoy \`list#${n + 1}! \`** ~ <https://pcpartpicker.com${parts.lists[n].relURL}>`)
                    })

                    collector.on("end", collected => {
                        message.edit(
                            message.content
                            .replace("PART LISTS", "~~PART LISTS~~ (Expired)")
                            .replace("Choose *any* of the following:", "~~Choose *any* of the following:~~ (Expired)")
                        )

                        message.react("❌");
                    });
                });
    }
});

// PC LIST THINGS

function getPartLists() {
    let raw = fs.readFileSync("clubdata/partlists.json");
    return JSON.parse(raw);
}

function partsListString(parts) {
    const emojis = ["💵", "⚡", "🔥"];
    var output = "▬▬▬ ***PART LISTS*** ▬▬▬\n";

    for (const [i, list] of parts.lists.entries()) {
        output += `\`\`\`${i + 1} - ${emojis[list.type]} ${list.name} - $${list.price}\`\`\``
    }

    output += "\nChoose *any* of the following: ";

    return [output, parts.lists.length];
}

// EMOJI THINGS

const emojisChars = {
    a: '🇦',
    b: '🇧',
    c: '🇨',
    d: '🇩',
    e: '🇪',
    f: '🇫',
    g: '🇬',
    h: '🇭',
    i: '🇮',
    j: '🇯',
    k: '🇰',
    l: '🇱',
    m: '🇲',
    n: '🇳',
    o: '🇴',
    p: '🇵',
    q: '🇶',
    r: '🇷',
    s: '🇸',
    t: '🇹',
    u: '🇺',
    v: '🇻',
    w: '🇼',
    x: '🇽',
    y: '🇾',
    z: '🇿',
    0: '0⃣',
    1: '1⃣',
    2: '2⃣',
    3: '3⃣',
    4: '4⃣',
    5: '5⃣',
    6: '6⃣',
    7: '7⃣',
    8: '8⃣',
    9: '9⃣',
    10: '🔟',
    '#': '#⃣',
    '*': '*⃣',
    '!': '❗',
    '?': '❓',
};

const reverseNums = {
    '0⃣': 0,
    '1⃣': 1,
    '2⃣': 2,
    '3⃣': 3,
    '4⃣': 4,
    '5⃣': 5,
    '6⃣': 6,
    '7⃣': 7,
    '8⃣': 8,
    '9⃣': 9,
    '🔟': 10
}

function getEmoji(message, name) {
    return message.guild.emojis.cache.find(emoji => emoji.name == name)
}

async function reactNum(n, message) {
    try {
        for (let i = 1; i <= n && i <= 10; i++) {
            await message.react(emojisChars[i]);
        }
    } catch (error) {
        console.error('One of the emojis failed to react.' + error);
    }
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