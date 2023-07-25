const Discord = require('discord.js');
const db = require('quick.db');
const settings = require("../settings.js")
const limit = new Map();
const moment = require("moment");
moment.locale("tr");


module.exports = {
  name: "unban",
  aliases: [],
  async run(client, message, args) {
    try {
      let waztuhh = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
    const embed = new Discord.MessageEmbed()
      .setColor(settings.bot.BotEmbedColor)
      .setFooter({ text: settings.bot.footer})
      .setAuthor({ name: waztuhh.displayName , iconURL: waztuhh.user.displayAvatarURL({ dynamic: true })})

    if (!message.member.roles.cache.has(settings.moderasyon.banstaff) && !message.member.permissions.has(8)) return message.reply({ embeds: [embed.setDescription(`Bu komutu kullanabilmek için öncelikle gerekli yetkin olmalı!`)] }).catch((err) => console.log(err)).then((e) => setTimeout(() => { e.delete(); }, 10000));
    let guild = message.guild
    let member = message.member
    let user = args[0]
    let reason = args.slice(1).join(' ');
    if (!user) return message.reply({ embeds: [embed.setDescription('Öncelikle banı kaldırılacak kullanıcıyı belirtmelisin.')] }).catch((err) => console.log(err)).then((e) => setTimeout(() => { e.delete(); }, 10000));
    if (isNaN(user)) return message.channel.send(`Bu bir kullanıcı id degil.`)

    const waztuh = await client.fetchBan(message.guild, args[0]);
    if (!waztuh) 
    {
    message.channel.send({ content:"Girmiş olduğunuz kullanıcı banlı değil!"}).then((e) => setTimeout(() => { e.delete(); }, 5000));
    return } else {
    const buttonlar = new Discord.MessageActionRow()
      .addComponents(
        new Discord.MessageButton()
          .setCustomId("onay")
          .setLabel("Onayla")
          .setStyle("SUCCESS")
      )
      .addComponents(
        new Discord.MessageButton()
          .setCustomId("red")
          .setLabel("Reddet")
          .setStyle("DANGER")
      );


    const embeds = new Discord.MessageEmbed()
      .setColor(settings.bot.BotEmbedColor)
      .setFooter(`${settings.bot.footer}`)
      .setDescription(`<@${user}>, Kullanıcısının banını açmak istedigine eminmisiniz?`)
    message.channel.send({ embeds: [embeds], components: [buttonlar] }).then(msg => {
      const filter = (i) => i.message.id === msg.id;
      const collector = message.channel.createMessageComponentCollector({ filter, time: 15000 });
      collector.on('collect', async b => {

        if (b.user.id !== message.member.id) return message.channel.send("<@" + b.user.id + "> Bu Butona Sadece Komutu Kullanan Basabilir.")

        if (b.isButton()) {
          if (b.customId === "onay") {

            msg.delete()
            message.guild.members.unban(user)
            message.reply({ embeds: [embed.setDescription(`**<@${user}>** - \`(${user})\` kullanıcısının banı ${message.author} tarafından açıldı.`)] }).catch((err) => console.log(err)).then((e) => setTimeout(() => { e.delete(); }, 6000))

            client.channels.cache.get(settings.moderasyon.banlog).send({
              embeds: [embed.setDescription(`     
    <@${user}> sunucu banı açıldı.
    Kullanıcı: <@${user}> - \`(${user})\`
    Yetkili: ${message.author} - \`(${message.author.id})\`
    Tarih: \`${moment(Date.now()).format("LLL")}\``)]
            });
          }
          if (b.customId === "red") {
            msg.delete()
            message.channel.send(`İşlem başarıyla iptal edildi.`)
          }

        }
      })
    })}
       } catch (e) {
         console.log("bir sorun oldu: " + e)
       }
    }
};