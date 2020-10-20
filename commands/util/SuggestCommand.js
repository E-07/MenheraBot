const {
  MessageEmbed
} = require("discord.js");
module.exports = {
  name: "sugerir",
  aliases: ["suggest", "sugestão"],
  cooldown: 5,
  category: "util",
  dir: 'SuggestCommand',
  description: "Sugira algo para a dona do bot ou envie um bug para ela",
  userPermission: null,
  clientPermission: null,
  usage: "m!sugerir <sugestão>",
  run: async (client, message, args) => {

    const argumentos = args.join(" ");
    var cor = '#' + ("000000" + Math.random().toString(16).slice(2, 8).toUpperCase()).slice(-6);

    if (!argumentos) return message.channel.send("<:atencao:759603958418767922> | Digite o que quer sugerir para a Lux sobre o bot");

    const embed = new MessageEmbed()
      .setDescription(`**${argumentos}**`)
      .setColor(cor)
      .setThumbnail(message.author.displayAvatarURL({
        dynamic: true
      }))
      .setFooter(`ID do usuário: ${message.author.id} | ${message.id}`)
      .setTimestamp()
      .setAuthor(`Sugestão de ${message.author.tag}`, message.author.displayAvatarURL({
        dynamic: true
      }));

    client.guilds.cache.get('717061688460967988').channels.cache.get('723765136648830996').send(embed).then(m =>{
       m.react('✅')
       m.react('❌')
    })
    
    if (message.deletable) message.delete()
    message.channel.send("❤️ | Mutissimo obrigada por me enviar uma sugestão <3");
  }
};