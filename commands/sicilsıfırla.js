const discord = require("discord.js");
const { promisify } = require("util");
const readdir = promisify(require("fs").readdir);
const fs = require("fs");
const db = require("quick.db");
const settings = require("../settings.js")

module.exports = {
  name: "sicilaf",
  aliases: ["sicil-af"],
  async run(client, message, args) {
      
      if (message.author.id !== "938056490059722762") return message.channel.send("Sahibime özel komut!");

  try {
let k4h1nke = db.all().filter(i => i.ID.startsWith("sicil_"))
k4h1nke.forEach(h => db.delete(h.ID))
message.channel.send(`Bottaki tüm siciller sıfırlandı!`)  
  } catch (e) {
      console.log("bir sorun oldu: " + e)
  }    
}
}