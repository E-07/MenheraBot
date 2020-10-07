const db = require("../../models/user.js");
const moment = require("moment");

moment.locale("pt-br")

module.exports = {
  name: "casar",
  aliases: ["marry"],
  cooldown: 30,
  dir: 'MarryCommand',
  category: "diversão",
  description: "Casa com alguem",
  userPermission: null,
  clientPermission: ["EMBED_LINKS", "ADD_REACTIONS", "MANAGE_MESSAGES"],
  usage: "m!casar <@menção>",

  run: async (client, message, args) => {

    const mencionado = message.mentions.users.first();

    if (!mencionado) return message.channel.send("<:negacao:759603958317711371> | Mencione o usuário com que desejas casar");
    if (mencionado.bot) return message.channel.send("<:negacao:759603958317711371> | voce não pode se casar com bots");
    if(mencionado.id === message.author.id) return message.channel.send("<:negacao:759603958317711371> | Você não pode se casar consigo mesmo :(")

    db.findOne({ id: message.author.id }, (err, user) => {
      if (err) console.log(err);
      if (user.casado && user.casado != "false") {
        return message.channel.send("<:atencao:759603958418767922> | Você já está casado!!")
      } else return casado(user, message, mencionado);
    }
    );
  }
};

function casado(user, message, mencionado) {
  db.findOne({ id: mencionado.id }, (err, men) => {
    if (err) console.log(err);
    if (!men) return message.reply("Mame este usuário para adicioná-lo à minha database")
    if (men.casado && men.casado != "false") {
      return message.channel.send("<:atencao:759603958418767922> | Este usuário já esta casado");
    } else return casar(user, message, men, mencionado);
  })
}
function casar(user, message, men, mencionado) {

  message.channel.send(`${mencionado} Aceitas se casar com ${message.author}? Você tem 15 segundos para aceitar`).then(msg => {

    msg.react("✅").catch(err => message.channel.send("Ocorreu um erro ao adicionar uma reação, serasi eu tenho permissão para tal?"));
    msg.react("❌").catch(err => message.channel.send("Ocorreu um erro ao adicionar uma reação, serasi eu tenho permissão para tal?"));

    let filter = (reaction, usuario) => reaction.emoji.name === "✅" && usuario.id === mencionado.id;
    let filter1 = (reação, user) => reação.emoji.name === "❌" && user.id === mencionado.id;

    let ncoletor = msg.createReactionCollector(filter1, { max: 1, time: 14500 });
    let coletor = msg.createReactionCollector(filter, { max: 1, time: 14500 });

    ncoletor.on("collect", co => {
      msg.reactions.removeAll().catch();
      message.channel.send(`${mencionado} negou se casar com ${message.author}`);
    });

    coletor.on("collect", cp => {
      msg.reactions.removeAll().catch();
      message.channel.send(`💍${message.author} acaba de se casar com ${mencionado}💍`);


      var resultado = moment(Date.now()).format("l LTS")


      user.casado = mencionado.id;
      user.data = resultado;

      men.casado = message.author.id;
      men.data = resultado;

      user.save().catch(err => console.log(err))
      men.save().catch(err => console.log(err))

    })
  })
}





