// PC CLUB DISCORD BOT

// Modules
const fs = require('fs');
const Discord = require("discord.js");
const bot = new Discord.Client();

const { prefix } = require("./bot/bot-config.json");

// Importing Commands
const { commands } = require("./bot/commandsystem.js");
bot.commands = commands;


bot.once("ready", () => {
    bot.user.setPresence({
        status: 'online',
        activity: {
            name: 'with hardware | pc-help',
            type: 'PLAYING'
        }
    })

    console.log("[✔]: Poggers! We are running!");
});

bot.on("message", msg => {
    if (msg.content === "hello") msg.channel.send(`👋 Hello, ${msg.author}`);
    if (!msg.content.startsWith(prefix) || msg.author.bot) return;


    const args = msg.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLocaleLowerCase();


    if (!bot.commands.has(command)) return;

    try {
        if (command === "help") bot.commands.get(command).execute(commands, msg, args);
        else bot.commands.get(command).execute(msg, args);
    } catch (error) {
        msg.reply(`❌ Sorry, something went terribly wrong:\n\`\`\`${error}\`\`\``)
    }
    return;


    switch (args[0]) {
        case "help":
            break;

        case "start":
            break; // disable command

            msg.channel.send("\n▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬\n@here - 🏁 Game started!\n▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬")
                .then(message => {
                    startGame(message)
                });
            break;
        case "lists":
        case "list":

            parts = getPartLists();
            text = partsListString(parts);

            const filter = (reaction, user) => ['0⃣', '1⃣', '2⃣', '3⃣', '4⃣', '5⃣', '6⃣', '7⃣', '8⃣', '9⃣', '🔟'].includes(reaction.emoji.name) && user.id === msg.author.id;

            msg.channel.send(text[0])
                .then(async message => {

                    reactNum(text[1], message)

                    const collector = message.createReactionCollector(filter, {
                        time: 24 * 60 * 60 * 1000
                    })

                    collector.on("collect", (reaction, user) => {
                        const n = reverseNums[reaction.emoji.name] - 1;
                        message.channel.send(`\n**Enjoy \`☕ list#${n + 1}!\`** ~ <https://pcpartpicker.com${parts.lists[n].relURL}>`)
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

            break;
    }

    // Botting Functionality
    if (botting && msg.channel.id == "766151773458661418" && msg.embeds.length > 0) {
        if (msg.embeds[0].description.includes("h!treat")) {
            setTimeout(function() {
                msg.channel.send("h!treat");
            }, bottingTimeout);
        } else if (msg.embeds[0].description.includes("h!trick")) {
            setTimeout(function() {
                msg.channel.send("h!trick");
                count++;
            }, bottingTimeout);
        }
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



async function startGame(message) {
    try {
        await message.react("🔈");
        await message.react("🔊");
        await message.react("🏁");
    } catch (error) {
        console.error('One of the emojis failed to react.' + error);
    }
}

// Init dotenv
require("dotenv").config();
bot.login(process.env.DISCORD_BOT_TOKEN);