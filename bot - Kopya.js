const Discord = require("discord.js");
const client = new Discord.Client();
const ayarlar = require("./ayarlar.json");

var prefix = ayarlar.prefix;

client.on("ready", () => {
  console.log(`BOT: ${client.user.username} adı ile giriş yaptı!`);
});

client.login(ayarlar.token);
