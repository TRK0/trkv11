const chalk = require('chalk');
const moment = require('moment');
const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');

module.exports = client => {

  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] CodeWorld: Aktif Komutlarım Yüklendi! //TRK`);
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] CodeWorld: ${client.user.username} İsmi İle Discorda Bağlandım! //TRK`);
  client.user.setStatus("dnd");
   var oyun = [

        "💛💙",
        "💛💙",
       
     

       
 
   ];
  setInterval(function() {

        var random = Math.floor(Math.random()*(oyun.length-0+1)+0);

        client.user.setActivity(oyun[random], "idle"); 
        }, 2 * 9000); //Değişim süresini buradan ayarlayabilirsiniz şuan 2 saniyede bir değişiyor
}