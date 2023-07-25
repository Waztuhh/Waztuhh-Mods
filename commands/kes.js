const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const settings = require("../settings.js")

module.exports = {
  name: "kes",
  aliases: [],
  async run(client, message, args) {
    const embed = new MessageEmbed()
      .setColor(settings.bot.BotEmbedColor)
      .setFooter({ text: settings.bot.footer})
      .setAuthor({ name: waztuhh.displayName , iconURL: waztuhh.user.displayAvatarURL({ dynamic: true })})


      if (!message.member.roles.cache.has(settings.moderasyon.mutestaff))
      return message.channel.send(`Bu komutu kullanabilmek için öncelikle gerekli yetkin olmalı!`).catch((err) => console.log(err)).then((e) => setTimeout(() => { e.delete(); }, 10000));
    let Member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
if(!Member.voice.channel) { message.channel.send(`kullanıcı seste degil.`)

    } else {
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
        .setDescription(`${message.author}, ${Member} ın baglantısı kesilsinmi? `)
      message.reply({ embeds: [embeds], components: [buttonlar] }).then(msg => {
      const filter = (i) => i.message.id === msg.id;
      const collector = message.channel.createMessageComponentCollector({ filter, time: 15000 })
      collector.on('collect', async b => {
     

        if (b.user.id !== message.author.id) return message.channel.send("<@" + b.user.id + "> Bu Butona Sadece Komutu Kullanan Basabilir.")

        if (b.isButton()) {
          if (b.customId === "onay") {
            msg.delete({ timeout: 200 });
            message.reply({ embeds: [embed.setDescription(`${Member} kullanıcısı başarıyla kanaldan atıldı.`)] }).catch((err) => console.log(err))
           await Member.voice.disconnect()

          }
                      if (b.customId === "red") {
              msg.delete()
              message.channel.send(`İşlem başarıyla iptal edildi.`)
            }
        }
        
      })
})
    }


  }
}