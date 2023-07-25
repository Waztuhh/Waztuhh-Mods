const db = require("quick.db");
const settings = require("../settings.js")
const config = require("../config.json")
const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "booster",
  aliases: ["zengin", "boosternick","booster"],
  async run(client, message, args) {
    try {

      let waztuhh = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
      const embed = new MessageEmbed()
      .setFooter({ text: settings.bot.footer})
      .setAuthor({ name: waztuhh.displayName , iconURL: waztuhh.user.displayAvatarURL({ dynamic: true })})
          .setThumbnail(message.author.displayAvatarURL({ dynamic: true, size: 64 }))
          .setColor(settings.bot.BotEmbedColor)
          .setTimestamp()


          if (!message.member.roles.cache.has(config.boosterrol))
          return message.channel.send(`Bu komutu kullanabilmek için takviye yapman gerekli!`).catch((err) => console.log(err)).then((e) => setTimeout(() => { e.delete(); }, 10000));
      let name = args.slice(0).join(' ');
      if (!name) return message.reply({ embeds: [embed.setDescription(`Öncelikle geçerli bir kullanıcı adı giriniz!`)] }).catch((err) => console.log(err)).then((e) => setTimeout(() => { e.delete(); }, 10000));
      if (name.length > 32) message.reply({ embeds: [embed.setDescription(`Öncelikle **32** karakteri geçmeyen bir isim belirtiniz!`)] }).catch((err) => console.log(err)).then((e) => setTimeout(() => { e.delete(); }, 10000));
      guild.members.cache.get(message.author.id).setNickname(name).then(x => message.reply({ embeds: [embed.setDescription(`Kullanıcı adın başarıyla \`${name}\` olarak değiştirildi!`)] }))
    } catch (e) {
      console.log("bir sorun oldu: " + e)
    }

  }
}