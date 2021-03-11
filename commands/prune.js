module.exports = {
	name: 'prune',
	description: '최대 99 개의 메시지를 정리합니다.',
	execute(message, args) {
		const amount = parseInt(args[0]) + 1;

		if (isNaN(amount)) {
			return message.reply('유효한 번호가 아닌 것 같습니다.');
		} else if (amount <= 1 || amount > 100) {
			return message.reply('1에서 99 사이의 숫자를 입력해주세요.');
		}

		message.channel.bulkDelete(amount, true).catch(err => {
			console.error(err);
			message.channel.send('이 채널에서 메시지를 정리하는 중에 오류가 발생했습니다!');
		});
	},
};