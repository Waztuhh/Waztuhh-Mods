const Discord = require('discord.js');
const db = require('quick.db');
const settings = require("../settings.js")
const  { MessageEmbed } = require("discord.js")
const limit = new Map();
const ms = require("ms");
const moment = require("moment");
moment.locale("tr");


module.exports = {
  name: "afk",
  aliases: [],
  kategori: "kullanıcı",
  async run(client, message, args) {
      let waztuhh = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
      const embed = new MessageEmbed()
      .setFooter({ text: settings.bot.footer})
      .setAuthor({ name: waztuhh.displayName , iconURL: waztuhh.user.displayAvatarURL({ dynamic: true })})
          .setThumbnail(message.author.displayAvatarURL({ dynamic: true, size: 64 }))
          .setColor(settings.bot.BotEmbedColor)
          .setTimestamp()
    const buttonlar = new Discord.MessageActionRow()
      .addComponents(
        new Discord.MessageButton()
          .setCustomId("hataayikla")
          .setLabel("Hata Ayıkla")
          .setEmoji("⚠️")
          .setStyle("DANGER")
          
      );


    
    if (db.has(`afk_${message.author.id}`)) {
      const embeds = new Discord.MessageEmbed()
        .setColor(settings.bot.BotEmbedColor)
        .setFooter(`${settings.bot.footer}`)
        .setDescription(`<@${message.author.id}> Sistemde sorun oluştu. Lütfen hata ayıklayın.`)
      message.channel.send({ embeds: [embeds], components: [buttonlar] }).then(msgsa => {
        const filter = (i) => i.message.id === msgsa.id;
        const collector = message.channel.createMessageComponentCollector({ filter, time: 15000 });
        collector.on('collect', async b => {
        

          if (b.user.id !== message.member.id) return message.channel.send("<@" + b.user.id + "> Bu Butona Sadece Komutu Kullanan Basabilir.")

          if (b.isButton()) {
            if (b.customId === "hataayikla") {
              msgsa.delete()
              const embeds = new Discord.MessageEmbed()
                .setColor(settings.bot.BotEmbedColor)
                .setFooter(`${settings.bot.footer}`)
                .setDescription(`İşlam Başladı! Lütfen bekleyin...`)
            
              message.channel.send({ embeds: [embeds] }).then(msga => {
              setTimeout(() => {

                const embedsss = new Discord.MessageEmbed()
                .setColor(settings.bot.BotEmbedColor)
                .setFooter(`${settings.bot.footer}`)
                .setDescription(`Çok Az Kaldı!`)
                msga.edit({ embeds: [embedsss] })
                message.member.setNickname("[AFK] - " - message.member.displayName)
                db.delete(`afk_${message.author.id}`)
              }, 3000)
                setTimeout(() => {
                 const embedsss = new Discord.MessageEmbed()
                .setColor(settings.bot.BotEmbedColor)
                .setFooter(`${settings.bot.footer}`)
                .setDescription(`İşlem başarılı!`)
                msga.edit({ embeds: [embedsss] })
              }, 6000)        
                        })
        collector.on("end", async () => { msgsa.delete().catch((err) => { }) });
            }
          }
        })
      })
    } else {
      let sebep = args.slice(0).join(" ");
      let yasaklar = ["discord.gg/", ".gg/", "discord.gg", "https://discord.gg/"];
      if (sebep && yasaklar.some(s => sebep.toLowerCase().includes(s))) {
      
        message.delete();
    }
      if (!sebep) return message.reply({ embeds: [embed.setDescription(`Lütfen bir sebep girin.`)] }).catch((err) => console.log(err)).then((e) => setTimeout(() => { e.delete(); }, 6000))
      let afk = message.author.id;
      db.set(`afk_${afk}`, sebep)
      message.member.setNickname("[AFK] - " + message.member.displayName).catch((err) => { message.reply({ embeds: [embed.setDescription(`AFK Moduna geçiş yaptınız amma isminize AFK yazısı eklenemedi!`)] }) })
      message.reply({ embeds: [embed.setDescription(`**${message.author}**`)] })
}
    }
  };