function rename(msg, args, vcs) {
    if (!(
            (msg.member.voice.channel && vcs[msg.member.voice.channel.id]) ||
            (msg.member.roles.cache.find((role) => role.name.startsWith("🎤")))
        ))

    {
        msg.channel.send("❌ You are not in a compatible voice channel.");
        return;
    }

    let newName = args.join(" ");

    if (args.length == 0) {
        newName = `✨ ${msg.member.displayName}'s Room`;
    }

    msg.channel.send(`Changing voice call name to: \`${newName}\`\n\n**Note**: Discord allows bots to change channel names twice every 10 minutes`)
        .then(statusMessage => {
            msg.member.voice.channel.setName(newName)
                .then(() => {
                    statusMessage.react("👍");
                });
        });
}

module.exports = {
    name: 'renamevc',
    description: 'Rename a voice channel! (Use with caution)',
    example: 'pc-renamevc My VC Channel',
    execute(msg, args, extras) {
        rename(msg, args, extras.vcs);
    },
};