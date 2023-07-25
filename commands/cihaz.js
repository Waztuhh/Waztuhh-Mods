const { MessageEmbed } = require("discord.js");
const settings = require("../settings.js")
module.exports = {
  name: "cihaz",
  aliases: ["cihazım"],
  async run(client, message, args) {
    let waztuhh = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
    const embed = new MessageEmbed()
    .setFooter({ text: settings.bot.footer})
    .setAuthor({ name: waztuhh.displayName , iconURL: waztuhh.user.displayAvatarURL({ dynamic: true })})
        .setThumbnail(message.author.displayAvatarURL({ dynamic: true, size: 64 }))
        .setColor(settings.bot.BotEmbedColor)
        .setTimestamp()


let member;
if(message.mentions.members.first()) {
member = message.mentions.members.first()
} else {
member = message.member;

}

let baknedicm = {
  web: 'İnternet Tarayıcısı',
  desktop: 'Bilgisayar (Uygulama)',
  mobile: 'Mobil'
}

let durum = (member.presence.status).replace('dnd', 'Rahatsız etmeyin.').replace('idle', 'Boşta.').replace('online', 'Aktif.').replace('offline', 'Çevrimdışı.');
let uyy;
if(member.presence.status !== 'offline') {
uyy = ` \n**Bağlandığı cihaz:** ${baknedicm[Object.keys(member.presence.clientStatus)[0]]}` } else { uyy = '' }
message.channel.send({ embeds: [embed.setDescription(`**Kullanıcı:** ${member.user.tag} \n**Durumu:** ${durum}${uyy}`)]})

    

  }
}