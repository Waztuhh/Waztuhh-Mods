const { Client, MessageActionRow, MessageSelectMenu, MessageButton, MessageEmbed, Collection } = require('discord.js')
const Discord = require('discord.js')
const discord = require('discord.js')
const { prefix } = require('./settings.js')
const client = new Client({ intents: 32767 })
const fs = require('fs')
const settings = require("./settings.js")
const ayar = require("./settings.js")
const moment = require("moment");
require("moment-duration-format");
const db = require("quick.db")
const ms = require("ms")
//const csms = require("parse-ms");
const cdb = require("quick.db");
const mongoose = require('mongoose');
mongoose.connect(settings.bot.mongoURL , { useUnifiedTopology: true }).then(() => console.log("MongoDB Aktif!")).catch((err) => console.log(err));

client.login(settings.bot.botToken).then(() => console.log('\x1b[31m%s\x1b[0m', "Bota Baglanma Başarılı!")).catch(e => {
  console.log(e)
  process.exit(1)
})
client.files = fs.readdirSync;
client.on("ready", async () => {
  client.user.setActivity(`${settings.bot.footer}`, {
    type: "STREAMING",
    url: "https://www.twitch.tv/waztuhhyy"
    });
  });

  client.on("ready", async () => {
  const { joinVoiceChannel } = require('@discordjs/voice');
   client.on('ready', () => { 
    joinVoiceChannel({
  channelId: settings.bot.botVoice ,
  guildId: settings.sunucu.sunucuid ,       
  adapterCreator: client.guilds.cache.get(settings.sunucu.sunucuid).voiceAdapterCreator
      });
  });
    }); 
const path = require('path');

//((((((-)))))) REKLAM ENGELLEME BAŞLANGIÇ

