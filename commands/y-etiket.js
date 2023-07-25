const Discord = require("discord.js");
const settings = require("../settings")
module.exports = {
    name: "yetiket",
    aliases: [],
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
   
            message.channel.send(``+ üyeler.map(x => "<@" + x.id + ">").join(" | ") + ``)
    }
}