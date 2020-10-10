const {
  MessageEmbed
} = require("discord.js");
module.exports = {
  name: "morder",
  aliases: ["morde", "bite", "moider", "moidi"],
  cooldown: 2,
  category: "ações",
  dir: 'BiteCommand',
  description: "Morde alguem X3 Moidi :3",
  userPermission: null,
  clientPermission: ["EMBED_LINKS"],
  usage: "m!morder <@menção>",
  run: async (client, message, args) => {
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

    if (user && user.bot) return message.channel.send(`${message.author} mordeu um robô... -5 dentes na boca`);

    if (!user) {
      return message.channel.send("<:negacao:759603958317711371> | Tu tem que mencionar quem tu quer morder neah");
    }

    if (user === message.author) {
      return message.channel.send("<:negacao:759603958317711371> | Ala o masoquista, faça isso agora mesmo, não precisa de comando");
    }

    let avatar = message.author.displayAvatarURL({
      format: "png"
    });

    const embed = new MessageEmbed()
      .setTitle("Morder")
      .setColor("#000000")
      .setDescription(`${message.author} moideu ${user} :3`)
      .setImage(rand)
      .setThumbnail(avatar)
      .setAuthor(message.author.tag, avatar);

    message.channel.send(embed);
  }
};