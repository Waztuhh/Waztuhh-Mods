const Discord = require('discord.js');
const db = require('quick.db');
const settings = require("../settings.js")
const limit = new Map();
const moment = require("moment");
moment.locale("tr");


module.exports = {
  name: "unmute",
  aliases: [],
  async run(client, message, args) {
    try {
      const embed = new Discord.MessageEmbed()
        .setColor(settings.bot.BotEmbedColor)
        .setFooter({ text: `${settings.bot.footer}` })

        if (!message.member.roles.cache.has(settings.moderasyon.jailstaff))
        return message.channel.send(      
          `Bu komutu kullanabilmek için öncelikle gerekli yetkin olmalı!`
        );
      let guild = message.guild
      let member = message.member
      let user = message.mentions.users.first() || guild.members.cache.get(args[0]);
      let members = message.guild.members.cache.get(user.id);
      if (!user) return message.reply({ embeds: [embed.setDescription('Öncelikle mutesini kaldırmak istedigin kullanıcıyı belirtmelisin.')] }).catch((err) => console.log(err)).then((e) => setTimeout(() => { e.delete(); }, 10000));
      if (!message.member.permissions.has("ADMINISTRATOR") && member && member.roles.highest.position >= message.member.roles.highest.position) return message.reply({ embeds: [embed.setDescription("Kendinle aynı yetkide ya da daha yetkili olan birini yasaklayamazsın!")] })


    if (!user.roles.cache.has(settings.moderasyon.jailrol)) {
      const embedss = new Discord.MessageEmbed()
        .setColor(settings.bot.BotEmbedColor)
        .setFooter({ text: settings.bot.footer})
        .setDescription(`Bu kullanıcı zaten muteli degil?`)
      return message.channel.send({ embeds: [embedss] })
    } else {
  
      let members = message.guild.members.cache.get(user.id);
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
        .setDescription(`${members}, Kullanıcısının mutesini kaldırmak istiyormusunuz?`)
      message.channel.send({ embeds: [embeds], components: [buttonlar] }).then(msg => {
        const filter = (i) => i.message.id === msg.id;
        const collector = message.channel.createMessageComponentCollector({ filter, time: 15000 });
        collector.on('collect', async b => {
        

          if (b.user.id !== message.member.id) return message.channel.send("<@" + b.user.id + "> Bu Butona Sadece Komutu Kullanan Basabilir.")

          if (b.isButton()) {
            if (b.customId === "onay") {



              if (user.roles.cache.has(settings.moderasyon.jailrol)) {

              msg.delete().catch((err) => { })
              message.reply({ embeds: [embed.setDescription(`${members ? members.toString() : members.username} - \`(${members.id})\` kullanıcısı ${message.author} tarafından mutesi kaldırıldı.`)] }).catch((err) => console.log(err)).then((e) => setTimeout(() => { e.delete(); }, 6000))

              client.channels.cache.get(settings.moderasyon.jaillog).send({
                embeds: [embed.setDescription(`     
    ${members ? members.toString() : members.username} sunucuda mutesi kaldırıldı.
    Kullanıcı: ${members ? members.toString() : ""} - \`(${members.id})\`
    Yetkili: ${message.author} - \`(${message.author.id})\`
    Tarih: \`${moment(Date.now()).format("LLL")}\``)]
              });

              members.roles.remove(`${settings.moderasyon.muterol}`)
               }
            }
            if (b.customId === "red") {
              msg.delete()
              message.channel.send(`İşlem başarıyla iptal edildi.`)
            }

          }
        })
      })
      }
    } catch (e) {
      console.log("bir sorun oldu: " + e)
    }
  }

};