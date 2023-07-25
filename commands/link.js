const discord = require('discord.js')
const Discord = require('discord.js')
const settings = require("../settings.js")


module.exports = {
  name: "link",
  aliases: [],
  async run(client, message, args) {
if(!message.guild.vanityURLCode) return message.reply({ content:"Sunucuda bir özel url yok."});
const url = await message.guild.fetchVanityData();

message.channel.send( `discord.gg/${message.guild.vanityURLCode} | Toplam kullanım: **${url.uses}**`)
},
}