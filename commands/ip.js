const Discord = require("discord.js");
const snekfetch = require('snekfetch');

module.exports = {
    name: "ip",
    category: "๐ ๊ฒ์๋ช๋ น์ด",
    description: "ip๋ฅผ ์กฐํํ ์์์ต๋๋ค.",
	usage: "<Looked Up IP>",
    run: async (client, message, args) => {
            snekfetch.get(`http://ip-api.com/json/${args}`).then(r => {
                let Geo = new Discord.MessageEmbed()
                  .setTimestamp()
                  .setThumbnail(`https://image.ibb.co/kcFJ09/resolver.png`)
                  .setTitle(`**Deluxo Puller - GeoIP Lookup**`)
                  .setDescription(`**__GeoIP Lookup Information__**
              **Looked Up IP**: ${args}
              **ASN**: ${r.body.as}
              **City**: ${r.body.city}`)
                  .setFooter(`Resolved By: ${message.author.tag}`);
              
                message.channel.send({ embed: Geo });
              });
        console.log(`> ${message.guild.name} < | ${message.channel.name} | ${message.author.tag} (${message.author.id}) /ip ์ฌ์ฉ`)
    }
}