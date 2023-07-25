const discord = require('discord.js')
const Discord = require('discord.js')
const settings = require("../settings.js")


module.exports = {
  name: "kanal-görüntülenme",
  aliases: ["kg","kgörüntülenme","kanalgoruntulenme","kanalgörüntülenme"],
  async run(client, message, args) {
    try {

      if (!message.member.permissions.has(8)) return message.reply({ content: "Bu komutu kullanabilmek için **Yönetici** yetkisine sahip olmanız gerekmektedir." }).then(x => x.delete({ timeout: 3000 }));

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
      message.channel.send({ content: 'Kanalın Herkese Görüntülenmesini Kapatmak Veya Açmak İçin Alttaki Butonlardan Birine Basın!', components: [secenek] }).then(msg => {

        
        const filter = b => b.user.id === message.author.id;
        const collector = msg.createMessageComponentCollector({ filter, time: 10000 });
       
        collector.on('collect', async b => {
          
        if (b.isButton()) {
          if (b.user.id !== message.member.id) return message.channel.send("<@" + b.user.id + "> Bu Butona Sadece Komutu Kullanan Basabilir.")
          if (b.customId === 'lock') {
            message.channel.permissionOverwrites.edit(everyone, {
                VIEW_CHANNEL: false,
                
            });
            msg.delete().catch(() => {})
            const embedss = new Discord.MessageEmbed()
              .setColor(settings.bot.BotEmbedColor)
              .setFooter({ text: `${settings.bot.footer}` })
              .setDescription(`Kanalın Herkese Görüntülenmesi Kapatıldı!`)
            message.channel.send({ embeds: [embedss] })
          }
          
          if (b.customId === 'unlock') {
           
            message.channel.permissionOverwrites.edit(everyone, {
                VIEW_CHANNEL: true,
            });
            msg.delete().catch(() => {})
            const embeds = new Discord.MessageEmbed()
              .setColor(settings.bot.BotEmbedColor)
              .setFooter({ text: `${settings.bot.footer}` })
              .setDescription(`Kanalın Herkese Görüntülenmesi Açıldı!`)
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