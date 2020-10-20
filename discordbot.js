const fs = require('fs');
const Discord = require("discord.js-selfbot");
const bot = new Discord.Client();

const { prefix, token } = require("./bot/bot-config.json");

// CONFIGS
var botting = token.startsWith("mfa.");

bot.on("ready", () => {
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
    if (msg.content === "are developers better than designers?") msg.channel.send(`yes.`);
    if (msg.content === "are designers better than developers?") msg.channel.send(`no.`);

    if (!msg.content.startsWith(prefix)) return;
    if (msg.author.bot) return;

    const args = msg.content.substring(prefix.length).split(" ");

    switch (args[0]) {
        case "help":
            const docs = {
                help: {
                    name: "pc-help",
                    value: "Find out more about the bot + commands\n```pc-help [command]```",
                    inline: true
                },
                calc: {
                    name: "pc-calc",
                    value: "Simple calculator\n```pc-calc [expression]```",
                    inline: true
                }
            }

            const help = {
                color: "#0099ff",
                title: 'PC CLUB BOT',
                url: 'https://pcclub.now.sh/',
                author: {
                    icon_url: 'https://s3.us-west-2.amazonaws.com/secure.notion-static.com/24b0f5b1-603f-4c6e-9c22-c039dd69ea75/PC_Club_Logo_%282%29.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20201020%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20201020T081240Z&X-Amz-Expires=86400&X-Amz-Signature=0cd47b0add89c409ec1d839a92616c358bc65138a8323dd736f15938724b2220&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22PC_Club_Logo_%282%29.png%22',
                },
                description: '**BOT COMMANDS:**',
                fields: [Object.values(docs)],
                timestamp: new Date(),
                footer: {
                    text: 'Train the mind. Power the future.',
                    icon_url: 'https://s3.us-west-2.amazonaws.com/secure.notion-static.com/24b0f5b1-603f-4c6e-9c22-c039dd69ea75/PC_Club_Logo_%282%29.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20201020%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20201020T081240Z&X-Amz-Expires=86400&X-Amz-Signature=0cd47b0add89c409ec1d839a92616c358bc65138a8323dd736f15938724b2220&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22PC_Club_Logo_%282%29.png%22',
                },
            };

            if (args.length == 1) {
                msg.channel.send({ embed: help });
            } else if (args.length >= 2) {

                let selected = docs[args[1].toLowerCase()];

                if (typeof selected == "undefined")
                    selected = {
                        name: "Couldn't find what you're looking for.",
                        value: "For the full list of commands, type:\n```pc-help [command]```"
                    }

                const selectiveDocs = {
                    color: "#474747",
                    title: 'PC CLUB BOT',
                    url: 'https://pcclub.now.sh/',
                    author: {
                        icon_url: 'https://s3.us-west-2.amazonaws.com/secure.notion-static.com/24b0f5b1-603f-4c6e-9c22-c039dd69ea75/PC_Club_Logo_%282%29.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20201020%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20201020T081240Z&X-Amz-Expires=86400&X-Amz-Signature=0cd47b0add89c409ec1d839a92616c358bc65138a8323dd736f15938724b2220&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22PC_Club_Logo_%282%29.png%22',
                    },
                    description: `**❌ ERROR**`,
                    timestamp: new Date(),
                    fields: [selected],
                    footer: {
                        text: 'Train the mind. Power the future.',
                        icon_url: 'https://s3.us-west-2.amazonaws.com/secure.notion-static.com/24b0f5b1-603f-4c6e-9c22-c039dd69ea75/PC_Club_Logo_%282%29.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20201020%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20201020T081240Z&X-Amz-Expires=86400&X-Amz-Signature=0cd47b0add89c409ec1d839a92616c358bc65138a8323dd736f15938724b2220&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22PC_Club_Logo_%282%29.png%22',
                    },
                }

                msg.channel.send({ embed: selectiveDocs });
            }

            break;

        case "start":

            msg.channel.send("\n▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬\n@here - 🏁 Game started!\n▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬")
                .then(message => {
                    startGame(message)
                });
            break;

        case "calc":

            if (args.length == 1) {
                msg.channel.send("**INSTRUCTIONS**\n```pc-calc [expression]```");
                break;
            }

            let equation = args;
            equation.shift();
            equation = equation.join(" ")
            equation = equation
                .replace(/\n/g, "")
                .replace(/`/g, "")
                .replace(/--/g, " - -")
                .replace(/,/g, "")
                .replace(/\[/g, "(")
                .replace(/\]/g, ")")

            try {
                let someError = false;

                for (const letter of equation.replace(" ", "")) {
                    if (!(".1234567890+-*/%() ".split("").includes(letter))) {
                        someError = true;
                        break;
                    }
                }

                if (someError) {
                    msg.channel.send("❌ Accepted Chars: `1234567890+-*/%()`")
                } else {
                    answer = eval(equation);
                    msg.channel.send(`🧠 => ${answer}`);
                }
            } catch (error) {
                msg.channel.send(`Invalid Expression:\n\`\`\`${error}\`\`\``);
            }

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