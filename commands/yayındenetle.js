const ayar = require("../settings");
const Discord = require("discord.js");
const streamSchema = require('../database/stream');
const settings = require("../settings")
const moment = require('moment');
moment.locale('tr')
module.exports = {
    name: "yayındenetle",
    aliases: [],//json değilki mal cocuk js aptal velet
    async run(client, message, args) {
      const embed = new Discord.MessageEmbed()
        .setColor(settings.bot.BotEmbedColor)
        .setFooter({ text: `${settings.bot.footer}` })
        if (!message.member.roles.cache.has(settings.moderasyon.ownerrole))
        return message.channel.send(`Bu komutu kullanabilmek için öncelikle gerekli yetkin olmalı!`).catch((err) => console.log(err)).then((e) => setTimeout(() => { e.delete(); }, 10000));
  let data = await streamSchema.findOne({ guildID: message.guild.id })
    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
             if (!member) {
        if (!data || data.streams.length <= 0) return message.channel.send({ embeds: [embed.setDescription(`Bu sunucuya ait stream verisi bulunamadı!`)] }).then(x => setTimeout(() => x.delete(), 5000))
        let mapped = data.streams.map((value, index) => `\`${index+1}.\` ${message.guild.members.cache.has(value.userID) ? `<@!${value.userID}>` : `\`Bulunamadı\``} - ${message.guild.channels.cache.has(value.channel) ? `<#${value.channel}>` : `\`Bulunamadı\``} - <t:${Math.floor(value.date / 1000)}>  - **${moment.duration(value.time).format("h [Saat], m [Dakika], s [Saniye]")}**`).slice(data.streams.length > 10 ? data.streams.length - 10 : 0, data.streams.length).reverse().join('\n')
        message.channel.send({ embeds: [embed.setDescription(`${mapped}`)] })
    } else {
        if (!data || !data.streams.some(s => s.userID == member.id)) return message.channel.send({ embeds: [embed.setDescription(`Bu kullanıcıya ait stream verisi bulunamadı!`)] })
        data.streams = data.streams.filter(s => s.userID == member.id)
        let mapped = data.streams.map((value, index) => `\`${index+1}.\` <@!${value.userID}> - ${message.guild.channels.cache.has(value.channel) ? `<#${value.channel}>` : `\`Bulunamadı\``} - \`${moment(value.date).format('LLL')}\` - \`${moment.duration(value.time).format("h [Saat], m [Dakika], s [Saniye]")}\``).slice(data.streams.length > 10 ? data.streams.length - 10 : 0, data.streams.length).reverse().join('\n')
        message.channel.send({ embeds: [embed.setDescription(`${mapped}`)] })

    }
    }}