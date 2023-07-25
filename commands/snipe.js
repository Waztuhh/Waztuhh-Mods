const { MessageEmbed } = require("discord.js");
const db = require("quick.db");
const moment = require("moment")
require('moment-duration-format');
const settings = require("../settings.js")

module.exports = {
  name: "snipe",
  aliases: [],
  async run(client, message, args) {
let guild = message.guild
let embed = new MessageEmbed()
let author = message.author
let channel = message.channel
    
        let hembed = new MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('RED')
        let embedss = new MessageEmbed().setColor('#2F3136').setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor(settings.bot.BotEmbedColor).setFooter({ text: `${settings.bot.footer}` })
        let mesaj = db.get(`snipe_${message.guild.id}_${message.channel.id}`);
        if (!mesaj) {
            
            return message.reply({ embeds: [hembed.setDescription(`Bu kanalda silinmiş bir mesaj bulunmamakta!`)] })
        }
        if (mesaj.icerik.toLowerCase().includes('discord.gg/') || mesaj.icerik.toLowerCase().includes('https') || mesaj.icerik.toLowerCase().includes('http') || mesaj.icerik.toLowerCase().includes('.com')) {
            
            return message.reply({ embeds: [hembed.setDescription(`Son silinen mesajda reklam bulunmakta!`)] })
        }
        let mesajYazari = await message.guild.members.cache.get(mesaj.yazar);
        if (mesaj.icerik) {
            return message.reply({ embeds: [embedss.setDescription(`
        
Mesaj Sahibi: ${mesajYazari ? mesajYazari : mesajYazari.tag} ( \`${mesajYazari.id}\` )
        Mesajın silinme tarihi: \`${moment.duration(Date.now() - mesaj.silinmeTarihi).format("D [gün], H [saat], m [dakika], s [saniye]")}\` önce 
        
        <a:mesaj:1131946514395168800> Silinen Mesaj: \`${mesaj.dosya ? "Atılan mesaj bir dosya içeriyor." : mesaj.icerik}\`
        `)] });
        }
    }
}