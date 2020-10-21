const Command = require("../../structures/command")
const { MessageEmbed } = require("discord.js")
module.exports = class ResurrectCommand extends Command {
    constructor(client) {
        super(client, {
            name: "ressuscitar",
            aliases: ["reviver", "resurrect"],
            description: "Ressuscite alguém morto",
            clientPermissions: ["EMBED_LINKS"],
            category: "ações",
            usage: "<@menção>",
        })
    }
    async run(message, args) {

        var list = [
            "https://i.imgur.com/krVf6J7.gif",
            "https://i.imgur.com/igSM6nd.gif",
            "https://i.imgur.com/h1a2nd8.gif"
        ];

        var rand = list[Math.floor(Math.random() * list.length)];
        let user = message.mentions.users.first();
        let avatar = message.author.displayAvatarURL({ format: "png" });

        if (!user) {
            return message.channel.send("❓ | Como ressuscitar o nada, que nunca morreu");
        }

        if (user === message.author) {
            return message.channel.send("❓ | uai, se tu ta morto, como tu ta digitando?");
        }

        if (user.bot) return message.channel.send(`um robô foi religado UwU >.<`)

        const embed = new MessageEmbed()
            .setTitle("Ressuscitar")
            .setColor("#000000")
            .setDescription(`${message.author} Ressuscitou ${user}`)
            .setImage(rand)
            .setThumbnail(avatar)
            .setAuthor(message.author.tag, avatar);

        message.channel.send(embed);
    }
}