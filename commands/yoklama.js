const Discord = require("discord.js")
const settings = require("../settings.js");
const ayar = require('../settings.js')
module.exports = {
    name: "katıldı-yoklama",
    aliases: ["katıldıyoklama","katildiyoklama","katildi-yoklama","ky"],//json değilki mal cocuk js aptal velet
    async run(client, message, args) {
      const embed = new Discord.MessageEmbed()
        .setColor(settings.bot.BotEmbedColor)
        .setFooter({ text: `${settings.bot.footer}` })


       
        if (!message.member.roles.cache.has(settings.moderasyon.ownerrole))
        return message.channel.send(`Bu komutu kullanabilmek için öncelikle gerekli yetkin olmalı!`).catch((err) => console.log(err)).then((e) => setTimeout(() => { e.delete(); }, 10000));
            if (!message.member.voice.channel || message.member.voice.channel.id != ayar.kanallar.meeting) return message.reply({ embeds: [embed.setDescription(`Bu komutu kullanabilmek için toplantı ses kanalında bulunmalısın.`)] })
            let enaltyt = message.guild.roles.cache.get(ayar.moderasyon.enaltyt)
            let katıldı = ayar.moderasyon.katıldı
            let uyeler = message.guild.members.cache.filter(s => s.roles.highest.position >= enaltyt.position);
            uyeler.map(x => x).forEach(async(member) => {
                if (member.voice.channel && member.voice.channel.id == ayar.kanallar.meeting && !member.roles.cache.has(katıldı)) await member.roles.add(katıldı).catch(e => {});
                if (!member.voice.channel || member.voice.channel && member.voice.channel.id != ayar.kanallar.meeting && member.roles.cache.has(ayar.moderasyon.katıldı)) await member.roles.remove(katıldı).catch(e => {});
            })
            message.channel.send({ embeds: [embed.setDescription(`
        > **${uyeler.filter(s => s.voice.channel && s.voice.channel.id == ayar.kanallar.meeting && !s.roles.cache.has(katıldı)).size}** Adet kullanıcıya katıldı rolü verilecek.
        > **${uyeler.filter(s => !s.voice.channel && s.roles.cache.has(katıldı) || s.voice.channel &&  s.voice.channel.id == ayar.kanallar.meeting && s.roles.cache.has(katıldı)).size}** Adet kullanıcıdan katıldı rolü alınacak.
        `)] })
        message.client.channels.cache.get(`${ayar.moderasyon.katıldılog}`).send({ embeds: [embed.setDescription(`> **${uyeler.filter(s => s.voice.channel && s.voice.channel.id == ayar.channels.meeting && !s.roles.cache.has(ayar.roles.katıldı)).size}** Adet kullanıcıya katıldı rolü verilecek.
        > **${uyeler.filter(s => !s.voice.channel && s.roles.cache.has(katıldı) || s.voice.channel &&  s.voice.channel.id == ayar.kanallar.meeting && s.roles.cache.has(katıldı)).size}** Adet kullanıcıdan katıldı rolü alınacak.
        `)] })
        
        }}