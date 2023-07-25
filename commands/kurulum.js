const discord = require('discord.js')
const Discord = require('discord.js')
const settings = require("../settings.js")


module.exports = {
  name: "kurulum",
  aliases: [],
  async run(client, message, args) {
    try {

      if (message.author.id !== `530407551699779588`) return message.channel.send("Sahibime özel komut!");
      const buttonlar = new Discord.MessageActionRow()
      .addComponents(
      new discord.MessageButton()
        .setStyle("PRIMARY")
        .setLabel("Emoji")
        .setCustomId("lock")
      )
      .addComponents(
      new discord.MessageButton()
        .setStyle("PRIMARY")
        .setLabel("Mod")
        .setCustomId("unlock")
      )
      .addComponents(
        new discord.MessageButton()
        .setStyle("PRIMARY")
        .setLabel("Guard")
        .setCustomId("guard")
      )
      .addComponents(
        new discord.MessageButton()
        .setStyle("PRIMARY")
        .setLabel("Database")
        .setCustomId("database")
      );

        const embeds = new Discord.MessageEmbed()
        .setColor(settings.bot.BotEmbedColor)
        .setFooter(`${settings.bot.footer}`)
        .setDescription(`Kurulumunu yapmak için öncelikle bir kurulum türü seçmelisiniz.\n\n*Aşağıda verilmiş butonlardan kurulum türünüzü seçin ve kurulumu başlatın.*`)
      message.channel.send({ embeds: [embeds], components: [buttonlar] }).then(msg => {

        
        const filter = b => b.user.id === message.author.id;
        const collector = msg.createMessageComponentCollector({ filter, time: 10000 });
       
        collector.on('collect', async b => {
          
        if (b.isButton()) {
        
          if (b.customId === 'lock') {
            const emojis = [
                { name: "maviyildiz_Waztuhh", url: "https://cdn.discordapp.com/emojis/892132033206308935.gif?size=4096&quality=lossless" },
                { name: "ibneyildiz_Waztuhh", url: "https://cdn.discordapp.com/emojis/971480932567613450.gif?size=4096&quality=lossless" },
                { name: "kirmiziyildiz_Waztuhh", url: "https://cdn.discordapp.com/emojis/971481003153567774.gif?size=4096&quality=lossless" },
                { name: "off_Waztuhh", url: "https://cdn.discordapp.com/emojis/981276956211425313.webp?size=96&quality=lossless" },
                { name: "on_Waztuhh", url: "https://cdn.discordapp.com/emojis/977661752105902090.webp?size=96&quality=lossless" },
                { name: "Waztuhh_elsallama", url: "https://cdn.discordapp.com/emojis/928066213756670062.gif?size=4096&quality=lossless" },
                { name: "Waztuhh_tik", url: "https://cdn.discordapp.com/emojis/977619609928761444.gif?size=96&quality=lossless" },
                { name: "Waztuhh_carpi", url: "https://cdn.discordapp.com/emojis/977619589485695026.gif?size=96&quality=lossless" },
                { name: "Waztuhh_spo", url: "https://cdn.discordapp.com/emojis/986317837436088330.webp?size=96&quality=lossless" },
                { name: "Waztuhh_moryildiz", url: "https://cdn.discordapp.com/emojis/929349223084863508.gif?size=4096&quality=lossless" },
                { name: "Waztuhh_sariyildiz", url: "https://cdn.discordapp.com/emojis/767711077659574283.gif?size=4096&quality=lossless" },
            ]
            emojis.forEach(async (x) => {
   
                const emoji = await message.guild.emojis.create(x.url, x.name);
              
            })
        
                
            
            msg.delete().catch(() => {})
            const embedss = new Discord.MessageEmbed()
              .setColor(settings.bot.BotEmbedColor)
              .setFooter({ text: `${settings.bot.footer}` })
              .setDescription(`Lütfen Biraz Bekleyiniz Emojiler Kurulmak Üzere.`)
           await message.channel.send({ embeds: [embedss] })
          }
          
          
          if (b.customId === 'unlock') {
            message.reply(`Bot loglarının kurulumuna başlanıyor.`)
            const parent = await message.guild.channels.create('Waztuhh Mod Log', { type: 'GUILD_CATEGORY' });
         await message.guild.channels.create('Family', { type: 'GUILD_TEXT', parent: parent.id });
        await message.guild.channels.create('yasaklı-tag', { type: 'GUILD_TEXT', parent: parent.id });
        await message.guild.channels.create('command-log', { type: 'GUILD_TEXT', parent: parent.id });
        await message.guild.channels.create('voice-log', { type: 'GUILD_TEXT', parent: parent.id });
        await message.guild.channels.create('message-log', { type: 'GUILD_TEXT', parent: parent.id });
        await message.guild.channels.create('suspicious-log', { type: 'GUILD_TEXT', parent: parent.id });
        await message.guild.channels.create('register-log', { type: 'GUILD_TEXT', parent: parent.id });
        await message.guild.channels.create('başvuru-log', { type: 'GUILD_TEXT', parent: parent.id });
        await message.guild.channels.create('nickname-log', { type: 'GUILD_TEXT', parent: parent.id });
        await message.guild.channels.create('warn-log', { type: 'GUILD_TEXT', parent: parent.id });
        await message.guild.channels.create('unregister-log', { type: 'GUILD_TEXT', parent: parent.id });
        await message.guild.channels.create('jail-log', { type: 'GUILD_TEXT', parent: parent.id });
        await message.guild.channels.create('mute-log', { type: 'GUILD_TEXT', parent: parent.id });
        await message.guild.channels.create('cezapuan-log', { type: 'GUILD_TEXT', parent: parent.id });
        await message.guild.channels.create('rollog-log', { type: 'GUILD_TEXT', parent: parent.id });
 
            msg.delete().catch(() => {})
            const embeds = new Discord.MessageEmbed()
              .setColor(settings.bot.BotEmbedColor)
              .setFooter({ text: `${settings.bot.footer}` })
              .setDescription(`Mod Loglarının kurulumu tamamlandı!`)
            message.channel.send({ embeds: [embeds] })
     
          }
          if (b.customId === 'guard') {
            message.reply(`Bot loglarının kurulumuna başlanıyor.`)
            const parent = await message.guild.channels.create('Waztuhh Guard Log', { type: 'GUILD_CATEGORY' });
         await message.guild.channels.create('guardian-log', { type: 'GUILD_TEXT', parent: parent.id });
         

 
            msg.delete().catch(() => {})
            const embeds = new Discord.MessageEmbed()
              .setColor(settings.bot.BotEmbedColor)
              .setFooter({ text: `${settings.bot.footer}` })
              .setDescription(`Guard Loglarının kurulumu tamamlandı!`)
            message.channel.send({ embeds: [embeds] })
     
          }
          if (b.customId === 'database') {
            message.reply(`Bot loglarının kurulumuna başlanıyor.`)
            const parent = await message.guild.channels.create('Waztuhh Db log', { type: 'GUILD_CATEGORY' });
         await message.guild.channels.create('Database-log', { type: 'GUILD_TEXT', parent: parent.id });
         

 
            msg.delete().catch(() => {})
            const embeds = new Discord.MessageEmbed()
              .setColor(settings.bot.BotEmbedColor)
              .setFooter({ text: `${settings.bot.footer}` })
              .setDescription(`Database Loglarının kurulumu tamamlandı.`)
            message.channel.send({ embeds: [embeds] })
     
          }

          }
        });

        collector.on('end', () => { message.delete().catch(() => {}) && msg.delete().catch(() => {}) });

      })
    } catch (e) {
      console.log("bir sorun oldu: " + e)
      const embedss = new Discord.MessageEmbed()
        .setColor(settings.bot.BotEmbedColor)
        .setFooter({ text: `${settings.bot.footer}` })
        .setDescription(`Sistemsel bir sorun oluştu`)
      message.channel.send({ embeds: [embedss] })
    }
  }
}