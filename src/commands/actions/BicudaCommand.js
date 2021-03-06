const Command = require("../../structures/command")
const { MessageEmbed } = require("discord.js")
module.exports = class BicudaCommand extends Command {
    constructor(client) {
        super(client, {
            name: "bicuda",
            aliases: ["chutar"],
            clientPermissions: ["EMBED_LINKS"],
            category: "ações"
        })
    }
    async run({ message, args, server }, t) {

        var list = [
            "https://i.imgur.com/GoHtaA8.gif",
            "https://i.imgur.com/krh4BD6.gif",
            "https://i.imgur.com/ilRr5yw.gif",
            "https://i.imgur.com/UtWFnw1.gif",
            "https://i.imgur.com/17g1pkj.gif",
            "https://i.imgur.com/WjU3lxi.gif"
        ];

        var rand = list[Math.floor(Math.random() * list.length)];
        let user = message.mentions.users.first();

        if (user && user.bot) return message.menheraReply("warn", t("commands:bicuda.bot"));

        if (!user) {
            return message.menheraReply("error", t("commands:bicuda.no-mention"));
        }

        if (user === message.author) {
            return message.menheraReply("error", t("commands:bicuda.self-mention"));
        }

        let avatar = message.author.displayAvatarURL({format: "png"});

        const embed = new MessageEmbed()
            .setTitle(t("commands:bicuda.embed_title"))
            .setColor("#000000")
            .setDescription(`${message.author} ${t("commands:bicuda.embed_description")} ${user}`)
            .setImage(rand)
            .setThumbnail(avatar)
            .setAuthor(message.author.tag, avatar);

        message.channel.send(embed);
    }
}