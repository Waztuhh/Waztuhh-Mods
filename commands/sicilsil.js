const Discord = require("discord.js");
const { promisify } = require("util");
const readdir = promisify(require("fs").readdir);
const fs = require("fs");
const db = require("quick.db");
const settings = require("../settings.js")

module.exports = {
  name: "siciltemizle",
  aliases: ["sizil-sil","sicilsil","af","sicilsik"],
  async run(client, message, args) {
    try {
     
      if (!message.member.roles.cache.has(settings.moderasyon.genelyt) && !message.member.permissions.has(8)) return message.reply({ embeds: [embed.setDescription(`Komutu kullanmak için geçerli yetkin olmalı!`)] }).catch((err) => console.log(err), client.tick(message)).then((e) => setTimeout(() => { e.delete(); }, 10000));
    let member = message.mentions.users.first() || message.guild.members.cache.get(args[0]);
if(db.get(`sicil_${member.id}`)){
let embedd = new Discord.MessageEmbed()
.setColor(settings.bot.BotEmbedColor)
.setFooter({ text: settings.bot.footer})
.setAuthor({ name: waztuhh.displayName , iconURL: waztuhh.user.displayAvatarURL({ dynamic: true })})
.setDescription(`Bu kullanıcıda sicil falan bırakmadım amına koydum`)
.setThumbnail(message.guild.iconURL({ dymaic: true}))
.setTimestamp()
message.channel.send({embeds: [embedd]})
    client.channels.cache.get(`${settings.channels.düşmelog}`).send({embeds: [embedd]})
db.delete(`sicil_${member.id}`)
} else {
let embedd = new Discord.MessageEmbed()
.setColor(settings.bot.BotEmbedColor)
.setFooter({ text: settings.bot.footer})
.setAuthor({ name: waztuhh.displayName , iconURL: waztuhh.user.displayAvatarURL({ dynamic: true })})
.setDescription(`Bu kullanıcıda sicil zaten yok orospu çocugu kör`)
.setThumbnail(message.guild.iconURL({ dymaic: true}))
.setTimestamp()
message.channel.send({embeds: [embedd]})
  message.channel.send({embeds: [embedd]})
  client.channels.cache.get(`${settings.channels.düşmelog}`).send({embeds: [embedd]})
}
    
  } catch (e) {
      console.log("bir sorun oldu: " + e)
  }    
}
}
