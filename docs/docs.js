const df = document.createDocumentFragment();
for( const item in emojiData ) {
	const html = `
		<li><strong>${item.emoji}</strong> :: ${item.targets.join(' ,')}</li>
	`;
	df.appendChild(html);
}
document.getElementById('listy').appendChild(df);