client.on("message", async message => {
  let waztu = `${settings.bot.botOwner}`
  if (message.author.bot || !message.guild) return;
  if(message.author.id == `530407551699779588`) return;

 
      const reklamfiltre = ["discord.gg","discord.com/invite","discordapp.com/invite","https://","dc.gg/","dc.gg","d.gg","dc.g","d.g","dc.gg/","d.gg/","dc.g/","d.g/","dcapp/inv","dcapp/inv/"]

         if (reklamfiltre.some(word => message.content.includes(word))) {
          if(message.deletable) message.delete({timeout: 1000}).catch(console.error); return message.channel.send(`<@${message.author.id}> Reklam yapman yasak lütfen reklam yapmamaya dikkat et !`);
         
  }})
  client.on("messageUpdate", async(oldMessage, newMessage) => {    
    let waztu = `${settings.bot.botOwner}`  
    if (newMessage.author.bot || !newMessage.guild) return;
    if(message.author.id == `530407551699779588`) return;

    
           const reklamfiltre = ["discord.gg","discord.com/invite","discordapp.com/invite","https://","dc.gg/","dc.gg","d.gg","dc.g","d.g","dc.gg/","d.gg/","dc.g/","d.g/","dcapp/inv","dcapp/inv/"]
           if (reklamfiltre.some(word => newMessage.content.includes(word))) {
             if(newMessage.deletable) newMessage.delete({timeout: 1000}).catch(console.error); return newMessage.channel.send('Reklam yapman yasak lütfen reklam yapmamaya dikkat et !')
   }})
   //((((((-)))))) REKLAM ENGELLEME bitiş
   //((((((-)))))) Küfür engel başlangıç
   const waztuhhküfür = ["31","otuz1","3bir","0ç","allahoc","allahoç","allahamk","allahaq","0r0spuc0cu","4n4n1 sk3r1m","p1c","@n@nı skrm","evladi","orsb","orsbcogu","amnskm","anaskm","oc","abaza","abazan","ag","a\u011fz\u0131na s\u0131\u00e7ay\u0131m","fuck","shit","ahmak","seks","sex","allahs\u0131z","amar\u0131m","ambiti","am biti","amc\u0131\u011f\u0131","amc\u0131\u011f\u0131n","amc\u0131\u011f\u0131n\u0131","amc\u0131\u011f\u0131n\u0131z\u0131","amc\u0131k","amc\u0131k ho\u015faf\u0131","amc\u0131klama","amc\u0131kland\u0131","amcik","amck","amckl","amcklama","amcklaryla","amckta","amcktan","amcuk","am\u0131k","am\u0131na","amına","am\u0131nako","am\u0131na koy","am\u0131na koyar\u0131m","am\u0131na koyay\u0131m","am\u0131nakoyim","am\u0131na koyyim","am\u0131na s","am\u0131na sikem","am\u0131na sokam","am\u0131n feryad\u0131","am\u0131n\u0131","am\u0131n\u0131 s","am\u0131n oglu","am\u0131no\u011flu","am\u0131n o\u011flu","am\u0131s\u0131na","am\u0131s\u0131n\u0131","amina","amina g","amina k","aminako","aminakoyarim","amina koyarim","amina koyay\u0131m","amina koyayim","aminakoyim","aminda","amindan","amindayken","amini","aminiyarraaniskiim","aminoglu","amin oglu","amiyum","amk","amkafa","amk \u00e7ocu\u011fu","amlarnzn","aml\u0131","amm","ammak","ammna","amn","amna","amnda","amndaki","amngtn","amnn","amona","amq","ams\u0131z","amsiz","amsz","amteri","amugaa","amu\u011fa","amuna","ana","anaaann","anal","analarn","anam","anamla","anan","anana","anandan","anan\u0131","anan\u0131","anan\u0131n","anan\u0131n am","anan\u0131n am\u0131","anan\u0131n d\u00f6l\u00fc","anan\u0131nki","anan\u0131sikerim","anan\u0131 sikerim","anan\u0131sikeyim","anan\u0131 sikeyim","anan\u0131z\u0131n","anan\u0131z\u0131n am","anani","ananin","ananisikerim","anani sikerim","ananisikeyim","anani sikeyim","anann","ananz","anas","anas\u0131n\u0131","anas\u0131n\u0131n am","anas\u0131 orospu","anasi","anasinin","anay","anayin","angut","anneni","annenin","annesiz","anuna","aq","a.q","a.q.","aq.","ass","atkafas\u0131","atm\u0131k","att\u0131rd\u0131\u011f\u0131m","attrrm","auzlu","avrat","ayklarmalrmsikerim","azd\u0131m","azd\u0131r","azd\u0131r\u0131c\u0131","babaannesi ka\u015far","baban\u0131","baban\u0131n","babani","babas\u0131 pezevenk","baca\u011f\u0131na s\u0131\u00e7ay\u0131m","bac\u0131na","bac\u0131n\u0131","bac\u0131n\u0131n","bacini","bacn","bacndan","bacy","bastard","b\u0131z\u0131r","bitch","biting","boner","bosalmak","bo\u015falmak","cenabet","cibiliyetsiz","cibilliyetini","cibilliyetsiz","cif","cikar","cim","\u00e7\u00fck","dalaks\u0131z","dallama","daltassak","dalyarak","dalyarrak","dangalak","dassagi","diktim","dildo","dingil","dingilini","dinsiz","dkerim","domal","domalan","domald\u0131","domald\u0131n","domal\u0131k","domal\u0131yor","domalmak","domalm\u0131\u015f","domals\u0131n","domalt","domaltarak","domalt\u0131p","domalt\u0131r","domalt\u0131r\u0131m","domaltip","domaltmak","d\u00f6l\u00fc","d\u00f6nek","d\u00fcd\u00fck","eben","ebeni","ebenin","ebeninki","ebleh","ecdad\u0131n\u0131","ecdadini","embesil","emi","fahise","fahi\u015fe","feri\u015ftah","ferre","fuck","fucker","fuckin","fucking","gavad","gavat","giberim","giberler","gibis","gibi\u015f","gibmek","gibtiler","goddamn","godo\u015f","godumun","gotelek","gotlalesi","gotlu","gotten","gotundeki","gotunden","gotune","gotunu","gotveren","goyiim","goyum","goyuyim","goyyim","g\u00f6t","g\u00f6t deli\u011fi","g\u00f6telek","g\u00f6t herif","g\u00f6tlalesi","g\u00f6tlek","g\u00f6to\u011flan\u0131","g\u00f6t o\u011flan\u0131","g\u00f6to\u015f","g\u00f6tten","g\u00f6t\u00fc","g\u00f6t\u00fcn","g\u00f6t\u00fcne","g\u00f6t\u00fcnekoyim","g\u00f6t\u00fcne koyim","g\u00f6t\u00fcn\u00fc","g\u00f6tveren","g\u00f6t veren","g\u00f6t verir","gtelek","gtn","gtnde","gtnden","gtne","gtten","gtveren","hasiktir","hassikome","hassiktir","has siktir","hassittir","haysiyetsiz","hayvan herif","ho\u015faf\u0131","h\u00f6d\u00fck","hsktr","huur","\u0131bnel\u0131k","ibina","ibine","ibinenin","ibne","ibnedir","ibneleri","ibnelik","ibnelri","ibneni","ibnenin","ibnerator","ibnesi","idiot","idiyot","imansz","ipne","iserim","i\u015ferim","ito\u011flu it","kafam girsin","kafas\u0131z","kafasiz","kahpe","kahpenin","kahpenin feryad\u0131","kaka","kaltak","kanc\u0131k","kancik","kappe","karhane","ka\u015far","kavat","kavatn","kaypak","kayyum","kerane","kerhane","kerhanelerde","kevase","keva\u015fe","kevvase","koca g\u00f6t","kodu\u011fmun","kodu\u011fmunun","kodumun","kodumunun","koduumun","koyarm","koyay\u0131m","koyiim","koyiiym","koyim","koyum","koyyim","krar","kukudaym","laciye boyad\u0131m","libo\u015f","madafaka","malafat","malak","mcik","memelerini","mezveleli","minaamc\u0131k","mincikliyim","mna","monakkoluyum","motherfucker","mudik","oc","ocuu","ocuun","O\u00c7","o\u00e7","o. \u00e7ocu\u011fu","o\u011flan","o\u011flanc\u0131","o\u011flu it","orosbucocuu","orospu","orospucocugu","orospu cocugu","orospu \u00e7oc","orospu\u00e7ocu\u011fu","orospu \u00e7ocu\u011fu","orospu \u00e7ocu\u011fudur","orospu \u00e7ocuklar\u0131","orospudur","orospular","orospunun","orospunun evlad\u0131","orospuydu","orospuyuz","orostoban","orostopol","orrospu","oruspu","oruspu\u00e7ocu\u011fu","oruspu \u00e7ocu\u011fu","osbir","ossurduum","ossurmak","ossuruk","osur","osurduu","osuruk","osururum","otuzbir","\u00f6k\u00fcz","\u00f6\u015fex","patlak zar","penis","pezevek","pezeven","pezeveng","pezevengi","pezevengin evlad\u0131","pezevenk","pezo","pic","pici","picler","pi\u00e7","pi\u00e7in o\u011flu","pi\u00e7 kurusu","pi\u00e7ler","pipi","pipi\u015f","pisliktir","porno","pussy","pu\u015ft","pu\u015fttur","rahminde","revizyonist","s1kerim","s1kerm","s1krm","sakso","saksofon","saxo","sekis","serefsiz","sevgi koyar\u0131m","sevi\u015felim","sexs","s\u0131\u00e7ar\u0131m","s\u0131\u00e7t\u0131\u011f\u0131m","s\u0131ecem","sicarsin","sie","sik","sikdi","sikdi\u011fim","sike","sikecem","sikem","siken","sikenin","siker","sikerim","sikerler","sikersin","sikertir","sikertmek","sikesen","sikesicenin","sikey","sikeydim","sikeyim","sikeym","siki","sikicem","sikici","sikien","sikienler","sikiiim","sikiiimmm","sikiim","sikiir","sikiirken","sikik","sikil","sikildiini","sikilesice","sikilmi","sikilmie","sikilmis","sikilmi\u015f","sikilsin","sikim","sikimde","sikimden","sikime","sikimi","sikimiin","sikimin","sikimle","sikimsonik","sikimtrak","sikin","sikinde","sikinden","sikine","sikini","sikip","sikis","sikisek","sikisen","sikish","sikismis","siki\u015f","siki\u015fen","siki\u015fme","sikitiin","sikiyim","sikiym","sikiyorum","sikkim","sikko","sikleri","sikleriii","sikli","sikm","sikmek","sikmem","sikmiler","sikmisligim","siksem","sikseydin","sikseyidin","siksin","siksinbaya","siksinler","siksiz","siksok","siksz","sikt","sikti","siktigimin","siktigiminin","sikti\u011fim","sikti\u011fimin","sikti\u011fiminin","siktii","siktiim","siktiimin","siktiiminin","siktiler","siktim","siktim","siktimin","siktiminin","siktir","siktir et","siktirgit","siktir git","siktirir","siktiririm","siktiriyor","siktir lan","siktirolgit","siktir ol git","sittimin","sittir","skcem","skecem","skem","sker","skerim","skerm","skeyim","skiim","skik","skim","skime","skmek","sksin","sksn","sksz","sktiimin","sktrr","skyim","slaleni","sokam","sokar\u0131m","sokarim","sokarm","sokarmkoduumun","sokay\u0131m","sokaym","sokiim","soktu\u011fumunun","sokuk","sokum","soku\u015f","sokuyum","soxum","sulaleni","s\u00fclaleni","s\u00fclalenizi","s\u00fcrt\u00fck","\u015ferefsiz","\u015f\u0131ll\u0131k","taaklarn","taaklarna","tarrakimin","tasak","tassak","ta\u015fak","ta\u015f\u015fak","tipini s.k","tipinizi s.keyim","tiyniyat","toplarm","topsun","toto\u015f","vajina","vajinan\u0131","veled","veledizina","veled i zina","verdiimin","weled","weledizina","whore","xikeyim","yaaraaa","yalama","yalar\u0131m","yalarun","yaraaam","yarak","yaraks\u0131z","yaraktr","yaram","yaraminbasi","yaramn","yararmorospunun","yarra","yarraaaa","yarraak","yarraam","yarraam\u0131","yarragi","yarragimi","yarragina","yarragindan","yarragm","yarra\u011f","yarra\u011f\u0131m","yarra\u011f\u0131m\u0131","yarraimin","yarrak","yarram","yarramin","yarraminba\u015f\u0131","yarramn","yarran","yarrana","yarrrak","yavak","yav\u015f","yav\u015fak","yav\u015fakt\u0131r","yavu\u015fak","y\u0131l\u0131\u015f\u0131k","yilisik","yogurtlayam","yo\u011furtlayam","yrrak","z\u0131kk\u0131m\u0131m","loxyoc","zigsin","zikeyim","zikiiim","zikiim","zikik","zikim","ziksiiin","ziksiin","zulliyetini","zviyetini"];
      
