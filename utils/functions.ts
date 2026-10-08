export function phone(str: string) {
	return (
		'tel:' + str.replace(/[^0-9]/g, '')
	)
}

export function email(str: string) {
	return (
		'mailto:' + str
	)
}

// get vh
export const vh = (coef: number) => window.innerHeight * (coef/100)

// slugify
export function slugify(str: string) {
    return String(str)
        .normalize('NFKD')
        .replace(/[\u0300-\u036f]/g, '')
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9 -]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
}