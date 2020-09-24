const { MessageEmbed } = require("discord.js");

const user = require("../../models/user.js");
const server = require("../../models/guild.js");

module.exports = {
    name: "top",
    aliases: ["lb", "leaders", "leaderboard", "rank"],
    cooldown: 20,
    category: "info",
    description: "Veja o top de meus usuários",
    usage: "m!top [mamadores | mamados | estrelinhas]",
    run: async (client, message, args) => {

        const prefix = await server.findOne({id: message.guild.id})

        const txt = `Você deve escolher entre \`${prefix.prefix}top mamadores\`, \`${prefix.prefix}top mamados\`, \`${prefix.prefix}top demonios\`, \`${prefix.prefix}top anjos\`, \`${prefix.prefix}top semideuses\`, \`${prefix.prefix}top deuses\` ou \`${prefix.prefix}top estrelinhas\``
        
        const argumento = args[0]; 
        if(!argumento) return message.reply(txt)

        let argsDemonios = ["demonios", "demônios", "demons"];
        let argsAnjos = ["anjos"]
        let argsSemideuses = ["semideuses", "semi-deuses", "sd"];
        let argsDeuses = ["deuses", "gods"]
        let argsMamou = ["mamou", "mamadores"];
        let argsMamados = ["mamados", "chupados"];
        let argsEstrelinhas = ["estrelinhas", "estrelinha", "stars", "star", "money", "dinheiro"];

        if(argsMamou.includes(argumento)){
            topMamadores(client, message)
        } else if(argsMamados.includes(argumento)){
            topMamados(client, message)
        } else if(argsEstrelinhas.includes(argumento)){
            topEstrelinhas(client, message)
        } else if(argsDemonios.includes(argumento)){
            topDemonios(client, message)
        } else if(argsAnjos.includes(argumento)){
            topAnjos(client, message)
        }else if(argsSemideuses.includes(argumento)){
            topSD(client, message)
        }else if(argsDeuses.includes(argumento)){
            topDeuses(client, message)
        } else message.reply(txt)

 }}

    function topMamados(client, message){

        let embed = new MessageEmbed()
        
        .setTitle("👑 | Placar de Mamados")
        .setColor('#eab3fa')

        user.find({}, ['mamadas', 'nome', 'id'], {
            skip:0, 
            limit:10, 
            sort:{ mamadas: -1}
        },
        function(err, res){
            if(err) console.log(err)

            for (i = 0; i < res.length; i++) {
                let member = client.users.cache.get(res[i].id);
                if (!member) {
                    embed.addField(`**${i + 1} -** ${res[i].nome}`, `Mamado: **${res[i].mamadas}**`, false)
                } else {
                    embed.addField(`**${i + 1} -** ${member.username}`, `Mamado: **${res[i].mamadas}**`, false)
                }
            }
            message.channel.send(message.author, embed)
        })
    }

    function topMamadores(client, message){
    
        let embed = new MessageEmbed()
        
        .setTitle("👑 | Placar de Mamadores")
        .setColor('#eab3fa')

        user.find({}, ['mamou', 'nome', 'id'], {
            skip:0, 
            limit:10, 
            sort:{ mamou: -1}
        },
        function(err, res){
            if(err) console.log(err)

            for (i = 0; i < res.length; i++) {
                let member = client.users.cache.get(res[i].id);
                if (!member) {
                    embed.addField(`**${i + 1} -** ${res[i].nome}`, `Mamou: **${res[i].mamou}**`, false)
                } else {
                    embed.addField(`**${i + 1} -** ${member.username}`, `Mamou: **${res[i].mamou}**`, false)
                }
            }
            message.channel.send(message.author ,embed)
        })
    }

    function topDemonios(client, message){
    
        let embed = new MessageEmbed()
        
        .setTitle("😈 | Placar de Demônios")
        .setColor('#ec8227')

        user.find({}, ['caçados', 'nome', 'id'], {
            skip:0, 
            limit:10, 
            sort:{ caçados: -1}
        },
        function(err, res){
            if(err) console.log(err)

            for (i = 0; i < res.length; i++) {
                let member = client.users.cache.get(res[i].id);
                if (!member) {
                    embed.addField(`**${i + 1} -** ${res[i].nome}`, `Demônios: **${res[i].caçados}**`, false)
                } else {
                    embed.addField(`**${i + 1} -** ${member.username}`, `Demônios: **${res[i].caçados}**`, false)
                }
            }
            message.channel.send(message.author ,embed)
        })
    }

    function topAnjos(client, message){
    
        let embed = new MessageEmbed()
        
        .setTitle("👼 | Placar de Anjos")
        .setColor('#bdecee')

        user.find({}, ['anjos', 'nome', 'id'], {
            skip:0, 
            limit:10, 
            sort:{ anjos: -1}
        },
        function(err, res){
            if(err) console.log(err)

            for (i = 0; i < res.length; i++) {
                let member = client.users.cache.get(res[i].id);
                if (!member) {
                    embed.addField(`**${i + 1} -** ${res[i].nome}`, `Anjos: **${res[i].anjos}**`, false)
                } else {
                    embed.addField(`**${i + 1} -** ${member.username}`, `Anjos: **${res[i].anjos}**`, false)
                }
            }
            message.channel.send(message.author ,embed)
        })
    }

    function topSD(client, message){
    
        let embed = new MessageEmbed()
        
        .setTitle("🙌 | Placar de Semi-Deuses")
        .setColor('#eab3fa')

        user.find({}, ['semideuses', 'nome', 'id'], {
            skip:0, 
            limit:10, 
            sort:{ semideuses: -1}
        },
        function(err, res){
            if(err) console.log(err)

            for (i = 0; i < res.length; i++) {
                let member = client.users.cache.get(res[i].id);
                if (!member) {
                    embed.addField(`**${i + 1} -** ${res[i].nome}`, `Semideuses: **${res[i].semideuses}**`, false)
                } else {
                    embed.addField(`**${i + 1} -** ${member.username}`, `Semideuses: **${res[i].semideuses}**`, false)
                }
            }
            message.channel.send(message.author ,embed)
        })
    }

    function topDeuses(client, message){
    
        let embed = new MessageEmbed()
        
        .setTitle("<:God:758474639570894899> | Placar de Deuses")
        .setColor('#a67cec')

        user.find({}, ['deuses', 'nome', 'id'], {
            skip:0, 
            limit:10, 
            sort:{ deuses: -1}
        },
        function(err, res){
            if(err) console.log(err)

            for (i = 0; i < res.length; i++) {
                let member = client.users.cache.get(res[i].id);
                if (!member) {
                    embed.addField(`**${i + 1} -** ${res[i].nome}`, `Deuses: **${res[i].deuses}**`, false)
                } else {
                    embed.addField(`**${i + 1} -** ${member.username}`, `Deuses: **${res[i].deuses}**`, false)
                }
            }
            message.channel.send(message.author ,embed)
        })
    }

    function topEstrelinhas(client, message){

        let embed = new MessageEmbed()
        
        .setTitle("⭐ | Placar de Estrelinhas")
        .setColor('#74bd63')

        user.find({}, ['estrelinhas', 'nome', 'id'], {
            skip:0, 
            limit:10, 
            sort:{ estrelinhas: -1}
        },
         function(err, res){
            if(err) console.log(err)

            for (i = 0; i < res.length; i++) {
                let member =  client.users.cache.get(res[i].id)
                if (!member) {
                    embed.addField(`**${i + 1} -** ${res[i].nome}`, `Estrelinhas: **${res[i].estrelinhas}**`, false)
                } else {
                    embed.addField(`**${i + 1} -** ${member.username}`, `Estrelinhas: **${res[i].estrelinhas}**`, false)
                }
            }
            message.channel.send(message.author, embed)

        })
    }
