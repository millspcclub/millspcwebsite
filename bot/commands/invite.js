function invite(msg, args) {
    if (msg.member.voice) {
        replyWithInvite(msg, args.join(""));
    }
}

async function replyWithInvite(message, args) {
    let invite = await message.channel.createInvite({
            maxAge: 8640, // maximum time for the invite, in milliseconds
            maxUses: 1 // maximum times it can be used
        },
        `Requested with command by ${message.author.tag}`
    ).catch(console.log);
    
    message.reply(invite ? `[${args}]Here's your invite: ${invite}` : "There has been an error during the creation of the invite.");
}
    
module.exports = {
    name: 'invite',
    description: 'Invite people into your voice channel!',
    example: 'pc-invite @SomePerson',
    execute(msg, args) {
        invite(msg, args);
    },
};