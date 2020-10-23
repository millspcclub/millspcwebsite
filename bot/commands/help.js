// pc-help command
const { prefix } = require("../bot-config.json");

// Edit this to add docs
// const docs = {
//     help: {
//         name: "pc-help",
//         value: "Find out more about the bot + commands\n```pc-help [command]```",
//         inline: true
//     },
//     calc: {
//         name: "pc-calc",
//         value: "Simple calculator\n```pc-calc [expression]```",
//         inline: true
//     },
//     lists: {
//         name: "pc-list",
//         value: "All PC Club build lists can be read\n```pc-list(s)```",
//         inline: true
//     }
// }

function sendHelp(cmds, msg, args) {

    let docs = [];
    for (const [key, value] of cmds.entries()) {
        docs.push({
            name: prefix + key,
            value: value.description + '```' + value.example + '```'
        });
    }

    msg.channel.send({
        embed: {
            color: "#0099ff",
            title: 'PC CLUB BOT',
            url: 'https://pcclub.now.sh/',
            author: {
                icon_url: 'https://s3.us-west-2.amazonaws.com/secure.notion-static.com/24b0f5b1-603f-4c6e-9c22-c039dd69ea75/PC_Club_Logo_%282%29.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20201020%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20201020T081240Z&X-Amz-Expires=86400&X-Amz-Signature=0cd47b0add89c409ec1d839a92616c358bc65138a8323dd736f15938724b2220&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22PC_Club_Logo_%282%29.png%22',
            },
            description: '**BOT COMMANDS:**',
            fields: docs,
            timestamp: new Date(),
            footer: {
                text: 'Train the mind. Power the future.',
                icon_url: 'https://s3.us-west-2.amazonaws.com/secure.notion-static.com/24b0f5b1-603f-4c6e-9c22-c039dd69ea75/PC_Club_Logo_%282%29.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20201020%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20201020T081240Z&X-Amz-Expires=86400&X-Amz-Signature=0cd47b0add89c409ec1d839a92616c358bc65138a8323dd736f15938724b2220&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22PC_Club_Logo_%282%29.png%22',
            },
        }
    });

    return;

    if (args.length == 0) {
        msg.channel.send({ embed: help });
    } else if (args.length > 0) {

        let selected = docs[args[0].toLowerCase()];

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
}

module.exports = {
    name: 'help',
    description: 'Find out more about the bot + commands',
    example: "pc-help [command]",
    execute(cmds, msg, args) {
        sendHelp(cmds, msg, args);
    },
};