client.on("message", async message => {
  let waztu = `${settings.bot.botOwner}`
  if (message.author.bot || !message.guild) return;
  if(message.author.id == `530407551699779588`) return;

  

  
       if (waztuhhküfür.some(waztu => ` ${message.content.toLowerCase()} `.includes(` ${waztu} `))) { 

        if(message.deletable) message.delete({timeout: 2000}).catch(console.error); return message.channel.send('Küfür etmen yasak lütfen küfür içerikli mesaj atmamaya dikkat et.')
      }})



      client.on("messageUpdate", async(oldMessage, newMessage) => { 
        let waztu = `${settings.bot.botOwner}`
        if (newMessage.author.bot || !newMessage.guild) return;
        if(newMessage.author.id == `530407551699779588`) return;
      
        
         
             if (waztuhhküfür.some(waztuhh => ` ${newMessage.content.toLowerCase()} `.includes(` ${waztuhh} `))) {
               if(newMessage.deletable) newMessage.delete({timeout: 2000}).catch(console.error); return newMessage.channel.send('Küfür etmen yasak lütfen küfür içerikli mesaj atmamaya dikkat et.')
           }})

              //((((((-)))))) Küfür engel bitiş
client.on('messageCreate', async message => {
  try {
    let client = message.client
    if (message.author.bot) return
    if (message.channel.type == "DM") return
    if (!message.content.startsWith(settings.bot.botPrefix)) return
    let command = message.content.split(' ')[0].slice(settings.bot.botPrefix.length)
    let params = message.content.split(' ').slice(1)
    let cmd
    if (client.commands.has(command)) {
      cmd = client.commands.get(command)
    } else if (client.aliases.has(command)) {
      cmd = client.commands.get(client.aliases.get(command))
    }
    if (cmd) {
      cmd.run(client, message, params)
    }
  } catch (e) {
    message.reply({
      embeds: [
        new MessageEmbed()
          .setDescription(`<a:hayir:1131579308981358624> Bir hata oluştu!`)
      ]
    })
    console.log(e)
  }

})



