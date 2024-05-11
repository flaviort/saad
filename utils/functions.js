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

export function debounce(func, delay) {
    let timeoutId
    
    return function () {
        const context = this
        const args = arguments
        clearTimeout(timeoutId)
        timeoutId = setTimeout(() => {
            func.apply(context, args)
        }, delay)
    }
}

// get vh
export const vh = (coef) => window.innerHeight * (coef/100)

// slugify
export function slugify(str) {
    return String(str)
        .normalize('NFKD')
        .replace(/[\u0300-\u036f]/g, '')
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9 -]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
}