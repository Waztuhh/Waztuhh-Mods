const discord = require('discord.js')
const Discord = require('discord.js')
const settings = require("../settings.js")


module.exports = {
  name: "lock",
  aliases: ["unlock", "kilit"],
  async run(client, message, args) {
    try {

      if (!message.member.roles.cache.has(settings.moderasyon.ownerrole))
      return message.channel.send(`Bu komutu kullanabilmek için öncelikle gerekli yetkin olmalı!`).catch((err) => console.log(err)).then((e) => setTimeout(() => { e.delete(); }, 10000));

      let lock = new discord.MessageButton()
        .setStyle("PRIMARY")
        .setLabel("🔒")
        .setCustomId("lock")
      let unlock = new discord.MessageButton()
        .setStyle("PRIMARY")
        .setLabel("🔓")
        .setCustomId("unlock")
      const secenek = new discord.MessageActionRow({ components: [lock, unlock] })
      let everyone = message.guild.roles.cache.find(x => x.name === `@everyone`);
      message.channel.send({ content: 'Kanalı kilitlemek ya da kilidini açmak için alttaki butonları kullanın.', components: [secenek] }).then(msg => {


        const filter = i => i.user.id === message.author.id;
        const collector = msg.createMessageComponentCollector({ filter, time: 10000 });

        collector.on('collect', async i => {
        if (i.isButton()) {
          
          if (i.customId === 'lock') {
            message.channel.permissionOverwrites.edit(everyone, {
              SEND_MESSAGES: false,
            });
            msg.delete().catch(() => {})
            const embedss = new Discord.MessageEmbed()
              .setColor(settings.bot.BotEmbedColor)
              .setFooter({ text: `${settings.bot.footer}` })
              .setDescription(`Kanalın Kilidi kapatıldı!`)
            message.channel.send({ embeds: [embedss] })
          }
          if (i.customId === 'unlock') {
            message.channel.permissionOverwrites.edit(everyone, {
              SEND_MESSAGES: null,
            });
            msg.delete().catch(() => {})
            const embeds = new Discord.MessageEmbed()
              .setColor(settings.bot.BotEmbedColor)
              .setFooter({ text: `${settings.bot.footer}` })
              .setDescription(`Kanalın Kilidi açıldı!`)
            message.channel.send({ embeds: [embeds] })
          }
          
          }
        });

        collector.on('end', () => { message.delete().catch(() => {}) && msg.delete().catch(() => {}) });

      })
    } catch (e) {
      console.log("bir sorun oldu: " + e)
      const embedss = new Discord.MessageEmbed()
        .setColor(settings.bot.BotEmbedColor)
        .setFooter({ text: `${settings.bot.footer}` })
        .setDescription(`Sistemsel bir sorun oluştu`)
      message.channel.send({ embeds: [embedss] })
    }
  }
}