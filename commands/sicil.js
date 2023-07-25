const Discord = require('discord.js');
const db = require('quick.db');
const settings = require("../settings.js")
const limit = new Map();
const moment = require("moment");
const ms = require('ms');
moment.locale("tr");


module.exports = {
  name: "sicil",
  aliases: [],
  async run(client, message, args) {
    let waztuhh = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
    try {
      const embed = new Discord.MessageEmbed()
        .setColor(settings.bot.BotEmbedColor)
        .setFooter({ text: settings.bot.footer})
        .setAuthor({ name: waztuhh.displayName , iconURL: waztuhh.user.displayAvatarURL({ dynamic: true })})
         
        if (!message.member.roles.cache.has(settings.moderasyon.enaltyt))
        return message.channel.send(`Bu komutu kullanabilmek için öncelikle gerekli yetkin olmalı!`).catch((err) => console.log(err)).then((e) => setTimeout(() => { e.delete(); }, 10000));
      const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.get(message.author.id);
      const member = message.guild.members.cache.get(user.id)

      var czalarım;
      if (!db.has("sicil_" + member.id)) czalarım = "Kullanıcının bir cezası bulunmuyor."
      else czalarım = "**-** " + db.get("sicil_" + member.id).join(" \n**-** ")

      const m = czalarım

      if (m.length > 2000) {
        const bir = m.slice(1, 1999)
        const iki = m.slice(1999, m.length)
        let embed3 = new Discord.MessageEmbed()
          .setDescription(`${bir}`)
          .setColor(settings.bot.BotEmbedColor)
          .setFooter({ text: `${settings.bot.footer}` })
        message.channel.send({ embeds: [embed3] })
        let embed4 = new Discord.MessageEmbed()
          .setDescription(`${iki}`)
          .setColor(settings.bot.BotEmbedColor)
          .setFooter({ text: `${settings.bot.footer}` })
        message.channel.send({ embeds: [embed4] })
      } else {
        let embed3 = new Discord.MessageEmbed()
          .setDescription(`${czalarım}`)
          .setColor(settings.bot.BotEmbedColor)
          .setFooter({ text: `${settings.bot.footer}` })
        message.channel.send({ embeds: [embed3] })
      }

    } catch (e) {
      console.log("bir sorun oldu: " + e)
    }
  }

};