const Discord = require("discord.js");
const client = new Discord.Client();
const ayarlar = require("./ayarlar.json");
const chalk = require("chalk");
const fs = require("fs");
const moment = require("moment");
require("./util/eventLoader")(client);

var prefix = ayarlar.prefix;

const log = message => {
  console.log(`[${moment().format("YYYY-MM-DD HH:mm:ss")}] ${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./komutlar/", (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.on("message", msg => {
  if (msg.content.toLowerCase() === "sa") {
    msg.reply("Aleyküm selam,  hoş geldin ^^");
  }
});

client.elevation = message => {
  if (!message.guild) {
    return;
  }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });

client.on("warn", e => {
  console.log(chalk.bgYellow(e.replace(regToken, "that was redacted")));
});

client.on("error", e => {
  console.log(chalk.bgRed(e.replace(regToken, "that was redacted")));
});

client.on(`ready`, async () => {
  let guild = client.guilds.get(`748538476831703131`); // kanalın bulunduğu sunucu id
  let online = guild.members.filter(
    m => !m.user.bot && m.user.presence.status !== "offline"
  ).size;
  let onnl = `Toplam Üye: ${guild.members.size}\nAktif Üye: ${online}`;

  setInterval(() => {
    client.channels.get(`759003126350217237`).setTopic(
      `${onnl
        .replace(`1`, ` :one: `)
        .replace(`1`, ` :one: `)
        .replace(/2/, ` :two: `)
        .replace(/2/, ` :two: `)
        .replace(`3`, ` :three: `)
        .replace(`3`, ` :three: `)
        .replace(/4/, ` :four: `)
        .replace(/4/, ` :four: `)
        .replace(`5`, ` :five: `)
        .replace(`5`, ` :five: `)
        .replace(/6/, ` :six: `)
        .replace(/6/, ` :six: `)
        .replace(`7`, ` :seven: `)
        .replace(`7`, ` :seven: `)
        .replace(/8/, ` :eight: `)
        .replace(/8/, ` :eight: `)
        .replace(`9`, ` :nine: `)
        .replace(`9`, ` :nine: `)
        .replace(/0/, ` :zero: `)}`
    );
  }, 3000);
});

client.on("message", async msg => {
  if (msg.content.toLowerCase() === "sa") {
    await msg.react("🇦");
    msg.react("🇸");
  }
});

client.on("message", async msg => {
  if (msg.content.toLowerCase() === "selam") {
    await msg.react("🇦");
    msg.react("🇸");
  }
});

client.on("message", async msg => {
  if (msg.content.toLowerCase() === "selamın aleyküm") {
    await msg.react("🇦");
    msg.react("🇸");
  }
});

client.on("message", async msg => {
  if (msg.content.toLowerCase() === "selamun aleyküm") {
    await msg.react("🇦");
    msg.react("🇸");
  }
});

//DMMAİN
client.on("message", message => {
  if (message.channel.type === "dm") {
    if (message.author.bot) return;
    const MaSEmbed = new Discord.RichEmbed()
      .setTitle(`${client.user.username} - Dm Mesaj`)
      .setColor("RANDOM")
      .addField(`Mesajı Gönderen`, message.author.tag)
      .addField(`ID'si`, message.author.id)
      .addField(`Gönderilen Mesaj`, message.content)
      .setThumbnail(message.author.avatarURL);
    client.channels.get("765464750666547220").send(MaSEmbed);
  }
});


client.login(ayarlar.token);
