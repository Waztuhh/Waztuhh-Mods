const Discord = require("discord.js")
const ayar = require('../settings.js')
module.exports = {
  name: "rol",
  aliases: [],
  async run(client, message, args) {
    const embed = new Discord.MessageEmbed()
      .setColor(ayar.bot.BotEmbedColor)
      .setFooter({ text: settings.bot.footer})
      .setAuthor({ name: waztuhh.displayName , iconURL: waztuhh.user.displayAvatarURL({ dynamic: true })})
      
    
      if (!message.member.roles.cache.has(settings.moderasyon.ownerrole))
      return message.channel.send(`Bu komutu kullanabilmek için öncelikle gerekli yetkin olmalı!`).catch((err) => console.log(err)).then((e) => setTimeout(() => { e.delete(); }, 10000));
    let member = message.guild.member(message.mentions.members.first() || message.guild.members.cache.get(args[0]));
    let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[1]) || message.guild.roles.cache.find(s => s.name.toLowerCase().includes(args.slice(1).join(' ')))

    if (!member || !role) return message.channel.send({ embeds: [embed.setDescription(`${message.member}, Geçerli bir üye ve rol belirtmelisin.`)]}).sil(7);

    if (member.roles.cache.has(role.id)) {
        await member.roles.remove(role.id).catch(e => {});
        message.channel.send({ embeds: [embed.setDescription(`${member}, Adlı kullanıcıya ${role} rolü alındı.`)]}).sil(15)
    } else {
        await member.roles.add(role.id).catch(e => {});
        message.channel.send({ embeds: [embed.setDescription(`${member}, Adlı kullanıcıya ${role} rolü verildi.`)]}).sil(15)
    }
}
}