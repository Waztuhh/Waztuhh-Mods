const { MessageEmbed } = require("discord.js")
const { MessageButton,MessageActionRow } = require('discord.js');
const settings = require("../settings")
module.exports = {
    name: "avatar",
    aliases: ["pp","av"],
    usage: `.av [@waztuhh/ID]`,
    kategori: "kullanıcı",
    async run(client, message, args) {
      if (!message.guild) return;
      const embed = new MessageEmbed()
      
  let user = args.length > 0 ? message.mentions.users.first() || await client.users.fetch(args[0]) || message.author : message.author
  let avatar = user.displayAvatarURL({ dynamic: true, size: 4096 });
    const can = await client.api.users(user.id).get();
       const rows = new MessageActionRow()
              .addComponents(
                  new MessageButton()
                      .setLabel('Banner Adresi')
            .setURL(`https://cdn.discordapp.com/banners/${can.id}/${can.banner}?size=1024&gif`)
                      .setStyle('LINK'),
              );
        
   if (user) {
        embed.setColor("RANDOM")
          embed.setAuthor(user.tag, avatar)
          embed.setImage(avatar)
      await message.channel.send({embeds: [embed], components: [rows]})
   } else {
    embed.setColor("RANDOM")
          embed.setAuthor(message.author.tag, avatar)
          embed.setImage(avatar)
      await message.channel.send({embeds: [embed], components: [rows]})
    
             }
     
              }
    }