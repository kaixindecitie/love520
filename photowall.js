document.querySelectorAll('.photo-card').forEach(card => {
	card.addEventListener('click', () => {
		card.classList.toggle('flipped');
		card.classList.add('flip-surprise');
		setTimeout(() => {
			card.classList.remove('flip-surprise');
		}, 1000);
		checkAllFlipped();
	});
});

function checkAllFlipped() {
	const allFlipped = Array.from(document.querySelectorAll('.photo-card')).every(card => card.classList.contains('flipped'));
	if (allFlipped) {
		triggerFinalSurprise();
	}
}

function triggerFinalSurprise() {
	alert("彩蛋触发！给宝宝满满一筐的爱！");
}

const blessings = [
	"愿我们的爱永远甜蜜",
	"每天都像初见般心动",
	"你是我生命中最美的风景",
	"携手共度每一个春夏秋冬",
	"爱你无悔，陪你到老",
	"感谢有你，幸福满满"
];

const blessingElements = document.querySelectorAll('.blessing-text');
blessingElements.forEach((el, index) => {
	const blessing = blessings[index % blessings.length];
	el.textContent = blessing;
});
