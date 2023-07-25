const Discord = require("discord.js")
const ayar = require('../settings.js')
module.exports = {
  name: "rolbilgi",
  aliases: [],
  async run(client, message, args) {
    const embed = new Discord.MessageEmbed()
      .setColor(ayar.bot.BotEmbedColor)
      .setFooter({ text: settings.bot.footer})
      .setAuthor({ name: waztuhh.displayName , iconURL: waztuhh.user.displayAvatarURL({ dynamic: true })})
      
      if (!message.member.roles.cache.has(settings.moderasyon.ownerrole))
      return message.channel.send(`Bu komutu kullanabilmek için öncelikle gerekli yetkin olmalı!`).catch((err) => console.log(err)).then((e) => setTimeout(() => { e.delete(); }, 10000));
        let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[0]) || message.guild.roles.cache.find(s => s.name.toLowerCase().includes(args.slice(0).join(' ')))

        if (!role) return message.channel.send({ embeds: [embed.setDescription(`${message.member}, Geçerli bir rol belirtmelisin.`)]}).sil(7);

        let uyeler = role.members;
        let sestekiler = role.members.filter(s => s.voice.channel);
        let online = role.members.filter(s => s.presence.status != "offline")
        let rolrenk = role.hexColor;

        message.channel.send(`
- ${role} rol bilgileri;
- Rol Rengi: \`${rolrenk}\`
- Rol ID: \`${role.id}\`
- Rol kişi sayısı: ${uyeler.size}
─────────────────
- Roldeki kişiler;
${uyeler.map(s => `${s} - (\`${s.id}\`)`).join('\n')}
    `, {split: true})
}
};
