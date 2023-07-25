const discord = require("discord.js");
const { promisify } = require("util");
const readdir = promisify(require("fs").readdir);
const fs = require("fs");
const db = require("quick.db");
const settings = require("../settings.js")

module.exports = {
    name: "eval",
    aliases: [],
    usage: `${settings.bot.botPrefix}eval [CODE]`,
    kategori: "sahip",
    async run(client, message, args){
      
      if (message.author.id !== `530407551699779588`) return message.channel.send("Sahibime özel komut!");
  try {
    var code = args.join(" ");
    var evaled = eval(code);
    if (typeof evaled !== "string") evaled = require("util").inspect(evaled);
    let Embed = new discord.MessageEmbed()
      .addField("Giriş", "```js\n" + code + "```")
      .setDescription("```js\n" + clean(evaled) + "```");
    if (Embed.description.length >= 2048)
      Embed.description = Embed.description.substr(0, 2042) + "```...";
    return message.channel.send({ embeds: [Embed]});
  } catch (err) {
    message.channel.send(`\`\`js\nHATA\` \`\`\`xl\n${clean(err)}\n\`\`\``);
  }
  function clean(text) {
    if (typeof text === "string")
      return text
        .replace(/`/g, "`" + String.fromCharCode(8203))
        .replace(/@/g, "@" + String.fromCharCode(8203));
    else return text;
  }
    
}
}