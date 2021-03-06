const Command = require("../../structures/command")
const moment = require("moment");
moment.locale("pt-br")

module.exports = class MarryCommand extends Command {
    constructor(client) {
        super(client, {
            name: "casar",
            aliases: ["marry"],
            category: "diversão",
            clientPermission: ["EMBED_LINKS", "ADD_REACTIONS", "MANAGE_MESSAGES"],
        })
    }
    async run({ message, args, server }, t) {

        const mencionado = message.mentions.users.first();

        if (!mencionado) return message.menheraReply("error", t("commands:marry.no-mention"))
        if (mencionado.bot) return message.menheraReply("error", t("commands:marry.bot"))
        if (mencionado.id === message.author.id) return message.menheraReply("error", t("commands:marry.self-mention"))

        const user1 = await this.client.database.Users.findOne({ id: message.author.id })

        if (user1.casado && user1.casado != "false") return message.menheraReply("error", t("commands:marry.married"))

        const user2 = await this.client.database.Users.findOne({ id: mencionado.id })

        if (!user2) return message.menheraReply("warm", t("commands:marry.no-dbuser"))

        if (user2.casado && user2.casado != "false") return message.menheraReply("error", t("commands:marry.mention-married"))

        message.channel.send(`${mencionado} ${t("commands:marry.confirmation_start")} ${message.author}? ${t("commands:marry.confirmation_end")}`).then(msg => {

            msg.react("✅")
            msg.react("❌")

            let filterYes = (reaction, usuario) => reaction.emoji.name === "✅" && usuario.id === mencionado.id;
            let filterNo = (reação, user) => reação.emoji.name === "❌" && user.id === mencionado.id;

            let yesColetor = msg.createReactionCollector(filterYes, { max: 1, time: 14500 });
            let noColetor = msg.createReactionCollector(filterNo, { max: 1, time: 14500 });

            noColetor.on("collect", co => {
                msg.reactions.removeAll().catch();
                return message.channel.send(`${mencionado} ${t("commands:marry.negated")} ${message.author}`);
            });

            yesColetor.on("collect", cp => {
                msg.reactions.removeAll().catch();
                message.channel.send(`💍${message.author} ${t("commands:marry.acepted")} ${mencionado}💍`);

                var dataFormated = moment(Date.now()).format("l LTS")

                user1.casado = mencionado.id;
                user1.data = dataFormated;

                user2.casado = message.author.id;
                user2.data = dataFormated;

                user1.save()
                user2.save()
                return
            })
        })
    }
};
