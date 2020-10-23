function calculate(msg, args) {
    if (args.length == 0) {
        msg.channel.send("**INSTRUCTIONS**\n```pc-calc [expression]```");
        return;
    }

    let equation = args.join(" ");
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
                return;
            }
        }

        if (someError) {
            msg.channel.send("❌ Accepted Chars: `1234567890+-*/%()`")
        } else {
            answer = eval(equation);
            msg.channel.send(`🧠 --> \`${answer}\``);
        }
    } catch (error) {
        msg.channel.send(`Invalid Expression:\n\`\`\`${error}\`\`\``);
    }
}

module.exports = {
    name: 'calc',
    description: 'Do simple calculations',
    example: "pc-calc [expression]",
    execute(msg, args) {
        calculate(msg, args);
    },
};