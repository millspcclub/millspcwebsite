// PC CLUB DISCORD BOT

// Modules
const fs = require('fs');
const Discord = require("discord.js");
const bot = new Discord.Client();

const { prefix } = require("./bot/bot-config.json");

// Importing Commands
const { commands } = require("./bot/commandsystem.js");
const { create } = require('domain');
bot.commands = commands;


bot.once("ready", () => {
    bot.user.setPresence({
        status: 'online',
        activity: {
            name: 'with hardware | pc-help',
            type: 'PLAYING'
        }
    });

    console.log("[✔]: Poggers! We are running!");
});

bot.on("message", msg => {
    if (msg.content === "hello") msg.channel.send(`👋 Hello, ${msg.author}`);
    if (!msg.content.startsWith(prefix) || msg.author.bot) return;


    const args = msg.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLocaleLowerCase();


    if (!bot.commands.has(command)) return;

    const extras = {
        cmds: commands,
        vcs: vcs
    };

    try {
        bot.commands.get(command).execute(msg, args, extras);
    } catch (error) {
        msg.reply(`😥 something went terribly wrong:\n\`\`\`${error}\`\`\``);
    }
    return;
});

let vcs = [];

bot.on('voiceStateUpdate', (oldMember, newMember) => {
    let createChannel = newMember.channel;

    if (createChannel !== null && createChannel.name === "⭐ Create VC") {
        newMember.guild.channels.create(`✨ ${newMember.member.displayName}'s Room`, {
                type: 'voice',
                bitrate: 96000,
                parent: createChannel.parent,
                position: createChannel.position
            })
            .then(vc => {
                newMember.member.voice.setChannel(vc);
                vcs[vc.id] = vc;
            })
            .catch(err => {
                console.error(err);
            });
    }

    if (!vcs.includes(oldMember.channelID)) {
        if (vcs[oldMember.channelID] !== undefined) {
            let channel = oldMember.guild.channels.cache.get(oldMember.channelID);
            if (channel.members.size == 0) {
                channel.delete();
                vcs[oldMember.channelID] = undefined;
            }
        }
    }
});

// Init dotenv
require("dotenv").config();
bot.login(process.env.DISCORD_BOT_TOKEN);