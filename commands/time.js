const Discord = require("discord.js");
const moment = require('moment');

module.exports = {
    name: "μκ°",
    category: "π₯ββ μ μ λͺλ Ήμ΄",
    description: "νκ΅­μ νμ¬μκ°",
    run: async (client, message, args) => {
        
        message.react('692644452220534857')
        let emojil = client.emojis.cache.get("691681971478462495")//λ‘λ©λ°
        
        let emojil7 = client.emojis.cache.get("687558950538707036")//μλ
        let time = moment().format('LLLL')
            const embed = new Discord.MessageEmbed()
         .setColor(0x0045AE)
         .setTitle(`${emojil7}` + " νκ΅­ νμ¬μκ°!")
         .addField("**νμ¬μκ°**", `**${time}**`)
         .setThumbnail(`https://cdn.discordapp.com/attachments/788681275078344705/802020984516902932/unknown.png`)
         .setTimestamp()
         .setFooter(process.env.botname + ` ${process.env.v}`, client.user.displayAvatarURL())
         message.channel.send({embed})
             console.log(`> ${message.guild.name} < | ${message.channel.name} | ${message.author.tag} (${message.author.id}) /νμ μκ° μ¬μ© > ${time}`)
    }
}