const {Client, Collection} = require("discord.js");
const client = new Client({fetchAllMembers: true, disableMentions: "everyone"});
const config = require("./config.json");
const Sentry = require("@sentry/node");
const fs = require("fs-extra");
const mongoose = require("mongoose");
mongoose.connect(config.uri, {useNewUrlParser: true, useUnifiedTopology: true }).catch(error => console.error(error));

client.commands = new Collection();
client.aliases = new Collection();
client.categories = fs.readdirSync("./commands/");


["command", "events"].forEach(handler => {
  require(`./handler/${handler}`)(client);
})

Sentry.init({ dsn: config.sentry_dns});

  /*   
    process.__defineGetter__('stdout', function() { return fs.createWriteStream('../logs/logs.log', {flags:'a'})})
    process.__defineGetter__('stderr', function() { return fs.createWriteStream('../logs/error.log', {flags:'a'}) })
  */

process.on('unhandledRejection', (reason, promise) => {
  console.log('[UNHANDLED] ', reason.stack || reason)
  Sentry.captureException(reason);
})

client.login(config.token);
