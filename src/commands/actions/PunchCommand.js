const Command = require("../../structures/command")
const { MessageEmbed } = require("discord.js")
module.exports = class PunchCommand extends Command {
    constructor(client) {
        super(client, {
            name: "socar",
            aliases: ["punch"],
            clientPermissions: ["EMBED_LINKS"],
            category: "ações"
        })
    }
    async run({ message, args, server }, t) {

        var list = [
            "https://i.imgur.com/f2kkp3L.gif",
            "https://i.imgur.com/C6lqbl8.gif",
            "https://i.imgur.com/pX1E9uU.gif",
            "https://i.imgur.com/GfyKm1x.gif"
        ];

        var rand = list[Math.floor(Math.random() * list.length)];
        let user = message.mentions.users.first();

        if (user && user.bot) return message.menheraReply("error", t("commands:punch.bot"))

        if (!user) return message.menheraReply("error", t("commands:punch.no-mention"))

        if (user === message.author) return message.menheraReply("error", t("commands:punch.self-mention"))

        let avatar = message.author.displayAvatarURL({ format: "png" });

        const embed = new MessageEmbed()
            .setTitle(t("commands:punch.embed_title"))
            .setColor("#000000")
            .setDescription(`${message.author} ${t("commands:punch.embed_description")} ${user}`)
            .setImage(rand)
            .setThumbnail(avatar)
            .setAuthor(message.author.tag, avatar);

        message.channel.send(embed);
    }
}