export function capitalize(text: string) {
	if (typeof text !== 'string') return text;

	text = text.toLowerCase();
	const textSplit = text.split('');
	textSplit[0] = textSplit[0].toUpperCase();

	return textSplit.join('');
}
