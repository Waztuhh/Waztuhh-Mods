const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const settings = require("../settings.js")

module.exports = {
  name: "git",
  aliases: [],
  async run(client, message, args) {
    let waztuhh = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
    const embed = new MessageEmbed()
    .setFooter({ text: settings.bot.footer})
    .setAuthor({ name: waztuhh.displayName , iconURL: waztuhh.user.displayAvatarURL({ dynamic: true })})
        .setThumbnail(message.author.displayAvatarURL({ dynamic: true, size: 64 }))
        .setColor(settings.bot.BotEmbedColor)
        .setTimestamp()


        if (!message.member.roles.cache.has(settings.moderasyon.enaltyt))
        return message.channel.send(`Bu komutu kullanabilmek için öncelikle gerekli yetkin olmalı!`).catch((err) => console.log(err)).then((e) => setTimeout(() => { e.delete(); }, 10000));
    let Member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    if (!Member || !Member.voice.channel || Member.id === message.author.id) message.reply({ embeds: [embed.setDescription(`Öncelikle seste bulunan geçerli birini belirtmelisin!`)] }).catch((err) => console.log(err)).then((e) => setTimeout(() => { e.delete(); }, 10000));
    if (Member.voice.channel === message.member.voice.channel) return message.reply({ embeds: [embed.setDescription(`Şuanda zaten aynı kanaldasınız.`)] }).catch((err) => console.log(err)).then((e) => setTimeout(() => { e.delete(); }, 10000));

    if (!message.member.roles.cache.has(settings.moderasyon.genelyt) === true) {
        if (Member.voice.channel && message.member.voice.channel) message.member.voice.setChannel(Member.voice.channel)
        message.reply({ embeds: [embed.setDescription(`${Member} başarıyla kullanıcısının kanalına transfer oldunuz.`)] }).catch((err) => console.log(err))    } else {
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
        .setFooter({ text: settings.bot.footer})
        .setAuthor({ name: waztuhh.displayName , iconURL: waztuhh.user.displayAvatarURL({ dynamic: true })})
        .setDescription(`${Member}, ${message.author} kullanıcısı seni \`${message.member.voice.channel.name}\` kanalına çekmek istiyor, kabul ediyor musun?`)
      message.reply({ embeds: [embeds], components: [buttonlar] }).then(msg => {
      const filter = (i) => i.message.id === msg.id;
      const collector = message.channel.createMessageComponentCollector({ filter, time: 15000 })
      collector.on('collect', async b => {
  

        if (b.user.id !== Member.id) return message.channel.send("<@" + b.user.id + "> Bu Butona Sadece Komutu Kullanan Basabilir.")

        if (b.isButton()) {
          if (b.customId === "onay") {
            msg.delete({ timeout: 200 });
            message.reply({ embeds: [embed.setDescription(`${Member}, ${message.author} başarıyla kanalınıza taşındı.`)] }).catch((err) => console.log(err))
            if (Member.voice.channel && message.member.voice.channel) message.member.voice.setChannel(Member.voice.channel);
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
