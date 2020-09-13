const Discord = require("discord.js");
module.exports = {
  name: "report",
  aliases: ["reportar", "bug", "bugreport", "glitch"],
  cooldown: 5,
  category: "util",
  description: "Reporte um Bug para minha Dona",
  usage: "m!report <bug>",
  run: async (client, message, args) => {
  
  const argumentos = args.join(" ");
   var cor = '#' + ("000000" + Math.random().toString(16).slice(2, 8).toUpperCase()).slice(-6);
  
  if(!argumentos) return message.reply("Encontrou um erro/bug? o que aconteceu? Dê-me detalhes");
  
    const embed = new Discord.MessageEmbed()
    .setDescription(`${argumentos}`)
    .setColor(cor)
    .setThumbnail(message.author.displayAvatarURL())
    .setFooter(`ID do usuário: ${message.author.id}`)
    .setTimestamp()
    .setAuthor(`Novo Bug Reportado por ${message.author.tag}`, message.author.displayAvatarURL());
  
  client.guilds.cache.get('717061688460967988').channels.cache.get('754786823259160657').send(embed);

  if(message.deletable) message.delete()
  message.reply("Mutissimo obrigada por reportar este bug para minha dona");
}};
