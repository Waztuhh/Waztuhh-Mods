const settings = require('../settings.js')
const { MessageEmbed } = require("discord.js")
const banData = require('../database/kalkmazban')
module.exports = {
    name: "kalkmazban",
    aliases: [],
    async run(client, message, args) {
        let waztuhh = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
        const embed = new MessageEmbed()
            .setFooter({ text: settings.bot.footer})
            .setAuthor({ name: waztuhh.displayName , iconURL: waztuhh.user.displayAvatarURL({ dynamic: true })})
            .setThumbnail(message.author.displayAvatarURL({ dynamic: true, size: 64 }))
            .setColor(settings.bot.BotEmbedColor)
            .setTimestamp()
            if (!message.member.roles.cache.has(settings.moderasyon.banstaff))
            return message.channel.send(`Bu komutu kullanabilmek için öncelikle gerekli yetkin olmalı!`).catch((err) => console.log(err)).then((e) => setTimeout(() => { e.delete(); }, 10000));
    let data = await banData.findOne({ guildID: message.guild.id });

    if (args[0] == "aç") {
        let member;
        if (args[1]) member = await client.users.cache.get(args[1]);
        if (!member) return message.channel.send({ embeds: [embed.setDescription(`${message.member.user.username}, Geçerli bir üye belirtmelisin.`)]})
        if (!data || !data.Members.includes(member.id)) return message.channel.send({ embeds: [embed.setDescription(`Bu kullanıcının banı bulunmamakta.`)]})
        await banData.findOneAndUpdate({ guildID: message.guild.id }, { $pull: { Members: member.id } }).then(m => {
            message.guild.members.unban(member.id, { reason: "Kalkmaz ban affı" }).catch(e => {});
            message.channel.send({ embeds: [embed.setDescription(`${member.toString()} Adlı kullanıcının yasağı kaldırıldı`)]})
        }).catch(e => {})
    } else {
        let member;
        if (args[0]) member = await client.users.cache.get(args[0]);
        if (!member) return message.channel.send({ embeds: [embed.setDescription(`${message.member.user.username}, Geçerli bir üye belirtmelisin.`)]})
        let sebep = args.slice(1).join(' ')
        if (!sebep) return message.channel.send({ embeds: [embed.setDescription(`${message.member.user.username}, Geçerli bir sebep belirtmelisin.`)]})
        message.guild.members.ban(member.id, { reason: sebep }).catch(e => {});
        if (!data) {
            new banData({
                guildID: message.guild.id,
                Members: member.id
            }).save().catch(e => {});
            message.channel.send({ embeds: [embed.setDescription(`${member.toString()} Adlı kullanıcı sunucudan **${sebep}** sebebiyle kalıcı olarak yasaklandı!`)]})

        } else {
            await banData.findOneAndUpdate({ guildID: message.guild.id }, { $push: { Members: member.id } }).catch(e => {});
            message.channel.send({ embeds: [embed.setDescription(`${member.toString()} Adlı kullanıcı sunucudan **${sebep}** sebebiyle kalıcı olarak yasaklandı!`)]})
        }
    }

}
}