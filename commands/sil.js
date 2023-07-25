const { MessageEmbed } = require("discord.js");
const settings = require("../settings.js")
module.exports = {
  name: "sil",
  aliases: ["mesajsil", "temizle", "clear"],
  async run(client, message, args) {
    const embed = new MessageEmbed()
      .setColor(settings.bot.BotEmbedColor)
      .setFooter({ text: `${settings.bot.footer}` })



    if (!message.member.roles.cache.has(settings.moderasyon.genelyt) && !message.member.permissions.has(8)) return message.reply({ embeds: [embed.setDescription(`Komutu kullanmak için geçerli yetkin olmalı!`)] }).catch((err) => console.log(err), client.tick(message)).then((e) => setTimeout(() => { e.delete(); }, 10000));

    const sayı = args[0]
    if (!sayı) return message.channel.send("Lütfen Bir Sayı Belirtin.")
    if (sayı > 150) return message.channel.send("Maximum 150 Mesaj Silebilirsiniz.")
    if (isNaN(sayı)) return message.channel.send("Sadece Sayı Girebilirsiniz..")
    message.channel.bulkDelete(sayı, true).catch((err) => { })
    const embedd = new MessageEmbed()
      .setColor(settings.bot.BotEmbedColor)
      .setFooter({ text: `${settings.bot.footer}` })
      .setDescription(`Başarıyla ${sayı} kadar mesaj silindi!`)
await message.channel.send({embeds: [embedd]})
  }
}