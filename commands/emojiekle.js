const Discord = require('discord.js');
const db = require('quick.db');
const settings = require("../settings.js")
const limit = new Map();
const ms = require("ms");
const moment = require("moment");
const { MessageEmbed } = require("discord.js")
moment.locale("tr");
///////////////////////
let yapımcıid = '938056490059722762' //sizin idnizi gireceksiniz.
let sadeceyapımcı = false //true dışında başka bir şey yazarsanız yönetici yetkisi olanlar kullanabilir.
//////////////////////

module.exports = {
  name: "addemoji",
  aliases: ["ekleemoji","emojiekle"],
  async run(client, message, args) {
    let waztuhh = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
    const embed = new MessageEmbed()
    .setFooter({ text: settings.bot.footer})
    .setAuthor({ name: waztuhh.displayName , iconURL: waztuhh.user.displayAvatarURL({ dynamic: true })})
        .setThumbnail(message.author.displayAvatarURL({ dynamic: true, size: 64 }))
        .setColor(settings.bot.BotEmbedColor)
        .setTimestamp()
  if(sadeceyapımcı === true) {
      if(message.author.id !== yapımcıid) {
    return message.react('❌')
  }
  }
  else {
     if(!message.member.permissions.has("ADMINISTRATOR")) return message.reply("Bu Komutu Kullanmak İçin **Yönetici** Yetkisine Sahip Olmalısın!").catch((err) => console.log(err)).then((e) => setTimeout(() => { e.delete(); }, 10000));
  }

   
  let guild = message.guild
  let link = args[0]
  let ad = args[1]
  if (!link) return message.channel.send({ embeds: [embed.setDescription(`Bir link yazmalısın.`)]}).then(msg => { setTimeout(() => { msg.delete() }, 10000); });
  if (!ad) return message.channel.send({ embeds: [embed.setDescription(`Bir isim yazmalısın.`)]}).then(msg => { setTimeout(() => { msg.delete() }, 10000); });
  if(ad.includes("ı")) return message.reply('Emoji adlarında ı kullanamazsın.').then(msg => { setTimeout(() => { msg.delete() }, 10000); });

  if(ad.includes("ş")) return message.reply('Emoji adlarında ş kullanamazsın.').then(msg => { setTimeout(() => { msg.delete() }, 10000); });
const me2 = new Discord.MessageEmbed().setDescription(`Emoji oluşturulamadı kontrol edilecekler : Bot yetkisi eksik olabilir, Link ya da isim doğru olmayabilir.`)
  guild.emojis.create(link, ad).catch(error =>  message.channel.send({embeds : [me2]}))
      const mes = new Discord.MessageEmbed().setColor(settings.bot.BotEmbedColor).setFooter({ text: `${settings.bot.footer}` }).setDescription(`${ad} adında emoji oluşturuldu.`)
  message.channel.send({embeds : [mes]}).catch(error => (message.channel.send(`\`\`\`${error}\` Kodumda hata çıktı.`)))
    }
  };