client.on('messageCreate', async message => {

  const embed = new Discord.MessageEmbed()
    .setColor(settings.bot.BotEmbedColor)
    .setFooter({ text: `${settings.bot.footer}` })

  if (!db.has(`afk_${message.author.id}`)) return;
  if (['.afk', 'afk'].some(a => message.content.includes(a))) return;
  db.delete(`afk_${message.author.id}`)
  message.member.setNickname(message.author.username).catch((err) => { })
  message.channel.send({ embeds: [embed.setDescription(`AFK modundan çıkış yaptınız.`)] }).catch((err) => console.log(err)).then((e) => setTimeout(() => { e.delete(); }, 6000))
})

client.on('messageCreate', async message => {
  const embed = new Discord.MessageEmbed()
    .setColor(settings.bot.BotEmbedColor)
    .setFooter({ text: `${settings.bot.footer}` })
  if (message.author.bot) return;
  if (!message.mentions.users.first()) return;
  if (!db.has(`afk_${message.mentions.users.first().id}`)) return;
  message.channel.send({ embeds: [embed.setDescription(`Etiketlediğin kişi **${db.get(`afk_${message.mentions.users.first().id}`)}** sebebi ile afk.`)] })
})

/////////Yayın Denetim//////

let streamSchema = require('./database/stream.js');
let stream = require('./database/streamersaved.js');
client.on('voiceStateUpdate', async (oldState, newState) => {
  let guild = client.guilds.cache.get(oldState.guild.id)
  let data = await streamSchema.findOne({ guildID: guild.id })
  let streamData = await stream.findOne({ guildID: guild.id, userID: oldState.member.id })
  if (!oldState.streaming && newState.streaming) {
    if (!streamData) {
      new stream({ guildID: guild.id, userID: oldState.member.id, channel: newState.channel.id, date: Date.now() }).save();
    }
  } else if ((oldState.streaming && !newState.streaming) || (oldState.streaming && !newState.channel)) {
    if (streamData) {
      if (!data) {
        await new streamSchema({ guildID: guild.id, streams: [{ userID: oldState.member.id, time: (Date.now() - streamData.date), date: Date.now(), channel: oldState.channel.id }] }).save();
        await stream.deleteOne({ guildID: guild.id, userID: oldState.member.id })

      } else {
        await streamSchema.findOneAndUpdate({ guildID: guild.id }, { $push: { streams: { userID: oldState.member.id, time: (Date.now() - streamData.date), date: Date.now(), channel: oldState.channel.id } } }, { upsert: true })
        await stream.deleteOne({ guildID: guild.id, userID: oldState.member.id })

      }
    }
  }
})
client.on("voiceStateUpdate", async (oldState, newState,member) => {
  const StreamerDatabase = require("./database/streamerdenet.js");
  const humanizeDuration = require("humanize-duration")
  const { MessageEmbed } = require("discord.js");




  let embed = new Discord.MessageEmbed()
  try{let StreamerData = await StreamerDatabase.findOne({ guildID: newState.member.guild.id, userID: newState.member.id})
  if (!StreamerData) {
  if(newState.member.voice.streaming) { 
  let Streamer = await new StreamerDatabase({guildID: newState.member.guild.id, userID: newState.member.id, date: Date.now()}).save()                                  
  }return;return}
  if (StreamerData) {
  if(newState.member.voice.streaming === false) {
  let süre = `${humanizeDuration(Date.now() - StreamerData.date, {largest: 2, round: true}).replace("second", "saniye").replace("seconds", "saniye").replace("minute", "dakika").replace("minutes", "dakika").replace("hour", "saat").replace("hours", "saat").replace("day", "gün").replace("week", "hafta").replace("month", "ay").replace("year", "yıl").replace("haftas", "hafta").replace("güns", "gün").replace("ays", "ay").replace("yıls", "yıl").replace("dakikas", "dakika").replace("saats", "saat").replace("saniyes", "saniye")}`
  client.channels.cache.get(settings.kanallar.streamerdenetim).send({ embeds: [embed.setFooter({text:`📑 Yayına ${moment(StreamerData.date).locale("TR").fromNow()} önce başlamış.`}).setDescription(`>  \`>\` ${newState.guild.members.cache.get(newState.id)} - (\`${newState.id}\`) kullanıcısı **${süre}** yayın yapmış.\n>  \n>  \`>\` Başlangıç Tarihi: **${moment(StreamerData.date).locale("TR").format("LLL")}**\n>  \n>  \`>\` Yayın yaptığı kanal: \`${newState.guild.channels.cache.get(oldState.channelID).name} - (${oldState.channelID})\` `).setAuthor(newState.member.user.tag, newState.member.user.avatarURL({dynamic:true})).setColor(0x2F3136)] })
  StreamerData.delete()
  }return}
  } catch {{}}
}
);

