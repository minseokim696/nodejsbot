//토큰 등등의 봇 온라인 할때 필요한것들
const Discord = require('discord.js');
const client = new Discord.Client();
const token = process.argv.length == 2 ? process.env.token : ""; //토큰

const { readdirSync } = require('fs');
const { join } = require('path');

client.commands = new Discord.Collection();

const prefix = '감자야 ' //자신의 프리픽스


const commandFile = readdirSync(join(__dirname, "commands")).filter(file => file.endsWith("js"));
//commands 파일 불러오는 구문
for (const file of commandFile) {
  const command = require(join(__dirname, "commands", `${file}`));
  client.commands.set(command.name, command);
}

client.on("error", console.error);

client.on('ready', () => {
  console.log(`${client.users.cache.size}명`) // 봇을 사용 하고있는 모든 유저
  console.log(`${client.guilds.cache.size}개로`) //봇이 참가해있는 모든 서버 표시
  console.log(`${client.user.id}로 로그인 성공!`); //봇이 온라인되면 cmd 창에 표시
  client.user.setActivity('감자야 도와줘') //상태메시지
});

client.on("message", async message => {

  if(message.author.bot) return;
  if(message.channel.type === 'dm') return;

  if(message.content.startsWith(prefix)) {
    const args = message.content.slice(prefix.length).trim().split(/ +/);

    const command = args.shift().toLowerCase();

    if(!client.commands.has(command)) return;

    try {
      client.commands.get(command).run(client, message, args);
    } catch (error) {
      console.error(error);
    }
  }
})




//욕설 감지

client.on('message', async message => {
  if(message.author.bot) return;
  if(message.channel.type === 'dm') return;
    let blacklisted = ["시발", "ㅅㅂ", "ㅄ", "ㅂㅅ", "병신", "년", "미친", "ㅗ", "fuck", "씨발", "지렸", "지려", "븅신"] // "감지할 욕설", "감지할 욕설" 이런식으로 적으시면 됩니다
    let foundInText = false;
    for (var i in blacklisted) { 
      if (message.content.toLowerCase().includes(blacklisted[i].toLowerCase())) foundInText = true
    }

    if (foundInText) {
        const user = message.author.id;
        const embed = new Discord.MessageEmbed()
        .setColor('#FF0000')
        .setDescription(`<@${user}> 씨발놈아 대화를 한다는게 욕을하냐? 개새끼야 시베리안 호랑이 머릿털보다 못한새키
        \n사용한 욕설 : \`\`${message.content}\`\` `);
        message.channel.send(embed)
}
}
);

// 기타 등등


client.on('message', async message => {
  if(message.author.bot) return;
  if(message.channel.type === 'dm') return;
    let blacklisted = ["감자야 도와줘"]

    let foundInText = false;
    for (var i in blacklisted) { 
      if (message.content.toLowerCase().includes(blacklisted[i].toLowerCase())) foundInText = true
    }

    if (foundInText) {
        const user = message.author.id;
        const embed = new Discord.MessageEmbed()
        .setColor('#00ff00')
        .setDescription(`<@${user}> 

        현재 기능:
        
        날씨
        감자야 날씨 (지역).

        핑
        감자야 ping 라고 적으면 핑을 알려줍니다.

        글자
        감자야 글자 (글자) 라고 적으면 되요 (영어만).
        
        ip
        ip
        
        시간
        현재 시간을 알려줍니다.`);
        message.channel.send(embed)
}
}
);


client.on('message', async message => {
  if(message.author.bot) return;
  if(message.channel.type === 'dm') return;
    let blacklisted = ["감자야 도와줘"]

    let foundInText = false;
    for (var i in blacklisted) { 
      if (message.content.toLowerCase().includes(blacklisted[i].toLowerCase())) foundInText = true
    }

    if (foundInText) {
        const user = message.author.id;
        const embed = new Discord.MessageEmbed()
        .setColor('#00ff00')
        .setDescription(` 

        코로나
        감자야 코로나 (kr 등을 적으면 코로나 확진자 등을 알려줘요).

        아바타
        자신의 프로필 사진과 링크를 알려줍니다.

        server
        서버 정보를 알려줍니다.

        user-info
        자신의 대한 정보를 알려줍니다.

        kick
        관리자 전용 명령어 입니다.
        
        ban
        관리자 전용 명령어 입니다.

        청소
        청소.`);
        message.channel.send(embed)
}
}
);




//로그

// 메세지 수정로그

client.on('messageUpdate', async(oldMessage, newMessage) => {
  if(oldMessage.content === newMessage.content) return // 임베드로 인한 수정같은 경우 
  let img = oldMessage.author.avatar ? `https://cdn.discordapp.com/avatars/${oldMessage.author.id}/${oldMessage.author.avatar}.webp?size=256` : undefined;
  let embed = new Discord.MessageEmbed()
  .setTitle('메시지 수정 로그')
  .setColor('#00ff0')
  .addField('Log-Type', 'Edited Message')
  .addField('수정한 사람:', oldMessage.author.tag)
  .addField('채널:', oldMessage.channel.name)
  .addField('수정하기전 메시지:', oldMessage.content)
  .addField('수정후 메시지:', newMessage.content)
  .setFooter(oldMessage.author.tag, img)
  .setTimestamp()

  oldMessage.channel.send(embed)
})

// 메세지 삭제로그 (embed)

