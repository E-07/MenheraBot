const Command = require("../../structures/command")
const { MessageEmbed } = require("discord.js")
module.exports = class HugCommand extends Command {
    constructor(client) {
        super(client, {
            name: "abraçar",
            aliases: ["abracar", "hug"],
            clientPermissions: ["EMBED_LINKS"],
            category: "ações"
        })
    }
    async run({ message, args, server }, t) {

        var list = [
            "https://i.imgur.com/r9aU2xv.gif",
            "https://i.imgur.com/wOmoeF8.gif",
            "https://i.imgur.com/BPLqSJC.gif",
            "https://i.imgur.com/ntqYLGl.gif",
            "https://i.imgur.com/4oLIrwj.gif",
            "https://i.imgur.com/6qYOUQF.gif",
            "https://i.imgur.com/nrdYNtL.gif",
            "https://i.imgur.com/6xsp74b.gif",
            "https://i.imgur.com/77nkAiZ.gif",
            "https://i.imgur.com/LOg4Mpr.gif",
            "https://i.imgur.com/gI5qiWQ.gif",
            "https://i.imgur.com/i5vwbos.gif",
            "https://i.imgur.com/14FwOef.gif",
            "https://i.imgur.com/RPYNm9o.gif",
            "https://i.imgur.com/kSWpxnG.gif",
            "https://i.imgur.com/itRyalr.gif"

        ];

        var rand = list[Math.floor(Math.random() * list.length)];
        let user = message.mentions.users.first();

        if (user && user.bot) return message.menheraReply("error", t("commands:hug.bot"))

        if (!user) {
            return message.menheraReply("error", t("commands:hug.no-mention"))
        }

        if (user === message.author) {
            return message.menheraReply("error", t("commands:hug.self-mention"))
        }

        let avatar = message.author.displayAvatarURL({format: "png"});

        const embed = new MessageEmbed()
            .setTitle(t("commands:hug.embed_title"))
            .setColor("#000000")
            .setDescription(`${message.author} ${t("commands:hug.embed_description")} ${user}`)
            .setImage(rand)
            .setThumbnail(avatar)
            .setAuthor(message.author.tag, avatar);

        message.channel.send(embed);
    }
}