const log = message => {
  console.log(`${message}`)
}

client.aliases = new Collection()
client.commands = new Collection()
fs.readdir('./commands/', (err, files) => {
  if (!files) return console.log(`Commands klasörü mevcut degil!`)
  if (err) console.error(err)
  log(`${files.length} komut yüklenecek.`)
  files.forEach(f => {
    let props = require(`./commands/${f}`)

    client.commands.set(props.name, props)
    props.aliases.forEach(alias => {
      client.aliases.set(alias, props.name)
    })
  })
})



client.on("messageCreate", (msg) => {
  if (msg.author.bot) return;
  db.add(`msg_${msg.author.id}`, +1)
  if (!db.has("msgsa_" + msg.author.id)) db.set("msgsa_" + msg.author.id,
    [Date.now()])
  else db.push("msgsa_" + msg.author.id, Date.now())
})



client.on("voiceStateUpdate", async (oldState, newState) => {
  try {

    let embed26 = new MessageEmbed()

    if (!oldState.channel && newState.channel) {

      if (!db.has("sessa_" + newState.member.id)) db.set("sessa_" + newState.member.id,
        [Date.now()])
      else db.push("sessa_" + newState.member.id, Date.now())

      db.add(`sesaktif_${newState.member.id}`, +1)
      if (newState.member.bot) return;
      db.add(`ses_${newState.member.id}`, +1)
      if (db.get(`ensonses_${newState.member.id}`)) { db.delete(`ensonses_${newState.member.id}`) }
      db.set(`ensonses_${newState.member.id}`, `${newState.channel.id}`)
      db.set(`sesgiris_${newState.member.id}`, Date.now())
    }
    if (oldState.channel && !newState.channel) {


      db.delete(`sessn_${oldState.member.id}`)
      db.set(`sescikis_${oldState.member.id}`, Date.now())
      const giriş = db.get(`sesgiris_${oldState.member.id}`)
      const çıkış = db.get(`sescikis_${oldState.member.id}`)
      const toplam = çıkış - giriş
      const sonuç = toplam / 1000
      const düzen = await Math.floor(sonuç)

      const bitiş = ms(toplam, { long: true })
        .replace("seconds", "Saniye")
        .replace("minutes", "Dakika")
        .replace("hours", "Saat")
        .replace("day", "Gün")

      db.set(`sessn_${oldState.member.id}`, bitiş)
      db.delete(`sesgiris_${oldState.member.id}`)
      db.delete(`sescikis_${oldState.member.id}`)
    }
  } catch (e) {
    console.log("bir sorun oldu: " + e)
  }
})


