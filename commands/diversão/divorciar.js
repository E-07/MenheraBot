const db = require("../../models/user.js");

module.exports = {
  name: "divorciar",
  aliases: ["separar", "divorcio", "divórcio", "terminar"],
  cooldown: 30,
  category: "diversão",
  description: "Não quer mais ficar casado com aquele corno? Divorcie com este comando",
  usage: "m!divorciar",
  run: async (client, message, args) => {

    db.findOne({ id: message.author.id }, (err, user) => {
      if (err) console.log(err);
      if (!user) return message.reply("Mame alguém para que eu adicione-o à minha database")
      if (user.casado && user.casado != "false") {
        return divorciar(user, message, client)
      } else return message.reply("Você não está casado com ninguém")
    })
  }
};
function divorciar(user, message, client) {

  message.channel.send(`Você realmente quer se divorciar de ${client.users.cache.get(user.casado)}`).then(msg => {

    msg.react("<:positivo:759603958485614652>");
    msg.react("<:negacao:759603958317711371>");

    let filter = (reaction, usuario) => reaction.emoji.name === "<:positivo:759603958485614652>" && usuario.id === message.author.id;
    let filter1 = (reação, user) => reação.emoji.name === "<:negacao:759603958317711371>" && user.id === message.author.id;

    let ncoletor = msg.createReactionCollector(filter1, { max: 1, time: 14500 });
    let coletor = msg.createReactionCollector(filter, { max: 1, time: 14500 });

    ncoletor.on("collect", co => {
      msg.reactions.removeAll().catch();
      message.channel.send(`Ebaaa, vocês ainda estão casados`);
    });

    coletor.on("collect", cp => {
      msg.reactions.removeAll().catch();
      message.channel.send(`${message.author} acaba de se divorciar de ${client.users.cache.get(user.casado)}`);

      db.findOne({ id: user.casado }, (err, men) => {
        if (err) console.log(err);

        men.casado = "false";
        men.data = "null";
        user.casado = "false";
        user.data = "null";

        user.save().catch(err => console.log(err))
        men.save().catch(err => console.log(err))

      })

    });
  });

} 
