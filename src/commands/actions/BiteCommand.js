const Command = require("../../structures/command")
const { MessageEmbed } = require("discord.js")
module.exports = class BiteCommand extends Command {
    constructor(client) {
        super(client, {
            name: "morder",
            aliases: ["bite"],
            clientPermissions: ["EMBED_LINKS"],
            category: "ações"
        })
    }
    async run({ message, args, server }, t) {

        var list = [
            "https://i.imgur.com/mimLPx3.gif",
            "https://i.imgur.com/AZ2dUaq.gif",
            "https://i.imgur.com/xKJw3mX.gif",
            "https://i.imgur.com/wb14mqC.gif",
            "https://i.imgur.com/k5tADh7.gif",
            "https://i.imgur.com/hrNGU3m.gif"
          ];
      
          var rand = list[Math.floor(Math.random() * list.length)];
          let user = message.mentions.users.first();
      
          if (user && user.bot) return message.menheraReply("warn", t("commands:bite.bot"));
      
          if (!user) {
            return message.menheraReply("error", t("commands:bite.no-mention"));
          }
      
          if (user === message.author) {
            return message.menheraReply("error", t("commands:bite.self-mention"));
          }
      
          let avatar = message.author.displayAvatarURL({format: "png"});
      
          const embed = new MessageEmbed()
            .setTitle(t("commands:bite.embed_title"))
            .setColor("#000000")
            .setDescription(`${message.author} ${t("commands:bite.embed_description")} ${user} :3`)
            .setImage(rand)
            .setThumbnail(avatar)
            .setAuthor(message.author.tag, avatar);
      
          message.channel.send(embed);
    }
}