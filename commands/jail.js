const Discord = require('discord.js');
const db = require('quick.db');
const settings = require("../settings.js")
const limit = new Map();
const moment = require("moment");
const ms = require('ms');
moment.locale("tr");


module.exports = {
  name: "jail",
  aliases: [],
  async run(client, message, args) {
    try {
      const embed = new Discord.MessageEmbed()
        .setColor(settings.bot.BotEmbedColor)
        .setFooter({ text: `${settings.bot.footer}` })

        if (!message.member.roles.cache.has(settings.moderasyon.jailstaff))
        return message.channel.send(`Bu komutu kullanabilmek için öncelikle gerekli yetkin olmalı!`).catch((err) => console.log(err)).then((e) => setTimeout(() => { e.delete(); }, 10000));
      let guild = message.guild
      let membersmember = message.member
      let user = message.mentions.users.first() || guild.members.cache.get(args[0]);
      let sure = args[1]
      let reason = args.slice(2).join(' ');
      if (!user) return message.reply({ embeds: [embed.setDescription('Jail atılacak kullanıcının İD sini girin.')] }).catch((err) => console.log(err)).then((e) => setTimeout(() => { e.delete(); }, 10000));
      if (!sure) return message.reply({ embeds: [embed.setDescription(`Geçerli bir süre belirtmelisin.`)] }).catch((err) => console.log(err), client.tick(message)).then((e) => setTimeout(() => { e.delete(); }, 10000));
      if (reason.length < 1) return message.reply({ embeds: [embed.setDescription('Bir sebep belirtmelisin.')] }).catch((err) => console.log(err)).then((e) => setTimeout(() => { e.delete(); }, 10000));
      if (!message.member.permissions.has("ADMINISTRATOR") && member && member.roles.highest.position >= message.member.roles.highest.position) return message.reply({ embeds: [embed.setDescription("Jail atmaya çalıştığın kişi seninle aynı yetkide ya da senden üst yetkiye sahip!")] })
      sure
        .replace("s", "Saniye")
        .replace("m", "Dakika")
        .replace("h", "Saat")
        .replace("d", "Gün")
        .replace("w", "Hafta")


      let members = message.guild.members.cache.get(user.id);

      const buttonlar = new Discord.MessageActionRow()
        .addComponents(
          new Discord.MessageButton()
            .setCustomId("onayla")
            .setLabel("Onayla")
            .setStyle("PRIMARY")
        )
        .addComponents(
          new Discord.MessageButton()
            .setCustomId("reddet")
            .setLabel("Reddet")
            .setStyle("DANGER")
        );
        let waztuhh = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
      const embeds = new Discord.MessageEmbed()
        .setColor(settings.bot.BotEmbedColor)
        .setFooter({ text: settings.bot.footer})
        .setAuthor({ name: waztuhh.displayName , iconURL: waztuhh.user.displayAvatarURL({ dynamic: true })})
        .setDescription(`<a:yildiz:1132304431665385602> ${members}, Kullanıcısına jail atmak istediğinizi onaylıyormusunuz?`)
      message.channel.send({ embeds: [embeds], components: [buttonlar] }).then(msg => {
        const filter = (i) => i.message.id === msg.id;
        const collector = message.channel.createMessageComponentCollector({ filter, time: 15000 });
        collector.on('collect', async b => {
 
         
          if (b.user.id !== message.member.id) return message.channel.send("<@" + b.user.id + "> Bu Butona Sadece Komutu Kullanan Basabilir.").catch((err) => console.log(err)).then((e) => setTimeout(() => { e.delete(); }, 3000));


          if (b.isButton()) {
            if (b.customId === "onayla") {

              msg.delete().catch((err) => { })
              message.reply({ embeds: [embed.setDescription(`**${members ? members.toString() : members.username}** - \`(${members.id})\` kullanıcısı ${message.author} tarafından **"${reason}"** sebebiyle sunucuda jailendi.`)] }).catch((err) => console.log(err)).then((e) => setTimeout(() => { e.delete(); }, 6000))

              client.channels.cache.get(settings.moderasyon.jaillog).send({
                embeds: [embed.setDescription(`     
    ${members ? members.toString() : members.username} sunucuda yazı ve ses kanalarından jailendi.
    Kullanıcı: ${members ? members.toString() : ""} - \`(${members.id})\`
    Yetkili: ${message.author} - \`(${message.author.id})\`
    Süre: \`${sure.replace("s", " Saniye").replace("m", " Dakika").replace("h", " Saat").replace("d", " Gün").replace("w", "Hafta")}\`
    Sebep: \`${reason}\`
    Tarih: \`${moment(Date.now()).format("LLL")}\``)]
              });

              db.push(`sicil_${members.id}`, `${message.author} Tarafından ${moment(Date.now()).format("LLL")} tarihinde **${reason}** sebebiyle **Jail** cezası almış.`)
              db.add(`cezapuan_${members.id}`, +10)
              members.roles.add(`${settings.moderasyon.jailrol}`)
              client.channels.cache.get(settings.moderasyon.cezapuanlog).send(`${members.tag} - (${members.id}) Kullanıcısına Jail işlemi uygulandı. \nGüncel Ceza Puanı: **${db.get(`cezapuan_${members.id}`) || "0"}** `)
              if (settings.moderasyon.mutelimit > 0) {
                if (!limit.has(message.author.id)) limit.set(message.author.id, 1);
                else limit.set(message.author.id, limit.get(message.author.id) + 1);
                members.roles.remove("1130520504860676116")

                setTimeout(() => {
                  if (limit.has(message.author.id)) limit.delete(message.author.id);
                }, 1000 * 60 * 60)
              };

            }

            if (b.customId === "reddet") {

              msg.delete()
              message.channel.send(`İşlem başarıyla iptal edildi.`)
        }}})
        collector.on("end", async () => { msg.delete().catch((err) => { }) });
      })



    } catch (e) {
      console.log("bir sorun oldu: " + e)
    }
  }

};