client.on("ready", async () => {
  setInterval(async () => {
    client.users.cache.forEach(y => {
      if (!db.has("msg_" + y.id)) return;
      db.set("msg_" + y.id, db.get("msg_" + y.id).fiter(x => x > Date.now() - 1000 * 60 * 60 * 24 * 30))
    })
  }, 1000 * 60 * 60 * 12)
})






client.on("messageDelete", async (message) => {
  const mesajlog = client.channels.cache.find(kanal => kanal.name === "mesaj-log");

  if (message.channel.type === "dm" || !message.guild || message.author.bot) return;
  const snipe = {
    icerik: message.content,
    yazar: message.author.id,
    yazilmaTarihi: message.createdTimestamp,
    silinmeTarihi: Date.now(),
  }
  await db.set(`snipe_${message.guild.id}_${message.channel.id}`, snipe)

})





client.on("guildMemberAdd", async member => {
  let tag = settings.tag.yasaklıtag
  if (!tag) return;
  let tagrol = settings.tag.tagrol
  if (!tagrol) return;
  let taglog = settings.tag.taglog
  let kanal = member.guild.channels.cache.get(taglog)


const embed = new Discord.MessageEmbed()
.setColor(settings.bot.BotEmbedColor)
.setFooter({ text: `${settings.bot.footer}` })

            client.channels.cache.get(settings.moderasyon.cezapuanlog).send(`${member.tag} - (${member.id}) Kullanıcısına YASAKLI TAG işlemi uygulandı. \nGüncel Ceza Puanı: **${db.get(`cezapuan_${member.id}`) || "0"}** `)
db.add(`cezapuan_${member.id}`, +10)
if(member.user.username.includes(tag)){
member.roles.add(tagrol)
member.send("Sunucumuzun Yasaklı Tagında Bulunuyorsunuz. Lütfen tagı isminizden siliniz.").catch(() => {})
kanal.send({ embeds: [embed.setDescription(`${member} - (${member.id}) kullanıcısnın nickinde yasaklı tag(${tag}) bulundugundan işlem uygulandı.`)] })
}
})