client.on('messageDelete', async message => {
let img = message.author.avatar ? `https://cdn.discordapp.com/avatars/${message.author.id}/${message.author.avatar}.webp?size=256` : undefined;
let embed = new Discord.MessageEmbed()
.setTitle('메시지 삭제 로그')
.setColor('99ff99')
.addField('Log-Type', 'Deleted Message')
.addField('삭제한 사람:', message.author.tag)
.addField('채널:', message.channel.name)
.addField('메시지:', message.content)
.setFooter(message.author.tag, img)
.setTimestamp()

message.channel.send(embed)

})



//일부 파일 불러오기
client.on('message', message => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  if (command === 'ping') {
    message.channel.send('Pong.');
  } else if (command === 'beep') {
    message.channel.send('Boop.');
  } else if (command === 'server') {
    message.channel.send(`서버 이름: ${message.guild.name}\n전체 인원: ${message.guild.memberCount}`);
  } else if (command === 'user-info') {
    message.channel.send(`이름: ${message.author.username}\n아이디: ${message.author.id}`);
  } else if (command === 'info') {
    if (!args.length) {
      return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
    } else if (args[0] === 'foo') {
      return message.channel.send('bar');
    }

    const taggedUser = message.mentions.users.first();

    message.channel.send(`You wanted to kick: ${taggedUser.username}`);
  } else if (command === '아바타') {
    if (!message.mentions.users.size) {
      return message.channel.send(`당신의 아바타: ${message.author.displayAvatarURL({ dynamic: true })}`);
    }

    const avatarList = message.mentions.users.map(user => {
      return `${user.username}'s avatar: ${user.displayAvatarURL({ dynamic: true })}`;
    });

    message.channel.send(avatarList);
  } else if (command === '청소') {
    const amount = parseInt(args[0]) + 1;

    if (isNaN(amount)) {
      return message.reply('that doesn\'t seem to be a valid number.');
    } else if (amount <= 1 || amount > 100) {
      return message.reply('you need to input a number between 1 and 99.');
    }

    message.channel.bulkDelete(amount, true).catch(err => {
      console.error(err);
      message.channel.send('there was an error trying to prune messages in this channel!');
    });
  }
});




// 킥/벤



client.on('message', (message) => {

	if (!message.guild) return;
  
  if (message.content.startsWith('감자야 kick')) {
  
	if (!message.member.hasPermission("KICK_MEMBERS")) return message.reply("당신은 그것을 사용할 수 없습니다!");
  
	  const user = message.mentions.users.first();
  
	  if (user) {
  
		const member = message.guild.member(user);
  
		if (member) {
  
		  member
  
			.kick()
  
			.then(() => {
  
			  const kick = new Discord.MessageEmbed()
  
			 .setDescription(`${user.tag} 이 (가) 추방되었습니다 .`)
  
			  message.channel.send(kick);
  
			})
  
			.catch(err => {
  
			  
  
			  const kick_err_1 = new Discord.MessageEmbed()
  
			 .setColor('#ff0000')
  
			.setDescription("그 사용자를 추방 할 수 없습니다")
  
			  message.channel.send(kick_err_1);
  
			  console.error(err);
  
			});
  
		} else {
  
		  
  
		  const kick_err_2 = new Discord.MessageEmbed()
  
		 .setColor('#ff0000')
  
		.setDescription("해당 사용자는이 서버에 없습니다!")
  
		  message.channel.send(kick_err_2);
  
		}
  
	  } else {
  
		message.reply("아무도 언급하지 않았습니다!");
  
	  }
  
	}
  
  });
  
  client.on('message', (message) => {
  
	if (!message.guild) return;
  
  if (message.content.startsWith('감자야 ban')) {
  
	if (!message.member.hasPermission("BAN_MEMBERS")) return message.reply("당신은 그것을 사용할 수 없습니다!");
  
	  const user = message.mentions.users.first();
  
	  if (user) {
  
		const member = message.guild.member(user);
  
		if (member) {
  
		  member
  
			.ban()
  
			.then(() => {
  
			  
  
			  const ban = new Discord.MessageEmbed()
  
			 .setDescription(`${user.tag} 깔끔히 보내버렸습니다!`)
  
			  message.channel.send(ban);
  
			})
  
			.catch(err => {
  
			  
  
			  const ban_err_1 = new Discord.MessageEmbed()
  
			 .setColor('#ff0000')
  
			.setDescription("그 사용자를 차단할 수 없습니다")
  
			  message.channel.send(ban_err_1);
  
			  console.error(err);
  
			});
  
		} else {
  
		  
  
		  const ban_err_2 = new Discord.MessageEmbed()
  
		 .setColor('#ff0000')
  
		.setDescription("해당 사용자는이 서버에 없습니다!")
  
		  message.channel.send(ban_err_2);
  
		}
  
	  } else {
  
		message.reply("아무도 언급하지 않았습니다!");
	  }
  
	}
  
  });


//주사위

client.on("message", (message) => {
	if (message.content === `감자야 주사위`) {
	  var random = Math.floor(Math.random() * 6) + 1;
	  console.log(random);
	  message.channel.send(random);
	}
  });

//도배

client.on("message", (message) => {
	if (message.content === `감자야 도배`) {
	  for (var i = 0; i < 50; i++) {
		message.channel.send(`${message.author.tag} 님의 명령으로 도배중`);
	  }
	}
  });

//에러 발생해도 서버 안 죽이기 + 오류 전송하기
  process.on('uncaughtException', function (err) {
    const channel = client.channels.find('name', 'general');
		channel.send('오류를 감지했습니다 서버 는 살아있어요 : **' + err + '**');
});


//테스트








client.login(token); // node index.js 를 쳐서 봇에 로그인하기!