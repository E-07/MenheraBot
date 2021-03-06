const Command = require("../../structures/command")
const { MessageEmbed } = require("discord.js")
module.exports = class ShipCommand extends Command {
    constructor(client) {
        super(client, {
            name: "ship",
            category: "diversão",
            clientPermissions: ["EMBED_LINKS"]
        })
    }
    async run({ message, args, server }, t) {

        if (!args[0]) return message.menheraReply("error", t("commands:ship.missing-args"))
        if (!args[1]) return message.menheraReply("error", t("commands:ship.missing-args"))

        let user1;
        let user2;

        try {
            user1 = await this.client.users.fetch(args[0].replace(/[<@!>]/g, ""))
            user2 = await this.client.users.fetch(args[1].replace(/[<@!>]/g, ""))
        } catch {
            return message.menheraReply("error", t("commands:ship.unknow-user"))
        }

        if (!user1) return message.menheraReply("error", t("commands:ship.no-dbuser"))
        if (!user2) return message.menheraReply("error", t("commands:ship.no-dbuser"))

        let value1 = await this.client.database.Users.findOne({ id: user1.id })
        let value2 = await this.client.database.Users.findOne({ id: user2.id })
        if (!value1) return message.menheraReply("error", t("commands:ship.no-dbuser"))
        if (!value2) return message.menheraReply("error", t("commands:ship.no-dbuser"))

        if (!value1.shipValue || value1.shipValue === 0) {
            value1.shipValue = Math.floor(Math.random() * 55)
            value1.save()
        }
        if (!value2.shipValue || value2.shipValue === 0) {
            value2.shipValue = Math.floor(Math.random() * 55)
            value2.save()
        }
        let value = Number(value1.shipValue) + Number(value2.shipValue)
        if (Number(value) >= 100) {
            value = 100
        }

        let username1 = user1.username
        let username2 = user2.username
        let mix = `${username1.substring(0, username1.length / 2) + username2.substring(username2.length / 2, username2.length)}`.replace(" ", "")

        let embed = new MessageEmbed()
            .setTitle(`${username1} + ${username2} = ${mix}`)
            .setThumbnail('https://i.imgur.com/VGSDWLO.png')
            .setDescription(`\n${t("commands:ship.value")} **` + value.toString() + `%**\n\n${t("commands:ship.default")}`)

        if (Number(value) >= 25) embed.setColor('#cadf2a').setThumbnail('https://i.imgur.com/16kRzaC.png').setDescription(`\n${t("commands:ship.value")} **` + value.toString() + `%**\n\n${t("commands:ship.low")}`)
        if (Number(value) >= 50) embed.setColor('#d8937b').setThumbnail('https://i.imgur.com/XkMVoiE.png').setDescription(`\n${t("commands:ship.value")} **` + value.toString() + `%**\n\n${t("commands:ship.ok")}`)
        if (Number(value) >= 75) embed.setColor('#f34a4a').setThumbnail('https://i.imgur.com/XkMVoiE.png').setDescription(`\n${t("commands:ship.value")} **` + value.toString() + `%**\n\n${t("commands:ship.medium")}`)
        if (Number(value) >= 99) embed.setColor('#ec2c2c').setThumbnail('https://i.imgur.com/JBVskmZ.png').setDescription(`\n${t("commands:ship.value")} **` + value.toString() + `%**\n\n${t("commands:ship.high")}`)
        if (Number(value) == 100) embed.setColor('#ff00df').setThumbnail('https://i.imgur.com/6dC8HVg.png').setDescription(`\n${t("commands:ship.value")} **` + value.toString() + `%**\n\n${t("commands:ship.perfect")}`)

        message.channel.send(`${message.author}\n**${t("commands:ship.message-start")}**`, embed)
    }
}