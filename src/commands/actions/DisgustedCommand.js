const Command = require("../../structures/command")
const { MessageEmbed } = require("discord.js")
module.exports = class DisgustedCommand extends Command {
    constructor(client) {
        super(client, {
            name: "nojo",
            aliases: ["disgusted"],
            clientPermissions: ["EMBED_LINKS"],
            category: "ações"
        })
    }
    async run({ message, args, server }, t) {

        var list = [
            "https://i.imgur.com/6sAJms7.gif",
            "https://i.imgur.com/l5QgIAV.gif",
            "https://i.imgur.com/7AskNHD.gif",
            "https://i.imgur.com/LOSFoxm.gif",
            "https://i.imgur.com/xPIvx3i.gif",
            "https://i.imgur.com/JXNiWIL.gif"
        ];

        var rand = list[Math.floor(Math.random() * list.length)];
        let user = message.mentions.users.first();
        let avatar = message.author.displayAvatarURL({ format: "png" });

        if (user && user.bot) return message.menheraReply("error", t("commands:disgusted.bot"))

        if (!user || user == message.author) {
            const embed = new MessageEmbed()
                .setTitle(t("commands:disgusted.no-mention.embed_title"))
                .setColor("#000000")
                .setDescription(`${message.author} ${t("commands:disgusted.no-mention.embed_title")}`)
                .setThumbnail(avatar)
                .setImage(rand)
                .setAuthor(message.author.tag, avatar);

            message.channel.send(embed);
            return;
        }

        const embed = new MessageEmbed()
            .setTitle("Nojo")
            .setColor("#000000")
            .setDescription(`${message.author} ${t("commands.disgusted.embed_description")} ${user}`)
            .setImage(rand)
            .setThumbnail(avatar)
            .setAuthor(message.author.tag, avatar);

        await message.channel.send(embed);
    }
}