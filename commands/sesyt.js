const { MessageEmbed } = require("discord.js");
const settings = require("../settings.js")
module.exports = {
  name: "ysay",
  aliases: ["ytsay","sesyt","sesy"],
  async run(client, message, args) {

  let embed1 = new MessageEmbed().setColor('RANDOM').setFooter(settings.bot.footer).setTimestamp()
  if (!message.guild) return;
  if (!message.member.permissions.has(8)) return message.reply("Yetkin Bu Komudu Kullanmaya Yetmiyor!")

    let YetkiliRol = settings.moderasyon.enaltyt
    const sec = args[0]
    if (!sec) {

	  let waztu = message.guild.members.cache.filter(member => {
			return member.roles.cache.has(YetkiliRol) && !member.voice.channel && member.presence.status !== "offline" && !member.user.bot && !settings.bot.botOwner.includes(member.user.id)
		  }).map(member => ("<@" + member.user.id + ">")).join(",");
      let SesteOlmayanYetkili = message.guild.members.cache
        .filter(member => {
          return member.roles.cache.has(YetkiliRol) && !member.voice.channel && member.presence.status !== "offline" && !member.user.bot && !settings.bot.botOwner.includes(member.user.id)
        }).size;

      let ToplamYetkili = message.guild.roles.cache.get(YetkiliRol).members.size
      let SesteOlanYetkili = message.guild.members.cache.filter(member => member.roles.cache.has(YetkiliRol) && member.voice.channel && !member.user.bot && !settings.bot.botOwner .includes(member.user.id)).size;
      let AktifYetkili = message.guild.members.cache.filter(member => member.roles.cache.has(YetkiliRol) && !member.user.bot && !settings.bot.botOwner.includes(member.user.id) && (member.presence.status !== "offline")).size;
      let OfflineYetkili = message.guild.members.cache.filter(member => member.roles.cache.has(YetkiliRol) && !member.user.bot && !settings.bot.botOwner.includes(member.user.id) && member.presence.status == "offline").size;

      let tablo = [{
        "TOPLAM": ToplamYetkili + " Yetkili Kullanıcı",
        "AKTİF": AktifYetkili + " Yetkili Kullanıcı",
        "ÇEVRİMDIŞI": OfflineYetkili + " Yetkili Kullanıcı",
        "SESTE": SesteOlanYetkili + " Yetkili Kullanıcı",
        "SESTE OLMAYAN": SesteOlmayanYetkili + " Yetkili Kullanıcı"
      }]

      message.reply({
        embed: [embed1.setDescription(table.create(tablo))]}, {
        code: "md",
        split: true
      })
      message.channel.send(waztu, {code: "md", split: { char: "," }})
    }

    
}}