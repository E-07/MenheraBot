const Discord = require("discord.js");
const client = new Discord.Client({fetchAllMembers: true, disableEveryone: true});
const config = require("./config.json");
const fs = require("fs-extra");

const DBL = require("dblapi.js");
const dbl = new DBL(config.dbt, client);

const mongoose = require("mongoose");
mongoose.connect(config.uri, {useNewUrlParser: true, useUnifiedTopology: true }).catch(error => console.error(error));


client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.categories = fs.readdirSync("./commands/");

const cooldown = new Set();

["command"].forEach(handler => {
  require(`./handler/${handler}`)(client);
})

client.on("message", async message => {

  if (message.author.bot) return;
  if (message.channel.type === "dm") return;
  if (message.content.startsWith(`<@!${client.user.id}>`) || message.content.startsWith(`<@${client.user.id}>`)) return message.channel.send(`Oizinho, meu prefixo é '${config.prefix}'`);
  if (!message.content.startsWith(config.prefix)) return;
  if (!message.member) message.member = await message.guild.fetch(message);

  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const cmd = args.shift().toLowerCase();
  
  if(cmd.length === 0) return;

  let command = client.commands.get(cmd);
  if(!command) command = client.commands.get(client.aliases.get(cmd));

  if(command){
    if (cooldown.has(message.author.id)) {
      message.delete().catch()
      return message.reply("você está utilizando comandos rápido demais! Fica frio").then(msg => msg.delete({timeout: 3500})).catch();
    }
    
     cooldown.add(message.author.id);
     command.run(client, message, args).catch(err => {
       console.log(err);
       message.reply("Ocorreu um erro na execução desse comando... Bugs e mais bugs...")
     });
     console.log(`Comando: '${command.name}'. Autor: '${message.author.tag}' id: '${message.author.id}' | Servidor: '${message.guild.name}' ServerId: '${message.guild.id}'`);
  }
  
  setTimeout(() => {
    cooldown.delete(message.author.id)
  }, 2000)

});

client.on("guildDelete", server => {
  client.guilds.cache.get('717061688460967988').channels.cache.get('717061688729534628').send(`<:menhera_cry:744041825140211732> | Fui removida do servidor **${server}**`);
});

client.on("guildCreate", server => {
  client.guilds.cache.get('717061688460967988').channels.cache.get('717061688729534628').send(`<:apaixonada:727975782034440252> | Fui adicionada ao servidor **${server}**`);
});

client.on("ready", () => {

  let activities = [
    "Meu prefixko é m!",
    "Use m!votar para me ajudar a crescer",
    "m!ajuda [comando]",
    "Eu te amo moon",
    "A moon é tudo para a minha dona"
    ],
    i = 0;

  setInterval(() => {
    client.user.setActivity(`${activities[i++ % activities.length]}`, {
      type: "WATCHING"
    });
  }, 1000 * 60);

});

process.on('unhandledRejection', error =>	console.error('Unhandled promise rejection:', error));
process.on('warning', e => console.warn(e.stack));

//mudar para config.token para logar na menhrea
//testToken = DevBot

client.login(config.testToken);
