const { MessageEmbed } = require("discord.js")
const settings = require("../settings.js")
const db = require('quick.db');
const ms = require('ms');

module.exports = {
  name: "nerede",
  aliases: [],
  async run(client, message, args) {
let guild = message.guild
let embed = new MessageEmbed()
let author = message.author
let channel = message.channel

 let on = `açık`
    let off = `kapalı`
    
let member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
if (!message.member.roles.cache.has(settings.bot.ownerrole) && !message.member.permissions.has(8)) return message.reply({ embeds: [embed.setDescription(`Komutu kullanmak için geçerli yetkin olmalı!`)] }).catch((err) => console.log(err)).then((e) => setTimeout(() => { e.delete(); }, 10000));

if(!member) return message.reply({ embeds: [embed.setDescription(`Geçerli bir kullanıcı belirtmelisin.`)] }).catch((err) => console.log(err)).then((e) => setTimeout(() => { e.delete(); }, 10000));
    let kanal = member.voice.channel
    if(!kanal) return message.reply({ embeds: [embed.setDescription(`${member} kullanıcısı herhangi bir sesli kanalda bulunmuyor.`)] }).catch((err) => console.log(err)).then((e) => setTimeout(() => { e.delete(); }, 10000));
let microphone = member.voice.selfMute ? "kapalı" : "açık";
let headphones = member.voice.selfDeaf ? "kapalı" : "açık";
let sestekiler = message.guild.channels.cache.get(kanal.id).members.map(x => x.user).join(", ")
    let yayın = member.voice.streaming ? on : off
    let cam = member.voice.selfVideo ? on : off
    let kanalinfo = member.voice.channel.userLimit

      const giriş = db.get(`sesgiris_${member.id}`)
      const çıkış = Date.now()
      const toplam = çıkış - giriş
      const sonuç = toplam / 1000
      const düzen = await Math.floor(sonuç)

      const bitiş = ms(toplam, { long: true })
        .replace("seconds", "Saniye")
        .replace("minutes", "Dakika")
        .replace("hours", "Saat")
        .replace("day", "Gün")

      
kanal.createInvite().then(invite =>
    message.reply({ embeds: [embed.setColor(settings.bot.BotEmbedColor).setFooter({ text: `${settings.bot.footer}` }).setDescription(`${member} kullanıcısı \`${kanal.name}\` kanalında bulunmakta.

\`Mikrofon Durumu:\` ${microphone}
\`Kulaklık Durumu:\` ${headphones}
\`Yayın Durumu:\` ${yayın}
\`Kamera Durumu:\` ${cam}
\`Kanal Bilgisi:\` ${kanalinfo} ${sestekiler}

\`Ses Verisi:\` ${bitiş}

[Kanala bağlanmak için tıkla!](https://discord.gg/${invite.code})`)] }));
        

    }
}