const { MessageEmbed } = require("discord.js");
const settings = require("../settings.js")
module.exports = {
  name: "rolidbak",
  aliases: [],
  async run(client, message, args) {
    const embed = new MessageEmbed()
      .setColor(settings.bot.BotEmbedColor)
      .setFooter({ text: `${settings.bot.footer}` })



if (!message.guild) return;

if (message.member.permissions.has("ADMINISTRATOR")) {
    rol = message.mentions.roles.first();
    if (!rol) return message.reply("Lütfen ID'sini öğrenmek istediğiniz rolü etiketletiniz");

    message.channel.send(`\`${rol.name}\` adlı yetkinin ID'si (\`${rol.id}\`)`)
} else {
    return message.reply("Bu komutu sadece `Yönetici` yetkisi olan kişiler kullanabilir!").then(x => x.delete({timeout: 5000}));
}
    

  }
}