client.on('userUpdate', async(old, nev) => {
 
  let Tag = `${settings.sunucu.tagges}`
  
  let guild = await (client.guilds.cache.get(settings.sunucu.sunucuid))
  let uye = guild.members.cache.get(old.id)
  let embed = new Discord.MessageEmbed().setColor('RANDOM').setFooter({ text: `${settings.bot.footer}` }).setTimestamp()
  let g = guild.channels.cache.get(settings.kanallar.genelchat)
  let tagrol = guild.roles.cache.get(settings.moderasyon.Tagrol);
  let log = guild.channels.cache.get(settings.moderasyon.taglog)
      if (old.username != nev.username || old.tag != nev.tag || old.discriminator != nev.discriminator) {
  if (ayar.guild.tagges.some(tag => nev.tag.toLowerCase().includes(tag))) {
      if (!uye.roles.cache.has(tagrol.id)) {
          uye.roles.add(tagrol.id).catch(e => {});
          uye.setNickname(uye.displayName.replace(settings.sunucu.defaultTag, settings.sunucu.nameTag)).catch(e => {});
          if (log) log.send(`\`${guild.name}\`\n\n**▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬\n\ \n ⇢${uye}, Adlı kullanıcı tagımızı Alarak ailemizden katıldı!\n\n ⇢ Toplam Taglı Sayımız \`${guild.members.cache.filter(u => u.user.username.includes(Tag)).size}\` \n\n▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬ ** `)
      
        g.send({ embeds: [embed.setDescription(`${uye} Adlı Kullanıcı Tagımızı Alarak Ailemize Katıldı! Hoş Geldin `)]})
          
      } else {
          uye.setNickname(uye.displayName.replace(settings.sunucu.defaultTag, settings.sunucu.nameTag)).catch(e => {});
      } client.voicembed = message => {
          return {
              description: message,
              color: client.renk[Math.floor(Math.random() * client.renk.length)],
              
          };
      };

  } else {
      if (!uye.roles.cache.has(tagrol.id)) {
          uye.setNickname(uye.displayName.replace(settings.sunucu.defaultTag, settings.sunucu.nameTag)).catch(e => {});
      } else {
          uye.roles.remove(uye.roles.cache.filter(s => s.position >= tagrol.position)).catch(e => {});
          uye.setNickname(uye.displayName.replace(settings.sunucu.defaultTag, settings.sunucu.nameTag)).catch(e => {});
          if (log) log.send(`\`${guild.name}\` \n\n**▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬\n\n⇢ ${uye}, Adlı kullanıcı tagımızı bırakarak ailemizden ayrıldı!\n\n ⇢Toplam Taglı Sayımız \`${guild.members.cache.filter(u => u.user.username.includes(Tag)).size}\` \n\n▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬**`)
       
       g.send({ embeds: [embed.setDescription(`${uye} Adlı Kullanıcı Tagımızı Bırakarak Ailemizden Ayrıldı! Hoşçakal `)]})

      }
  }
    }
})
client.on("message", message => {
  if(message.author.bot) return;
  let taglar = ["tag", ".tag", "!tag", "-tag", "TAG", "Tag"]
      if (taglar.some(t => message.content.toLowerCase() === t)) {
        message.reply(`\`${settings.sunucu.tagges}\``)  
    }
  })

     client.on("guildMemberUpdate", (oldMember, newMember) => {
      if (oldMember.displayName === newMember.displayName) return;
  
    
      let waztuhhcum = new Discord.MessageEmbed()
      .setColor("#2f3136")
      .setDescription(`**${newMember} üyesinin sunucu içi ismi değiştirildi.**
      🌟 **Nick Değişimi:**

    🆕 **Önce:** \`${oldMember.displayName}\`
    🆕 **Sonra:** \`${newMember.displayName}\`
      
      \`\`\`Kullanıcı: ${newMember.user.tag} (${newMember.user.id})\nDeğişim Tarihi: ${moment(Date.now()).locale("tr").format("LLL")}\`\`\``)
      .setTimestamp()
      .setThumbnail(newMember.user.displayAvatarURL({ dynamic: true }))
    
      client.channels.cache.get(`990091642306445348`).send({embeds: [waztuhhcum]})
    
    });




