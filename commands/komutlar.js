
const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const settings = require("../settings.js")

module.exports = {
  name: "komutlar",
  aliases: ["help", "yardim", "yardım"],
  async run(client, message, args) {
    let waztuhh = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
    const embed = new MessageEmbed()
        .setFooter(settings.bot.footer)
        .setAuthor(waztuhh.displayName, waztuhh.user.displayAvatarURL({ dynamic: true }))
        .setThumbnail(message.author.displayAvatarURL({ dynamic: true, size: 64 }))
        .setColor(settings.bot.BotEmbedColor)
        .setTimestamp()
      
   const menu = new Discord.MessageActionRow()
			.addComponents(
				new Discord.MessageSelectMenu()
					.setCustomId('menu1')
					.setPlaceholder('Komutlar Menüsü')
				 .addOptions([
						{
              emoji: '<:hosgeldinaga:1132301682332680232>',
							label: 'Register Komutları',
							description: 'Kayıt Komutlarını görmek için tıkla!',
							value: 'kayit',
          		},
						{
              emoji: '<:neria_owner:1132302656266850388>',
							label: 'Owner Komutları',
							description: 'Kurucu komutlarını görmek için tıkla!',
							value: 'kurucu',
              		},
						{
              emoji: '<a:eglence:1132302932600164423>',
							label: 'Member Komutları',
							description: 'Eğlence komutlarını görmek için tıkla!',
							value: 'kullanici',
              		},
              {
              emoji: '<:admin:1132303203015335997>',
							label: 'Staff Komutları',
							description: 'Yetkili komutlarını görmek için tıkla!',
							value: 'yetkili',
              		},

                  {
                  emoji: '<a:mesaj:1131946514395168800>',
                  label: 'Stat Komutları',
                  description: 'Stat komutlarını görmek için tıkla!',
                  value: 'stat',
                      },  	
            {
              emoji: '<a:Valid_Code_Developer:1132303445924253747>',
							label: 'Developer Komutları',
							description: 'Geliştirici komutlarını görmek için tıkla!',
							value: 'botsahip',
              		},
                      
                     ]),
        );
  const m = await message.channel.send({embeds: [new Discord.MessageEmbed()
.setDescription(`<a:sag2:1131548499532587048>  |  \`${message.guild.name}\`, **Adlı Sunucuya Yapılmış Olan Özel Bot'un Komutlar Listesi Aşağıdaki Menüde Belirtilmiştir.**`)
.setFooter({ text: settings.bot.footer})
.setAuthor({ name: waztuhh.displayName , iconURL: waztuhh.user.displayAvatarURL({ dynamic: true })})
.setFooter({ text: `• Her hangi bir sorun ile karşılaşırsanız waztuhh'a bildiriniz!`})

],components: [menu] });				
		const collector = m.createMessageComponentCollector({ filter: w=>w.user.id===message.author.id })
    client.on("interactionCreate", async(interaction) => {
	if(interaction.values && interaction.values[0] == 'kayit'){

    await interaction.reply({embeds: [embed.setDescription(` 
\`\`\`dts
[Register Komutları]
\`\`\`
<a:yildiz:1132304431665385602> .erkek **[@waztuhh/ID]**
<a:yildiz:1132304431665385602> .kız **[@waztuhh/ID]**
<a:yildiz:1132304431665385602> .İsim **[@waztuhh/ID]**
<a:yildiz:1132304431665385602> .İsimler **[@waztuhh/ID]**
<a:yildiz:1132304431665385602> .Kayıtsız **[@waztuhh/ID]**
<a:yildiz:1132304431665385602> .Topteyit
<a:yildiz:1132304431665385602> .teyit-bilgi **[@waztuhh/ID]**
<a:yildiz:1132304431665385602> .teyit-sıfırla **[@waztuhh/ID]**
<a:yildiz:1132304431665385602> .vip **[@waztuhh/ID]**
        `)], ephemeral: true })
      }

  if(interaction.values && interaction.values[0] == 'kurucu'){

    await interaction.reply({embeds: [embed.setDescription(` 
\`\`\`ini
[Owner Komutları]
\`\`\`
<a:yildiz:1132304431665385602> .hesaptara
<a:yildiz:1132304431665385602> .kilit
<a:yildiz:1132304431665385602> .slowmode
<a:yildiz:1132304431665385602> .yayındenetle **[@waztuhh/ID]**
<a:yildiz:1132304431665385602> .notlar **[@waztuhh/ID]**
<a:yildiz:1132304431665385602> .not **[@waztuhh/ID]**
<a:yildiz:1132304431665385602> .rol **[@Rol/ID]**
<a:yildiz:1132304431665385602> .rolidbak **[@Rol/ID]**
<a:yildiz:1132304431665385602> .rolbilgi **[@Rol/ID]**
<a:yildiz:1132304431665385602> .yaş-say

        `)], ephemeral: true })
      }
          
      
if(interaction.values && interaction.values[0] == 'kullanici'){

  await interaction.reply({embeds: [embed.setDescription(` 
\`\`\`diff
[Member Komutları]
\`\`\`
<a:yildiz:1132304431665385602> .afk **(Sebep)**
<a:yildiz:1132304431665385602> .avatar **<@waztuhh/ID>**
<a:yildiz:1132304431665385602> .banner **<@waztuhh/ID>**
<a:yildiz:1132304431665385602> .booster **(İsim)**
<a:yildiz:1132304431665385602> .çek **<@waztuhh/ID>**
<a:yildiz:1132304431665385602> .git **<@waztuhh/ID>**
<a:yildiz:1132304431665385602> .link
<a:yildiz:1132304431665385602> .snipe

          `)], ephemeral: true })
        }
        
        
      if(interaction.values && interaction.values[0] == 'stat'){

        await interaction.reply({embeds: [embed.setDescription(` 
\`\`\`fix
[Stat Komutları]
\`\`\`
Veri Bulunamadı!
              `)], ephemeral: true })
            }
              
      
      if(interaction.values && interaction.values[0] == 'yetkili'){
        await interaction.reply({embeds: [embed.setDescription(` 
\`\`\`scss
[Yetkili Komutları]
\`\`\`
<a:yildiz:1132304431665385602> .ceza-Sorgu
<a:yildiz:1132304431665385602> .jail **<@waztuhh>** **(Sebep)**
<a:yildiz:1132304431665385602> .infaz **<@waztuhh>**
<a:yildiz:1132304431665385602> .katıldı
<a:yildiz:1132304431665385602> .kes **<@waztuhh>**   
<a:yildiz:1132304431665385602> .kilit **<@waztuhh>**
<a:yildiz:1132304431665385602> .mute **<@waztuhh> (Süre) (Sebep)**
<a:yildiz:1132304431665385602> .nerede **<@waztuhh>**
<a:yildiz:1132304431665385602> .rol **(Al) - (Ver)**
<a:yildiz:1132304431665385602> .rol-Bilgi **(Role/ID/İsim)**
<a:yildiz:1132304431665385602> .roldekiler **(Role/ID)**
<a:yildiz:1132304431665385602> .roldenetim **(Role/ID)**
<a:yildiz:1132304431665385602> .rollog **<@waztuhh>**
<a:yildiz:1132304431665385602> .rolsüz-ver
<a:yildiz:1132304431665385602> .say
<a:yildiz:1132304431665385602> .sesli
<a:yildiz:1132304431665385602> .sicil **<@waztuhh>**
<a:yildiz:1132304431665385602> .tagaldır **<@waztuhh>**
<a:yildiz:1132304431665385602> .sil **(Mesaj Sayısı)**
<a:yildiz:1132304431665385602> .toplu (Çek) - (Taşı)
<a:yildiz:1132304431665385602> .toptaglı
<a:yildiz:1132304431665385602> .topyetkili
<a:yildiz:1132304431665385602> .unvmute **<@waztuhh>**
<a:yildiz:1132304431665385602> .unmute **<@waztuhh>**
<a:yildiz:1132304431665385602> .unban **<@waztuhh>**
<a:yildiz:1132304431665385602> .infaz-aç **(ID)**
<a:yildiz:1132304431665385602> .unjail **<@waztuhh>**
<a:yildiz:1132304431665385602> .yayın-Denetim **<@waztuhh>**
<a:yildiz:1132304431665385602> .yetkialdır **<@waztuhh>**
<a:yildiz:1132304431665385602> .yetkili-durum
<a:yildiz:1132304431665385602> .ysay
<a:yildiz:1132304431665385602> .yetiket
`)], ephemeral: true })
              }
              
              if(interaction.values && interaction.values[0] == 'botsahip'){
                await interaction.reply({embeds: [embed.setDescription(` 
        \`\`\`scss
        [Geliştirici Komutları]
        \`\`\`
        <a:yildiz:1132304431665385602> .eval (**Kod**)

        `)], ephemeral: true })
                      }              
      })
    }
}