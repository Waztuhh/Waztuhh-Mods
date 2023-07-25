const Discord = require('discord.js');
const db = require('quick.db');
const settings = require("../settings.js")
const limit = new Map();
const moment = require("moment");
const ms = require('ms');
moment.locale("tr");


module.exports = {
  name: "mute",
  aliases: ["chatmute", "cmute", "vmute", "voicemute"],
  async run(client, message, args) {
    try {
      const embed = new Discord.MessageEmbed()
        .setColor(settings.bot.BotEmbedColor)
        .setFooter({ text: `${settings.bot.footer}` })

        if (!message.member.roles.cache.has(settings.moderasyon.mutestaff))
        return message.channel.send(      
          `Bu komutu kullanabilmek için öncelikle gerekli yetkin olmalı!`
        );
      let guild = message.guild
      let membersmember = message.member
      let user = message.mentions.users.first() || guild.members.cache.get(args[0]);
      let sure = args[1]
      let reason = args.slice(2).join(' ');
      if (!user) return message.reply({ embeds: [embed.setDescription('Öncelikle mutelenecek kullanıcıyı belirtmelisin.')] }).catch((err) => console.log(err)).then((e) => setTimeout(() => { e.delete(); }, 10000));
      if (reason.length < 1) return message.reply({ embeds: [embed.setDescription('Öncelikle geçerli bir süre belirtmelisin.')] }).catch((err) => console.log(err)).then((e) => setTimeout(() => { e.delete(); }, 10000));
      if (!sure) return message.reply({ embeds: [embed.setDescription(`Öncelikle geçerli bir süre belirtmelisin.`)] }).catch((err) => console.log(err), client.tick(message)).then((e) => setTimeout(() => { e.delete(); }, 10000));
      if (!message.member.permissions.has("ADMINISTRATOR") && member && member.roles.highest.position >= message.member.roles.highest.position) return message.reply({ embeds: [embed.setDescription("Kendinle aynı yetkide ya da daha yetkili olan birini yasaklayamazsın!")] })
      sure
        .replace("s", " Saniye")
        .replace("m", " Dakika")
        .replace("h", " Saat")
        .replace("d", " Gün")
        .replace("w", " Hafta")


      let members = message.guild.members.cache.get(user.id);
      let waztuhh = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
      const buttonlar = new Discord.MessageActionRow()
        .addComponents(
          new Discord.MessageButton()
            .setCustomId("mute")
            .setLabel("Chat")
            .setStyle("PRIMARY")
        )
        .addComponents(
          new Discord.MessageButton()
            .setCustomId("vmute")
            .setLabel("Voice")
            .setStyle("PRIMARY")
        );

      const embeds = new Discord.MessageEmbed()
        .setColor(settings.bot.BotEmbedColor)
        .setFooter({ text: settings.bot.footer})
        .setAuthor({ name: waztuhh.displayName , iconURL: waztuhh.user.displayAvatarURL({ dynamic: true })})
        .setDescription(`<a:yildiz:1132304431665385602> ${members}, Kullanıcısına ne mutesi atmak istiyorsunuz?`)
      message.channel.send({ embeds: [embeds], components: [buttonlar] }).then(msg => {
        const filter = (i) => i.message.id === msg.id;
        const collector = message.channel.createMessageComponentCollector({ filter, time: 15000 });
        collector.on('collect', async b => {
 

          if (b.user.id !== message.member.id) return message.channel.send("<@" + b.user.id + "> Bu Butona Sadece Komutu Kullanan Basabilir.")

          if (b.isButton()) {
            if (b.customId === "mute") {

              msg.delete().catch((err) => { })
              message.reply({ embeds: [embed.setDescription(`**${members ? members.toString() : members.username}** - \`(${members.id})\` kullanıcısı ${message.author} tarafından **"${reason}"** sebebiyle sunucuda mutelendi.`)] }).catch((err) => console.log(err)).then((e) => setTimeout(() => { e.delete(); }, 6000))

              client.channels.cache.get(settings.moderasyon.mutelog).send({
                embeds: [embed.setDescription(`     
    ${members ? members.toString() : members.username} sunucuda yazı kanallarında mutelendi.
    Kullanıcı: ${members ? members.toString() : ""} - \`(${members.id})\`
    Yetkili: ${message.author} - \`(${message.author.id})\`
    Sebep: \`${reason}\`
    Süre: \`${sure.replace("s", " Saniye").replace("m", " Dakika").replace("h", " Saat").replace("d", " Gün").replace("w", "Hafta")}\`
    Tarih: \`${moment(Date.now()).format("LLL")}\``)]
              });

              db.push(`sicil_${members.id}`, `${message.author} Tarafından ${moment(Date.now()).format("LLL")} tarihinde **${reason}** sebebiyle **Chat Mute** cezası almış.`)
              db.add(`cezapuan_${members.id}`, +10)
              members.roles.add(`${settings.moderasyon.muterol}`)
              client.channels.cache.get(settings.moderasyon.cezapuanlog).send(`${members ? members.toString() : members.username} - \`(${members.id})\` Kullanıcısına Chat Mute işlemi uygulandı. \nGüncel Ceza Puanı: **${db.get(`cezapuan_${members.id}`) || "0"}** `)
              if (settings.moderasyon.mutelimit > 0) {
                if (!limit.has(message.author.id)) limit.set(message.author.id, 1);
                else limit.set(message.author.id, limit.get(message.author.id) + 1);

                setTimeout(() => {
                  members.roles.remove(`${settings.moderasyon.muterol}`)
                }, ms(sure))

                setTimeout(() => {
                  if (limit.has(message.author.id)) limit.delete(message.author.id);
                }, 1000 * 60 * 60)
              };

            }

            if (b.customId === "vmute") {

              msg.delete().catch((err) => { })
              message.reply({ embeds: [embed.setDescription(`**${members ? members.toString() : members.username}** - \`(${members.id})\` kullanıcısı ${message.author} tarafından **"${reason}"** sebebiyle sunucuda mutelendi.`)] }).catch((err) => console.log(err)).then((e) => setTimeout(() => { e.delete(); }, 6000))

              client.channels.cache.get(settings.moderasyon.mutelog).send({
                embeds: [embed.setDescription(`     
    ${members ? members.toString() : members.username} sunucuda ses kanallarında mutelendi.
    Kullanıcı: ${members ? members.toString() : ""} - \`(${members.id})\`
    Yetkili: ${message.author} - \`(${message.author.id})\`
    Sebep: \`${reason}\`
    Süre: \`${sure.replace("s", " Saniye").replace("m", " Dakika").replace("h", " Saat").replace("d", " Gün").replace("w", "Hafta")}\`
    Tarih: \`${moment(Date.now()).format("LLL")}\``)]
              });

              db.push(`sicil_${user.id}`, `${message.author} Tarafından ${moment(Date.now()).format("LLL")} tarihinde **${reason}** sebebiyle **Voice Mute** cezası almış.`)
              db.add(`cezapuan_${user.id}`, +10)
              members.roles.add(`${settings.moderasyon.vmuterol}`)
              client.channels.cache.get(settings.moderasyon.cezapuanlog).send(`${user.tag} - (${user.id}) Kullanıcısına Voice Mute işlemi uygulandı. \nGüncel Ceza Puanı: **${db.get(`cezapuan_${user.id}`) || "0"}** `)
              if (settings.moderasyon.mutelimit > 0) {
                if (!limit.has(message.author.id)) limit.set(message.author.id, 1);
                else limit.set(message.author.id, limit.get(message.author.id) + 1);
                setTimeout(() => {
                  members.roles.remove(`${settings.moderasyon.vmuterol}`)
                  client.channels.cache.get(settings.moderasyon.mutelog).send({
                    embeds: [embed.setDescription(`    
       `)]})
                }, ms(sure))

                setTimeout(() => {
                  if (limit.has(message.author.id)) limit.delete(message.author.id);
                }, 1000 * 60 * 60)
              };

            }



          }
        })
        collector.on("end", async () => { msg.delete().catch((err) => { }) });
      })



    } catch (e) {
      console.log("bir sorun oldu: " + e)
    }
  }

};