const usuario = require("../../models/user.js");

module.exports = {
    name: "inventário",
    aliases: ["inventario", "carteira", "inventory"],
    cooldown: 2,
    category: "economia",
    description: "Veja o inventário de alguém",
    usage: "m!inventário [@usuário]",
    run: async (client, message, args) => {

        let pessoa = message.mentions.users.first() || client.users.cache.get(args[0]);
        if (!pessoa) pessoa = message.author;

        let user = await usuario.findOne({ id: pessoa.id });
        if (!user) return message.channel.send("<:negacao:759603958317711371> | Este usuário não está em minha database")

        message.channel.send(`**Inventário de ${pessoa.tag}**\n\n⭐ **${user.estrelinhas}** estrelinhas\n🔑 **${user.rolls}** rolls\n<:DEMON:758765044443381780> **${user.caçados}** demônios\n<:ANGEL:758765044204437535> **${user.anjos}** anjos\n<:SEMIGOD:758766732235374674> **${user.semideuses}** semideuses\n<:God:758474639570894899> **${user.deuses}** deuses.`)
    }
}

