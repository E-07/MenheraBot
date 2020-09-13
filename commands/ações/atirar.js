const Discord = require("discord.js");

module.exports = {
  name: "atirar",
  aliases: ["tiro", "shot"],
  cooldown: 2,
  category: "ações",
  description: "Atira em alguem",
  usage: "m!atirar <@menção>",
  run: async (client, message, args) => {
  var list = [
    "https://i.imgur.com/4d1oxl9.gif",
    "https://i.imgur.com/vJdv4PP.gif",
    "https://i.imgur.com/nKHZmiY.gif",
    "https://i.imgur.com/G5kWKws.gif"
  ];

  var rand = list[Math.floor(Math.random() * list.length)];
  let user = message.mentions.users.first();

  if (!user) {
    return message.reply("Tu tem que mencionar em quem tu quer atirar");
  }

  if (user === message.author) {
    return message.reply(
      "Ja disse que suicídio não!!!"
    );
  }

  let avatar = message.author.displayAvatarURL({ format: "png" });

  const embed = new Discord.MessageEmbed()
    .setTitle("Atirar")
    .setColor("#000000")
    .setDescription(`${message.author} meteu bala em ${user}`)
    .setImage(rand)
    .setThumbnail(avatar)
    .setAuthor(message.author.tag, avatar);

   message.channel.send(embed);
}};