client.on('guildMemberAdd', async member => {
if(Date.now() - member.user.createdAt < ms("14d")){
client.channels.cache.get(settings.sunucu.şüphelilog).send(`${member} Kullanıcısının hesabı 14 günden az sürede açılmış.`)
}
})

    client.on('interactionCreate', async interaction => {

    let memberGün = moment(interaction.member.user.createdAt).format("DD");
    let memberTarih = moment(interaction.member.user.createdAt).format("YYYY HH:mm:ss");
    let memberAylar = moment(interaction.member.user.createdAt).format("MM").replace("01", "Ocak").replace("02", "Şubat").replace("03", "Mart").replace("04", "Nisan").replace("05", "Mayıs").replace("06", "Haziran").replace("07", "Temmuz").replace("08", "Ağustos").replace("09", "Eylül").replace("10", "Ekim").replace("11", "Kasım").replace("12", "Aralık");
      
      if(interaction.isButton()) { 
        await interaction.deferUpdate()
        if (interaction.customId === "sorgulakeeeeeeeee") {
            let embedesss = new discord.MessageEmbed()
            const kurulus = new Date().getTime() - interaction.member.user.createdAt.getTime();  
            if (kurulus >  ms("14d")){
            interaction.member.roles.add(settings.sunucu.üyerol)
            interaction.member.roles.remove(settings.sunucu.şüphelirol)
            }
            if (kurulus < ms("14d")){
 interaction.followUp({  embeds: [embedesss.setDescription('Kontrollerimi Sagladıgımda Hesabının Hala Yeni Oldugunu Görüyorum.\nHesap Kuruluş: __' + memberGün +' '+ memberAylar 
+' '+ memberTarih + '__')], ephemeral: true })

            }
            }
           }

});

