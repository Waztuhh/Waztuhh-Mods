const Discord = require("discord.js")
const { MessageEmbed } = require("discord.js")
const ayar = require('../settings.js')
const settings = require('../settings.js')
module.exports = {
    name: "dağıt",
    aliases: ["dagıt","dagit","dağit"],
    async run(client, message, args) {
        let waztuhh = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
        const embed = new MessageEmbed()
            
            .setFooter({ text: settings.bot.footer})
            .setAuthor({ name: waztuhh.displayName , iconURL: waztuhh.user.displayAvatarURL({ dynamic: true })})
            .setThumbnail(message.author.displayAvatarURL({ dynamic: true, size: 64 }))
            .setColor(settings.bot.BotEmbedColor)
            .setTimestamp()
        if(!message.member.permissions.has("ADMINISTRATOR")) return message.reply("Bu Komutu Kullanmak İçin **Yönetici** Yetkisine Sahip Olmalısın!").catch((err) => console.log(err)).then((e) => setTimeout(() => { e.delete(); }, 10000));
    let kanallar = message.guild.channels.cache.filter(s => s.parentID == ayar.moderasyon.pubkategoriıd).map(x => x)
    if (!message.member.voice.channel) return   message.channel.send({ embeds: [embed.setDescription(`${message.member.voice.channel}, Adlı Kanalda Üye Sayısı **1** Kişi Olduğu İçin Dağıtılmicaktır!`)]})
    
    let uyeler = message.member.voice.channel.members.map(x => x)

    uyeler.forEach(async member => {
        member.voice.setChannel(kanallar[Math.floor(Math.random() * kanallar.length)]).catch(e => {});
    });
    message.channel.send({ embeds: [embed.setDescription(`Toplamda **${message.member.voice.channel.members.size}** Kişi **Public** Odalara Dağıtılmaya Başlandı. `)]})
    
}
}