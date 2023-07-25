const { MessageEmbed } = require("discord.js");
const settings = require("../settings.js")
module.exports = {
  name: "say",
  aliases: [],
  async run(client, message, args) {
    const embed = new MessageEmbed()
      .setColor(settings.bot.BotEmbedColor)
      .setFooter({ text: settings.bot.footer})
      .setAuthor(message.guild.iconURL({ dynamic: true, size: 2048 }))
    let BoosterRole =  `${settings.moderasyon.boosterrol}`
    let Tag = `${settings.sunucu.tagges}`
    
    if (!message.member.roles.cache.has(settings.moderasyon.genelyt) && !message.member.permissions.has(8)) return message.reply({ embeds: [embed.setDescription(`Komutu kullanmak için geçerli yetkin olmalı!`)] }).catch((err) => console.log(err), client.tick(message)).then((e) => setTimeout(() => { e.delete(); }, 10000));
    let aktif = message.guild.members.cache.filter(member => member.presence && (member.presence.status != "offline")).size
    let uye = message.guild.memberCount
    let sesli = message.guild.members.cache.filter(x => x.voice.channel).size
    let roles = message.guild.roles.cache.get(`${settings.moderasyon.enaltyt}`); 
    let üyeler = [...message.guild.members.cache.filter(uye => !uye.user.bot && uye.roles.highest.position >= roles.position).values()]
     var BoosterMember  = message.guild.members.cache.filter(b => b.roles.cache.get(BoosterRole)).size || 0;
    var BoostLevel = message.guild.premiumTier;
    let boost = message.guild.premiumSubscriptionCount;
     var Taglı = message.guild.members.cache.filter(u => u.user.username.includes(Tag)).size;
    message.reply({
      embeds: [embed.setDescription(`
      <a:yildiz:1132304431665385602> Sunucumuzda toplam **${uye}** kullanıcı bulunuyor.
      <a:yildiz:1132304431665385602> Sunucumuzda aktif **${aktif}** kullanıcı bulunuyor.
      <a:yildiz:1132304431665385602> Sunucumuzda seste aktif **${sesli}** kullanıcı bulunuyor.
      <a:yildiz:1132304431665385602> Sunucumuzda toplam **${üyeler.length ?? 0}** yetkili bulunuyor.
      <a:yildiz:1132304431665385602> Sunucumuzda **${Taglı}** Taglı Bulunuyor.
      <a:yildiz:1132304431665385602> Sunucumuzda **${boost}** takviye bulunuyor.
      <a:yildiz:1132304431665385602> Sunucumuz **${BoostLevel}** seviyesinde.
      <a:yildiz:1132304431665385602> Sunucumuza takviye yapan **${BoosterMember}** kullanıcı bulunuyor.
    `)]
    });

  }
}