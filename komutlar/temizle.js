const Discord = require('discord.js');
exports.run = function(client, message, args) {
if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply(`✖️ Bu Komutu Kullanabilmek İçin **Yönetici** İznine Sahip Olmalısın! ✖️ `)
if(!args[0]) return message.channel.send("✖️ **Lütfen Silinicek Mesaj Miktarını Yazın.!** ✖️");
message.channel.bulkDelete(args[0]).then(() => {
  message.channel.send(` ${args[0]} Adet Mesajı Sildim. ✔️`).then(msg => msg.delete(5000));
})
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['temizle'],
  permLevel: 2
};

exports.help = {
  name: 'sil',
  description: '[CHAT SİLER]  Sadece YETKİLİLER KULLANIR .! ',
  usage: 'sil <silinicek mesaj sayısı>'
};