const { Client, Message, MessageEmbed, MessageAttachment} = require("discord.js");
const settings = require("../settings")
module.exports = {
    name: "roldenetim",
    aliases: [],

   /**
   * @param {Client} client 
   */
  onLoad: function (client) {

  },

   /**
   * @param {Client} client 
   * @param {Message} message 
   * @param {Array<String>} args 
   */

    async run(client, message, args) {
    let waztuhh = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
    const embed = new MessageEmbed()
        
        .setFooter({ text: settings.bot.footer})
        .setAuthor({ name: waztuhh.displayName , iconURL: waztuhh.user.displayAvatarURL({ dynamic: true })})
        .setThumbnail(message.author.displayAvatarURL({ dynamic: true, size: 64 }))
        .setColor(settings.bot.BotEmbedColor)
        .setTimestamp()
        if (!message.member.roles.cache.has(settings.moderasyon.ownerrole))
        return message.channel.send(`Bu komutu kullanabilmek için öncelikle gerekli yetkin olmalı!`).catch((err) => console.log(err)).then((e) => setTimeout(() => { e.delete(); }, 10000));
    let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[0]);
    if(!role) return message.channel.send(`\`Rol Belitrilmedi!\` Lütfen bir rol etiketleyin veya IDsini girin.` + ` \`.roldenetim <@Rol/ID>\``);
    let members = role.members.map(x => x)
    let sesteOlmayanlar = members.filter(member => !member.voice.channelID);  
    let sesteOlanlar = members.filter(member => member.voice.channel);
     message.channel.send({ embeds: [embed.setDescription("**Rol Bilgisi** : " + role.name + " | **ID:** " + role.id + " | " + role.members.size + " **Toplam Üye** | " + sesteOlmayanlar.length + " **Seste Olmayan Üye**" ,{ code: "fix", split: true } )]})
     if(sesteOlanlar.length >= 1) message.channel.send(embed.setDescription(`\`${role.name}\` isimli rolde seste bulunan üyeleri aşağı sıraladım kopyalarak etiket atabilirsin veya profillerini görebilirsin.\n\`\`\`${sesteOlanlar.join(`, `)}\`\`\``)).catch(acar => {
      let dosyahazırla = new MessageAttachment(Buffer.from(sesteOlanlar.slice().join(`\n`)), `${role.id}-sesteolanlar.txt`);
      message.channel.send(`:no_entry_sign: ${role.name} isimli rolün __seste olanları__ **Discord API** sınırını geçtiği için metin belgesi hazırlayıp gönderdim.`, dosyahazırla)});
     if(sesteOlmayanlar.length >= 1) message.channel.send(`${sesteOlmayanlar.slice(0, sesteOlmayanlar.length/1).join(`, `)}`, { code: "diff", split: true}).catch(acar => {
      let dosyahazırla = new MessageAttachment(Buffer.from(sesteOlmayanlar.slice().join(`\n`)), `${role.id}-sesteolmayanlar.txt`);
      message.channel.send(`:no_entry_sign: ${role.name} isimli rolün __seste olmayanları__ **Discord API** sınırını geçtiği için metin belgesi hazırlayıp gönderdim.`, dosyahazırla)});
   }
};