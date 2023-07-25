const Discord = require('discord.js');
const db = require('quick.db');
const settings = require("../settings.js")
const limit = new Map();
const moment = require("moment");
moment.locale("tr");  

const { MessageButton,MessageActionRow } = require('discord.js');

module.exports = {
    name: "banner",
    aliases: [],
    async run(client, message, args,fetch) {
        const embed = new Discord.MessageEmbed()
let user = args.length > 0 ? message.mentions.users.first() || await client.users.fetch(args[0]) || message.author : message.author
const can = await client.api.users(user.id).get();
    if(!can.banner) return message.channel.send({content: `**${user.tag} Kullanıcısının banneri bulunmamakta!**`})
   let avatar = user.displayAvatarURL({ dynamic: true, size: 4096 });
    const row = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setLabel('Avatar Adresi')
          .setURL(`${avatar}`)
					.setStyle('LINK'),
			);
  
      message.channel.send({embeds: [embed.setImage(`https://cdn.discordapp.com/banners/${can.id}/${can.banner}?size=1024&gif`).setColor("RANDOM").setAuthor(user.tag, avatar)], components: [row]})
   
     
   
}}