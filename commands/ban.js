const Discord = require('discord.js');
const db = require('quick.db');
const settings = require("../settings.js")
const limit = new Map();
const { MessageEmbed } = require("discord.js")
const moment = require("moment");
moment.locale("tr");


module.exports = {
  name: "ban",
  aliases: ["yargı", "yarra", "cu", "yasakla"],
  async run(client, message, args) {
    try {
      let waztuhh = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
      const embed = new MessageEmbed()
          .setFooter(settings.bot.footer)
          .setAuthor(waztuhh.displayName, waztuhh.user.displayAvatarURL({ dynamic: true }))
          .setThumbnail(message.author.displayAvatarURL({ dynamic: true, size: 64 }))
          .setColor(settings.bot.BotEmbedColor)
          .setTimestamp()
          if (!message.member.roles.cache.has(settings.moderasyon.banstaff))
          return message.channel.send(`Bu komutu kullanabilmek için öncelikle gerekli yetkin olmalı!`).catch((err) => console.log(err)).then((e) => setTimeout(() => { e.delete(); }, 10000));
      let guild = message.guild
      let member = message.member
      let user = message.mentions.users.first() || guild.members.cache.get(args[0]);
      let reason = args.slice(1).join(' ');
      if (!user) return message.reply({ embeds: [embed.setDescription('Öncelikle banlanacak kullanıcıyı belirtmelisin.')] }).catch((err) => console.log(err)).then((e) => setTimeout(() => { e.delete(); }, 10000));
      if (reason.length < 1) return message.reply({ embeds: [embed.setDescription('Öncelikle geçerli bir sebep belirtmelisin.')] }).catch((err) => console.log(err)).then((e) => setTimeout(() => { e.delete(); }, 10000));
      if (settings.moderasyon.banlimit > 0 && limit.has(message.author.id) && limit.get(message.author.id) == settings.moderasyon.banlimit) return message.reply({ embeds: [embed.setDescription("Saatlik ban sınırına ulaştın!")] }).catch((err) => console.log(err)).then((e) => setTimeout(() => { e.delete(); }, 10000))
      if (!message.member.permissions.has("ADMINISTRATOR") && member && member.roles.highest.position >= message.member.roles.highest.position) return message.reply({ embeds: [embed.setDescription("Kendinle aynı yetkide ya da daha yetkili olan birini yasaklayamazsın!")] })


      const buttonlar = new Discord.MessageActionRow()
        .addComponents(
          new Discord.MessageButton()
            .setCustomId("onay")
            .setLabel("Onayla")
            .setStyle("SUCCESS")
        )
        .addComponents(
          new Discord.MessageButton()
            .setCustomId("red")
            .setLabel("Reddet")
            .setStyle("DANGER")
        );


      const embeds = new Discord.MessageEmbed()
        .setColor(settings.bot.BotEmbedColor)
        .setFooter({ text: settings.bot.footer})
        .setAuthor({ name: waztuhh.displayName , iconURL: waztuhh.user.displayAvatarURL({ dynamic: true })})
        .setDescription(`<a:yildiz:1132304431665385602> ${user}, Kullanıcısına ban atmak istediğinize eminmisiniz?`)
      message.channel.send({ embeds: [embeds], components: [buttonlar] }).then(msg => {
        const filter = (i) => i.message.id === msg.id;
        const collector = message.channel.createMessageComponentCollector({ filter, time: 15000 });
        collector.on('collect', async b => {
       

          if (b.user.id !== message.member.id) return message.channel.send("<@" + b.user.id + "> Bu Butona Sadece Komutu Kullanan Basabilir.")

          if (b.isButton()) {
            if (b.customId === "onay") {
              msg.delete()
              message.reply({ embeds: [embed.setDescription(`**${members ? members.toString() : members.username}** - \`(${user.id})\` kullanıcısı ${message.author} tarafından **"${reason}"** sebebiyle sunucudan yasaklandı.`)] }).catch((err) => console.log(err)).then((e) => setTimeout(() => { e.delete(); }, 6000))

              client.channels.cache.get(settings.moderasyon.banlog).send({
                embeds: [embed.setDescription(`     
    ${member ? member.toString() : member.username} sunucudan yasaklandı.
    Kullanıcı: ${member ? member.toString() : ""} - \`(${member.id})\`
    Yetkili: ${message.author} - \`(${message.author.id})\`
    Sebep: \`${reason}\`
    Tarih: \`${moment(Date.now()).format("LLL")}\``)]
              });

              db.push(`sicil_${user.id}`, `${message.author} Tarafından ${moment(Date.now()).format("LLL")} tarihinde **${reason}** sebebiyle **[BAN]** cezası almış.`)
              db.add(`cezapuan_${user.id}`, +20)
              guild.members.ban(user, { reason: reason });

              client.channels.cache.get(settings.moderasyon.cezapuanlog).send(`${user.tag} - (${user.id}) Kullanıcısına BAN işlemi uygulandı. \nGüncel Ceza Puanı: **${db.get(`cezapuan_${user.id}`) || "0"}** `)
              if (settings.moderasyon.banlimit > 0) {
                if (!limit.has(message.author.id)) limit.set(message.author.id, 1);
                else limit.set(message.author.id, limit.get(message.author.id) + 1);
                setTimeout(() => {
                  if (limit.has(message.author.id)) limit.delete(message.author.id);
                }, 1000 * 60 * 60)
              };
            }
            if (b.customId === "red") {
              msg.delete()
              message.channel.send(`İşlem başarıyla iptal edildi.`)
            }
        collector.on("end", async () => { msg.delete().catch((err) => { }) });
          }
        })
      })
    } catch (e) {
      console.log("bir sorun oldu: " + e)
    }
  }

};