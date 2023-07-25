const { MessageEmbed, Discord, MessageActionRow, MessageButton } = require('discord.js')
const moment = require("moment");
const db = require("quick.db");
const settings = require("../settings.js")
const axios = require('axios');
const ms = require('ms');


module.exports = {
  name: "stat",
  aliases: ["profil"],
  usage: `${settings.bot.botPrefix}me [@Waztuhh/ID]`,
  kategori: "kullanıcı",
  async run(client, message, args) {

    try {


      if (db.fetch(`cooldawn.${message.author.id}`) > Date.now() && !message.member.permissions.has("ADMINISTRATOR")) {
        return message.channel.send(`Bu komudu 1 dakikada bir kullanabilirsin.`)
      } else {


        const buttonlar = new MessageActionRow()
          .addComponents(
            new MessageButton()
              .setCustomId("anasayfa")
              .setLabel("Anasayfa")
              .setStyle("DANGER") 
          )
          .addComponents(
            new MessageButton()
              .setCustomId("avatar")
              .setLabel("Avatar")
              .setStyle("PRIMARY")
          )
          .addComponents(
            new MessageButton()
              .setCustomId("banner")
              .setLabel("Banner")
              .setStyle("PRIMARY")
          )
          .addComponents(
            new MessageButton()
              .setCustomId("cezalar")
              .setLabel("Cezalar")
              .setStyle("PRIMARY")
          )
          .addComponents(
            new MessageButton()
              .setCustomId("katilim")
              .setLabel("Katılım Sırası")
              .setStyle("PRIMARY")
          );
 
        const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.get(message.author.id);


        if (!user) return message.channel.send({ embeds: [new MessageEmbed().setDescription(`${message.author}, Hey Birini Etiketlemeden İşlem Yapamam.`).setFooter(settings.bot.footer).setTimestamp().setAuthor(message.author.tag, message.member.user.avatarURL({ dynamic: true })).setColor('RANDOM')] })
          .then(msg => { setTimeout(() => { msg.delete() }, 5000) })
        let member = message.guild.members.cache.get(user.id)
        let date = Math.floor(member.joinedTimestamp / 1000)
        let formatedDate = `<t:${date}:F>`
        var i = 1



        var czalarım;
        if (!db.has("sicil_" + member.id)) czalarım = "Henüz Bir Cezanız Bulumuyor."
        else czalarım = "**-** " + db.get("sicil_" + member.id).join(" \n**-** ")



        var msgverihafta;
        var msgveriay;
        if (!db.has("msgsa_" + member.id)) msgverihafta = "0"
        else msgverihafta = db.get("msgsa_" + member.id).filter(x => x > Date.now() - 1000 * 60 * 60 * 24 * 7).length

        if (!db.has("msgsa_" + member.id)) msgveriay = "0"
        else msgveriay = db.get("msgsa_" + member.id).filter(x => x > Date.now() - 1000 * 60 * 60 * 24 * 30).length


        var haftass;
        var ayss;
        if (!db.has("sessa_" + member.id)) haftass = "0"
        else haftass = db.get("sessa_" + member.id).filter(x => x > Date.now() - 1000 * 60 * 60 * 24 * 7).length

        if (!db.has("sessa_" + member.id)) ayss = "0"
        else ayss = db.get("sessa_" + member.id).filter(x => x > Date.now() - 1000 * 60 * 60 * 24 * 30).length

        let sessn = db.get(`sessn_${member.id}`) || ["Bulunamadı"]
        let sesler = `<#${db.get(`ensonses_${member.id}`)}>` || ["Bu üyenin ses verisi yok"]

        var sessonuch;

        if (!db.has("sessn_" + member.id)) sessonuch = `Bu üyenin ses verisi bulunamadı.`
        else {
          sessonuch = `${sesler}`
        }


        const embed = new MessageEmbed()
          .setColor(settings.bot.BotEmbedColor)
          .setFooter(`${settings.bot.footer}`)
          .setDescription(`${member} üyesinin ${formatedDate} tarihinden itibaren ` + "``"
            + message.guild.name + "``" + ` sunucusundaki verilerin işlenmiştir.`)
          .addFields(
            { name: 'Toplam Mesaj', value: '```yaml' + `\n${db.get(`msg_${member.id}`) || "0"} Mesajın Bulunmakta.\n` + '```', inline: true },
            { name: 'Haftalık Mesaj', value: '```yaml' + `\n${msgverihafta || "0"} Mesajın Bulunmakta.\n` + '```', inline: true },
            { name: 'Aylık', value: '```yaml' + `\n${msgveriay || "0"} Mesajın Bulunmakta.\n` + '```', inline: true },

          )
          .addFields(
            { name: 'Toplam Ses Aktifligi', value: '```fix' + `\n${db.get(`sesaktif_${member.id}`) || "0"} Ses Girişin Bulunmakta.\n` + '```', inline: true },
            { name: 'Son 1 Haftalık Ses', value: `\`\`\`fix\n${haftass} Adet Kanal Giriş Yapmışsın\n\`\`\``, inline: true },
            { name: 'Son 1 Aylık Ses', value:  `\`\`\`fix\n${ayss} Adet Kanal Giriş Yapmışsın\n\`\`\` `, inline: true },
          )
          .addFields(
            { name: 'En Son Girdigi Ses Kanalı', value: `${sessonuch}` },
         
          )
    
        message.channel.send({ embeds: [embed], components: [buttonlar] }).then(msgss => {


          db.set(`cooldawn.${message.author.id}`, Date.now() + require('ms')('1m'));


          const filter = (i) => i.message.id === msgss.id;
          const collector = message.channel.createMessageComponentCollector({ filter, time: 30000 });
          collector.on('collect', async b => {
           

            if (b.user.id !== message.member.id) return message.channel.send("<@" + b.user.id + "> Bu Butona Sadece Komutu Kullanan Basabilir.")

            if (b.isButton()) {
              if (b.customId === "avatar") {
                let embed1 = new MessageEmbed()
                  .setColor(settings.bot.BotEmbedColor)
                  .setFooter({ text: `${settings.bot.footer}` })
                  .setDescription(`**[[PNG]](${member.displayAvatarURL({ format: 'png', size: 1024 })})** | **[[JPEG]](${member.displayAvatarURL({ format: 'jpeg', size: 1024 })})** | **[[GIF]](${member.displayAvatarURL({ format: 'gif', size: 1024 })})** | **[[WEBP]](${member.displayAvatarURL({ format: 'webp', size: 1024 })})**`)
                  .setImage(member.displayAvatarURL({ dynamic: true, size: 1024 }))
                msgss.edit({ embeds: [embed1] })
              }
              if (b.customId === "banner") {

                axios({
                  method: 'GET',
                  url: `https://discord.com/api/v8/users/${user.id}`,
                  headers: {
                    Authorization: `Bot ${client.token}`
                  }
                })
                  .then(function(response) {
                    try {
                      if (response.data.banner.includes(".null")) return message.channel.send(`Kullanıcının Banner Verilerini Alamadım!`)
                      var embed2 = new MessageEmbed()
                        .setColor(settings.bot.BotEmbedColor)
                        .setFooter({ text: `${settings.bot.footer}` })
                        .setAuthor(message.guild.name, message.guild.iconURL({ dynamic: true }))

                        .setImage(`https://cdn.discordapp.com/banners/${response.data.id}/${response.data.banner}.gif?size=512`)
                        .setDescription(`**[GİF](https://cdn.discordapp.com/banners/${response.data.id}/${response.data.banner}.gif?size=512)**`)

                      msgss.edit({ embeds: [embed2] })
                    } catch (err) {
                      message.channel.send(`Kullanıcının Banner Verilerini Alamadım!`)
                    }
                  })

              }
              if (b.customId === "cezalar") {
                const m = czalarım

                if (m.length > 2000) {
                  const bir = m.slice(1, 1999)
                  const iki = m.slice(1999, m.length)
                  let embed3 = new MessageEmbed()
                    .setDescription(`${bir}`)
                    .setColor(settings.bot.BotEmbedColor)
                    .setFooter({ text: `${settings.bot.footer}` })
                  msgss.edit({ embeds: [embed3] })
                  let embed4 = new MessageEmbed()
                    .setDescription(`${iki}`)
                    .setColor(settings.bot.BotEmbedColor)
                    .setFooter({ text: `${settings.bot.footer}` })
                  message.channel.send({ embeds: [embed4] })
                } else {
                  let embed3 = new MessageEmbed()
                    .setDescription(`${czalarım}`)
                    .setColor(settings.bot.BotEmbedColor)
                    .setFooter({ text: `${settings.bot.footer}` })
                  msgss.edit({ embeds: [embed3] })
                }
              }

              if (b.customId === "katilim") {
                msgss.edit({ embeds: [new MessageEmbed().setColor(settings.bot.BotEmbedColor).setFooter({ text: `${settings.bot.footer}` }).setDescription(`${member}, Adlı Kişi Bu Sunucuya **${(message.guild.members.cache.filter(a => a.joinedTimestamp <= member.joinedTimestamp).size).toLocaleString()}.** sırada katılmış `)] });
              }
           
              if (b.customId === "anasayfa") {
                const embed = new MessageEmbed()
                  .setColor(settings.bot.BotEmbedColor)
                  .setFooter(`${settings.bot.footer}`)
                  .setDescription(`${member} üyesinin ${formatedDate} tarihinden itibaren ` + "``"
                    + message.guild.name + "``" + ` sunucusundaki verilerin işlenmiştir.`)
                  .addFields(
                    { name: 'Toplam Mesaj', value: '```yaml' + `\n${db.get(`msg_${member.id}`) || "0"} Mesajın Bulunmakta.\n` + '```', inline: true },
                    { name: 'Son 1 Haftalık Mesaj', value: `${msgverihafta}`, inline: true },
                    { name: 'Son 1 Aylık Mesaj', value: `${msgveriay}`, inline: true },

                  )
                  .addFields(
                    { name: 'Toplam Ses Aktifligi', value: '```yaml' + `\n${db.get(`sesaktif_${member.id}`) || "0"} Ses Girişin Bulunmakta.\n` + '```', inline: true },
                    { name: 'Son 1 Haftalık Ses', value: `${haftass} `, inline: true },
                    { name: 'Son 1 Aylık Ses', value: `${ayss}`, inline: true },
                  )
                  .addFields(
                    { name: 'En Son Girdigi Ses Kanalı', value: `${sessonuch}` },
                  )
               
                msgss.edit({ embeds: [embed], components: [buttonlar] })
               
              }
            }
          })
          collector.on("end", async () => { });

        })



      }
    } catch (e) {
      console.log("bir sorun oldu: " + e)
    }
  }
}