const discord = require('discord.js')
const Discord = require('discord.js')
const settings = require("../settings.js")


module.exports = {
  name: "vip",
  aliases: [],
  async run(client, message, args) {
    try {

      if (!message.member.roles.cache.has(settings.moderasyon.enaltyt))
      return message.channel.send(`Bu komutu kullanabilmek için öncelikle gerekli yetkin olmalı!`).catch((err) => console.log(err)).then((e) => setTimeout(() => { e.delete(); }, 10000));

      let lock = new discord.MessageButton()
        .setStyle("PRIMARY")
        .setLabel("ver")
        .setCustomId("ver")
      let unlock = new discord.MessageButton()
        .setStyle("PRIMARY")
        .setLabel("al")
        .setCustomId("al")
      const secenek = new discord.MessageActionRow({ components: [lock, unlock] })
      const embeds = new Discord.MessageEmbed()
      let uye = message.mentions.members.first() || message.guild.members.cache.get(args[0])
      if (!uye) return message.reply(`${message.author}, Bir Kullanıcı Etiketlemelisin. Etiketlemediğin İçin İşlemi Gerçekleştiremiyorum.`)
      message.channel.send({ content: 'Vip Rolünü Kullanıcıya Vermek İçin **Ver Butonuna**, Almak İçin **Al**, Butonuna Basınız. Seçiniz.', components: [secenek] }).then(msg => {


        const filter = i => i.user.id === message.author.id;
        const collector = msg.createMessageComponentCollector({ filter, time: 10000 });
        
        collector.on('collect', async i => {
        if (i.isButton()) {
            
          if (i.customId === 'ver') {
            uye.roles.add("990091638607081489")
            
            msg.delete().catch(() => {})
            const embedss = new Discord.MessageEmbed()
              .setColor(settings.bot.BotEmbedColor)
              .setFooter({ text: `${settings.bot.footer}` })
              .setDescription(`${uye} Adlı Kişiye Vip Rolü Verildi.`)
            message.channel.send({ embeds: [embedss] })
          }
          if (i.customId === 'al') {
            uye.roles.remove("990091638607081489")
           
            msg.delete().catch(() => {})
            const embeds = new Discord.MessageEmbed()
              .setColor(settings.bot.BotEmbedColor)
              .setFooter({ text: `${settings.bot.footer}` })
              .setDescription(`${uye} Adlı Kişiye Vip Rolü Alındı.`)
            message.channel.send({ embeds: [embeds] })
          }
          }
        });

        

      })
    } catch (e) {
      console.log(e)
      const embedss = new Discord.MessageEmbed()
        .setColor(settings.bot.BotEmbedColor)
        .setFooter({ text: `${settings.bot.footer}` })
        .setDescription(`Sistemsel bir sorun oluştu`)
      message.channel.send({ embeds: [embedss] })
    }
}}