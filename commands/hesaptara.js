const discord = require("discord.js");
const Discord = require('discord.js');
const db = require('quick.db');
const settings = require("../settings.js")
const limit = new Map();
const ms = require("ms")
const moment = require("moment");
moment.locale("tr");

module.exports = {
  name: "hesaptara",
  aliases: ["ht","hesap-tara"],
  async run(client, message, args) {

    if(!message.member.permissions.has("ADMINISTRATOR")) return message.reply("yetkin yok!")
    let süre = args[0];
    let zaman = args[1];
    let prefix = settings.prefix;
    if(!süre || !zaman || zaman.includes('hafta') || zaman.includes('ay') || zaman !== "saniye" && zaman !== "sn" && zaman !== "ay" && zaman !== "dakika" && zaman !== "dk" && zaman !== "saat" && zaman !== "sa" && zaman !== "gün" && zaman !== "g" && zaman !== "yıl" && zaman !== "y") return message.reply(`Süre belirtmelisin! (Süre olarak ay veya hafta yazılamaz) **Örn:** \`.hesaptara 10 gün\``);
    let üyeler = message.guild.members.cache.filter(üye => !üye.user.bot && new Date().getTime() - üye.user.createdAt.getTime() < ms((süre+zaman).replace('saniye', 's').replace('sn', 's').replace('dakika', 'm').replace('dk', 'm').replace('saat', 'h').replace('sa', 'h').replace('gün', 'd').replace('g', 'd').replace('yıl', 'y')));
    message.reply(`**${süre} ${zaman}** süresinden az olan "${üyeler.size}" kullanıcı bulundu;
    **─────────────────────────────**
    ${üyeler.map(qwe => "<@" + qwe.user.id + "> **(**" + qwe.user.id + "**)**").join('\n')} `
   )
  }
}