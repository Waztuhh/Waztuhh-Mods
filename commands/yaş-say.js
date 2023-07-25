const discord = require('discord.js')
const Discord = require('discord.js')
const settings = require("../settings.js")


module.exports = {
  name: "yaş-say",
  aliases: [],
  async run(client, message, args) {
    try {

      if (!message.member.roles.cache.has(settings.moderasyon.ownerrole))
      return message.channel.send(`Bu komutu kullanabilmek için öncelikle gerekli yetkin olmalı!`).catch((err) => console.log(err)).then((e) => setTimeout(() => { e.delete(); }, 10000));
    
      let alti = new discord.MessageButton()
        .setStyle("PRIMARY")
        .setLabel("16")
        .setCustomId("16")
      let yedi = new discord.MessageButton()
        .setStyle("PRIMARY")
        .setLabel("17")
        .setCustomId("17")
        let sekiz = new discord.MessageButton()
        .setStyle("PRIMARY")
        .setLabel("18")
        .setCustomId("18")
        let dokuz = new discord.MessageButton()
        .setStyle("PRIMARY")
        .setLabel("19")
        .setCustomId("19")
        let yirmi = new discord.MessageButton()
        .setStyle("PRIMARY")
        .setLabel("20")
        .setCustomId("20")

      const secenek = new discord.MessageActionRow({ components: [alti,yedi,sekiz,dokuz,yirmi] })
      const embeds = new Discord.MessageEmbed()
      let yas18 = message.guild.members.cache.filter(x=> x.displayName.includes("18")).size;
      let yas19 = message.guild.members.cache.filter(x=> x.displayName.includes("19")).size;
      let yas20 = message.guild.members.cache.filter(x=> x.displayName.includes("20")).size;
      let yas16 = message.guild.members.cache.filter(x=> x.displayName.includes("16")).size;
      let yas17 = message.guild.members.cache.filter(x=> x.displayName.includes("17")).size;
      let yas15 = message.guild.members.cache.filter(x=> x.displayName.includes("15")).size;
      message.reply({ content: 'Altdaki buttonlara basarak sunucuda kaçtane o yaşta olan üyeleri görürsün.', components: [secenek] }).then(msg => {


        const filter = i => i.user.id === message.author.id;
        const collector = msg.createMessageComponentCollector({ filter, time: 10000 });
        
        collector.on('collect', async i => {
        if (i.isButton()) {
            
 
          if (i.customId === '16') {
          
            
            msg.delete().catch(() => {})
            const embedss = new Discord.MessageEmbed()
              .setColor(settings.bot.BotEmbedColor)
              .setFooter({ text: `${settings.bot.footer}` })
              .setThumbnail(message.author.displayAvatarURL({ dynamic: true, size: 32 }))
              .setTimestamp() 
              .setDescription(`**Sunucumuzda Toplam 16 Yaşında: \`${yas16}\` Kişi\n Diğer Yaşlarıda Görmek İçin Komudu Bida Yazın.** `)
            message.channel.send({ embeds: [embedss] })
          }
          if (i.customId === '17') {
          
            
            msg.delete().catch(() => {})
            const embedss = new Discord.MessageEmbed()
              .setColor(settings.bot.BotEmbedColor)
              .setFooter({ text: `${settings.bot.footer}` })
              .setThumbnail(message.author.displayAvatarURL({ dynamic: true, size: 32 }))
              .setTimestamp() 
              .setDescription(`**Sunucumuzda Toplam 17 Yaşında: \`${yas17}\` Kişi\n Diğer Yaşlarıda Görmek İçin Komudu Bida Yazın.** `)
            message.channel.send({ embeds: [embedss] })
          }
          if (i.customId === '18') {
          
            
            msg.delete().catch(() => {})
            const embedss = new Discord.MessageEmbed()
              .setColor(settings.bot.BotEmbedColor)
              .setThumbnail(message.author.displayAvatarURL({ dynamic: true, size: 32 }))
              .setTimestamp()      
              .setFooter({ text: `${settings.bot.footer}` })
              .setDescription(`**Sunucumuzda Toplam 18 Yaşında: \`${yas18}\` Kişi\n Diğer Yaşlarıda Görmek İçin Komudu Bida Yazın.** `)
            message.channel.send({ embeds: [embedss] })
          }
          if (i.customId === '19') {
          
            
            msg.delete().catch(() => {})
            const embedss = new Discord.MessageEmbed()
              .setColor(settings.bot.BotEmbedColor)
              .setFooter({ text: `${settings.bot.footer}` })
              .setThumbnail(message.author.displayAvatarURL({ dynamic: true, size: 32 }))
              .setTimestamp() 
              .setDescription(`**Sunucumuzda Toplam 19 Yaşında: \`${yas19}\` Kişi\n Diğer Yaşlarıda Görmek İçin Komudu Bida Yazın.** `)
            message.channel.send({ embeds: [embedss] })
          }
          if (i.customId === '20') {
         
           
            msg.delete().catch(() => {})
            const embeds = new Discord.MessageEmbed()
              .setColor(settings.bot.BotEmbedColor)
              .setFooter({ text: `${settings.bot.footer}` })
              .setThumbnail(message.author.displayAvatarURL({ dynamic: true, size: 32 }))
              .setTimestamp() 
              .setDescription(`**Sunucumuzda Toplam 20 Yaşında: \`${yas20}\` Kişi\n Diğer Yaşlarıda Görmek İçin Komudu Bida Yazın.** `)
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