const fs = require("fs");

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
};

function getPartLists() {
    let raw = fs.readFileSync("clubdata/partlists.json");
    return JSON.parse(raw);
}

function partsListString(parts) {
    const emojis = ["💵", "⚡", "🔥"];
    var output = "▬▬▬ ***PART LISTS*** ▬▬▬\n";

    for (const [i, list] of parts.lists.entries()) {
        output += `\`\`\`${i + 1} - ${emojis[list.type]} ${list.name} - $${list.price}\`\`\``;
    }

    output += "\nChoose *any* of the following: ";

    return [output, parts.lists.length];
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

function getLists(msg, args) {
    parts = getPartLists();
    text = partsListString(parts);

    const filter = (reaction, user) => ['0⃣', '1⃣', '2⃣', '3⃣', '4⃣', '5⃣', '6⃣', '7⃣', '8⃣', '9⃣', '🔟'].includes(reaction.emoji.name) && user.id === msg.author.id;

    msg.channel.send(text[0])
        .then(async message => {

            reactNum(text[1], message);

            const collector = message.createReactionCollector(filter, {
                time: 24 * 60 * 60 * 1000
            });

            collector.on("collect", (reaction, user) => {
                const n = reverseNums[reaction.emoji.name] - 1;
                message.channel.send(`\n**Enjoy \`☕ list#${n + 1}!\`** ~ <https://pcpartpicker.com${parts.lists[n].relURL}>`);
            });

            collector.on("end", collected => {
                message.edit(
                    message.content
                    .replace("PART LISTS", "~~PART LISTS~~ (Expired)")
                    .replace("Choose *any* of the following:", "~~Choose *any* of the following:~~ (Expired)")
                );

                message.react("❌");
            });
        });
}

module.exports = {
    name: 'list',
    description: 'PC Club\'s Part list vending machine',
    example: 'pc-list',
    execute(msg, args) {
        getLists(msg, args);
    },
};