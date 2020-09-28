const { MessageEmbed } = require("discord.js");
const database = require("../../models/rpg.js");
const checks = require("../../handler/checks.js")

module.exports = {
  name: "status",
  aliases: [],
  cooldown: 10,
  category: "rpg",
  description: "Veja o status de alguém",
  usage: "m!status [@membro]",
  run: async (client, message, args) => {

    let mentioned = message.mentions.users.first() || client.users.cache.get(args[0]);
    if (!mentioned) mentioned = message.author;

    const user = await database.findById(mentioned.id)
    if(!user) return message.channel.send("<:negacao:759603958317711371> | Este usuário não está registrado como um aventureiro")

    let embed = new MessageEmbed()
    .setTitle(`📜 | Status de ${mentioned.username}`)
    .setColor('#f04682')
    .addFields([
      {
        name: `🩸 | Vida`,
        value: user.life + '/' + user.maxLife,
        inline:true
      },
      {
      name: `⚔️ | Classe`,
      value: user.class,
      inline:true
    },
    {
      name: `🛡️ | Armadura`,
      value: user.armor,
      inline:true
    },
    {
      name: `🗡️ | Dano Físico`,
      value: user.damage,
      inline:true
    }
    ,{
      name: `💧 | Mana`,
      value: user.mana + '/' + user.maxMana,
      inline:true
    },
    {
      name: `🔮 | Poder Mágico`,
      value: user.abilityPower,
      inline:true
    },
    {
      name: `⚜️ | Level`,
      value: user.level,
      inline: true
    },
    {
      name: `🔰 | XP`,
      value: `${user.xp} / ${user.nextLevelXp}`,
      inline: true
    },
    {
      name: `💎 | Pedras Magicas`,
      value: user.money,
      inline: true
    },
    {
      name: `⚗️ | Habilidade Única`,
      value: user.uniquePower.name,
      inline: true
    }
  ])
  message.channel.send(message.author, embed)    
  }};
