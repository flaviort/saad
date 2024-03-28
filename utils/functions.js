export function phone(str) {
	return (
		'tel:' + str.replace(/[^0-9]/g, '')
	)
}

export function email(str) {
	return (
		'mailto:' + str
	)
}