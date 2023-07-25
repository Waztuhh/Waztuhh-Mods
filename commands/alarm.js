const Discord = require('discord.js');
const  { MessageEmbed } = require("discord.js")
const ms = require('ms');
const settings = require("../settings.js")

module.exports = {
  name: "alarm",
  aliases: ["hatırlat"],
  async run(client, message, args) {
    let waztuhh = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
    const embed = new MessageEmbed()
    .setFooter({ text: settings.bot.footer})
    .setAuthor({ name: waztuhh.displayName , iconURL: waztuhh.user.displayAvatarURL({ dynamic: true })})
        .setThumbnail(message.author.displayAvatarURL({ dynamic: true, size: 1024 }))
        .setTimestamp()

    let süre = args[0]

    if (!süre) return message.channel.send({ embeds: [embed.setDescription("\`.alarm (1s,1m,1s) [HATIRLATACAĞIM ŞEY]\`")] })

    let alarm = args.slice(1).join(' ')

    if (!alarm) return message.channel.send({ embeds: [embed.setDescription(".alarm <1h,1m,1s> <hatırlatacağım şey>")] })

    message.channel.send({ embeds: [embed.setDescription(`Alarm Kuruldu **${süre}** süre Sonra Size Bildireceğim`)] })

    setTimeout(() => {

      message.channel.send(`<@${message.author.id}>, Hatırlatmamı İstediğin Şeyin Zamanı Geldi  **${alarm}**`);

    }, ms(süre));
  }
}