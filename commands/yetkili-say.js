
const Discord = require("discord.js");
const settings = require("../settings")
module.exports = {
    name: "ysay",
    aliases: ["yetkilisay", "yetkili-say"],
    async run(client, message, args) {
      const embed = new Discord.MessageEmbed()
        .setColor(settings.bot.BotEmbedColor)
        .setFooter({ text: `${settings.bot.footer}` })

        if (!message.member.roles.cache.has(settings.moderasyon.ownerrole))
        return message.channel.send(`Bu komutu kullanabilmek için öncelikle gerekli yetkin olmalı!`).catch((err) => console.log(err)).then((e) => setTimeout(() => { e.delete(); }, 10000));
        let roles = message.guild.roles.cache.get(`${settings.moderasyon.enaltyt}`); 
        let üyeler = [...message.guild.members.cache.filter(uye => !uye.user.bot && uye.roles.highest.position >= roles.position && (uye.presence && uye.presence.status !== "offline") && !uye.voice.channel).values()]
         var filter = m => m.author.id === message.author.id && m.author.id !== client.user.id && !m.author.bot;
         if(üyeler.length == 0) return message.channel.send("Çevirimiçi olan tüm yetkililer seste gözüküyor!")
         const m = await message.channel.send({embeds: [new Discord.MessageEmbed()
   
          .setDescription(`<a:yildiz:1132304431665385602> Çevirimiçi olup, seste gözükmeyen <@&${roles.id}> rölündeki ve üzerinde ki yetkili sayısı: \`${üyeler.length ?? 0}\``)
          .setFooter({ text: `• Seste olmayan yetkilileri etiketlemek için (.yetiket) yazınız!`})
          
          ]});	
    }
}