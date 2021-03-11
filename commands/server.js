module.exports = {
	name: 'server',
	description: '이 서버에 대한 정보를 표시합니다.',
	execute(message) {
		message.channel.send(`서버 이름: ${message.guild.name}\n전체 인원: ${message.guild.memberCount}`);
	},
};