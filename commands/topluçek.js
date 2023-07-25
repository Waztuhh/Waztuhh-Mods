const { MessageEmbed } = require("discord.js")
const ayar = require('../settings.js')
const Discord = require("discord.js");
const settings = require("../settings.js")
module.exports = {
  name: "toplu",
  aliases: ["topluçek","toplucek","tç"],
  async run(client, message, args) {
    let waztuhh = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
    const embed = new MessageEmbed()
        
        .setFooter({ text: settings.bot.footer})
        .setAuthor({ name: waztuhh.displayName , iconURL: waztuhh.user.displayAvatarURL({ dynamic: true })})
        .setThumbnail(message.author.displayAvatarURL({ dynamic: true, size: 64 }))
        .setColor(settings.bot.BotEmbedColor)
        .setTimestamp()
        if (!message.member.roles.cache.has(settings.moderasyon.ownerrole))
        return message.channel.send(`Bu komutu kullanabilmek için öncelikle gerekli yetkin olmalı!`).catch((err) => console.log(err)).then((e) => setTimeout(() => { e.delete(); }, 10000));
    let cmd = args[0];
    let channel = message.guild.channels.cache.get(args[1]);

    if (cmd == "taşı") {
        if (!message.member.voice.channel) return message.reply({ embeds: [embed.setDescription(`${message.author} Lütfen Bir Ses Kanalına Bağlanıp Tekrar Deneyin.`)] })
        if (message.member.voice.channel.members.size <= 1) return message.reply({ embeds: [embed.setDescription(`${message.author} Bulunmakta Olduğunuz Ses Odasında Yanlızca **1** Kişi Bulunmakta Ondan Dolayı İşlemi Yapamam.`)] })
        let members = message.member.voice.channel.members.map(x => x)
        if (!channel) return message.reply({ embeds: [embed.setDescription(`${message.member}, Bir kanal ID belirt.`)] })
        members.forEach(async m => {
            m.voice.setChannel(channel.id).catch(e => {});
        })
        message.reply({ embeds: [embed.setDescription(`**${message.member.voice.channel.members.size}** Adet kullanıcı ${channel} kanalına taşındı!`)] })
    } else if (cmd == "çek") {
        if (!message.member.voice.channel) return message.reply({ embeds: [embed.setDescription(`${message.author} Lütfen Bir Ses Kanalına Bağlanıp Tekrar Deneyin.`)] })
        if (!channel) return message.reply({ embeds: [embed.setDescription(`${message.member}, Bir kanal ID belirt.`)] })
        let members = channel.members.map(x => x)
        members.forEach(async m => {
            m.voice.setChannel(message.member.voice.channel.id).catch(e => {});
        })
        message.reply({ embeds: [embed.setDescription(`**${channel.members.size}** Adet kullanıcı ${message.member.voice.channel} kanalına taşındı!`)] })

    } else {
      message.reply({ embeds: [embed.setDescription(`
**TOPLU TAŞIMA/ÇEKME KOMUTLARI**

> **${ayar.bot.botPrefix}toplu çek** Belirttiğiniz kanaldaki üyeleri sizin kanalınıza taşır.
> 
> **${ayar.bot.botPrefix}toplu taşı** Sizin kanalınızdaki üyeleri belirttiğiniz kanala taşır.
`)] }).setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true }))
    }
}


}