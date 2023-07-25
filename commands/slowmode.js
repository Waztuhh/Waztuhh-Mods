const Discord = require('discord.js');
const db = require('quick.db');
const settings = require("../settings.js")
const limit = new Map();
const ms = require("ms");
const moment = require("moment");
moment.locale("tr");


module.exports = {
  name: "slowmode",
  aliases: ["yavaşmod"],
  async run(client, message, args) {
    const embed = new Discord.MessageEmbed()
      .setColor(settings.bot.BotEmbedColor)
      .setFooter({ text: settings.bot.footer})
      .setAuthor({ name: waztuhh.displayName , iconURL: waztuhh.user.displayAvatarURL({ dynamic: true })})

      if (!args[0])
      return message.channel.send({ embeds: [embed.setDescription(
        `Yavaş modu ayarlamam için bir sayı yazmalısın!`
      )] });
  if (args[0] > 1000) return message.channel.send({ embeds: [embed.setDescription("Slowmode en fazla 1000 olabilir." )] });
    if (isNaN(args[0])) return message.channel.send({ embeds: [embed.setDescription(`Lütfen sayı girin!`)] });
    let reason = message.content.slice(
      ".".length + 9 + args[0].length + 1
    );
    if (!reason) {
      reason == "InTheDark!";
    }
    message.channel.setRateLimitPerUser(args[0], reason);
    message.channel.send({embeds: [embed.setDescription(`Artık bu kanala **${args[0]}** saniyede bir mesaj yazılabilecek.`)]});
    
    }
  };





