const Command = require("../../structures/command")
const { MessageEmbed } = require("discord.js")
module.exports = class CryCommand extends Command {
    constructor(client) {
        super(client, {
            name: "chorar",
            aliases: ["cry"],
            description: "Mostre a todos que você está chorando, vai que assim tu ganha atenção",
            clientPermissions: ["EMBED_LINKS"],
            category: "ações",
            usage: "[@menção]"
        })
    }
    async run(message, args) {

        
    let avatar = message.author.displayAvatarURL({format: "png"});

    var list = [
      "https://i.imgur.com/5YWrh6Z.gif",
      "https://i.imgur.com/SzNkb87.gif",
      "https://i.imgur.com/7Yffi3x.gif",
      "https://i.imgur.com/evaPvIa.gif",
      "https://i.imgur.com/xsyIxxf.gif",
      "https://i.imgur.com/I18iVJC.gif",
      "https://i.imgur.com/fFKlGMv.gif",
      "https://i.imgur.com/XbxsKOw.gif",
      "https://i.imgur.com/iLTOyBa.gif",
      "https://i.imgur.com/mX1AWPv.gif",
      "https://i.imgur.com/MZQ8uYl.gif",
      "https://i.imgur.com/jjFtyVX.gif"
    ];

    var rand = list[Math.floor(Math.random() * list.length)];
    let user = message.mentions.users.first();

    if (user && user.bot) return message.channel.send(`Nem vem que nenhum bot faz alguem chorar, eles são amigáveis e divertidos. Assim como eu`)

    if (!user) {
      const embed = new MessageEmbed()
        .setTitle("Sad :(")
        .setColor("#000000")
        .setDescription(`${message.author} está chorando`)
        .setThumbnail(avatar)
        .setImage(rand)
        .setAuthor(message.author.tag, avatar);

      message.channel.send(embed);
      return;
    }

    if (user === message.author) {
      const embed = new MessageEmbed()
        .setTitle("Sad :( ")
        .setColor("#000000")
        .setDescription(`${message.author} está chorando`)
        .setThumbnail(avatar)
        .setImage(rand)
        .setAuthor(message.author.tag, avatar);

      message.channel.send(embed);
      return;
    }



    const embed = new MessageEmbed()
      .setTitle("Sad :(")
      .setColor("#000000")
      .setDescription(`${user} fez ${message.author} chorar`)
      .setImage(rand)
      .setThumbnail(avatar)
      .setAuthor(message.author.tag, avatar);

    await message.channel.send(embed);
    }
}