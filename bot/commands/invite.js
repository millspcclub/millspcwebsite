function invite(msg, args) {
    if (msg.member.voice) {
        msg.channel.send(`[${args}] Come join my voice channel!\n<@${msg.member.voice.channel.id}>`);
    }
}

module.exports = {
    name: 'invite',
    description: 'Invite people into your voice channel!',
    example: 'pc-invite @SomePerson',
    execute(msg, args) {
        invite(msg, args);
    },
};