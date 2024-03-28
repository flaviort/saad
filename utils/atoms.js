import { atom } from 'recoil'

export const fsMenuState = atom({
	key: 'fsMenuKey',
	default: false
})

export const pageTransitionState = atom({
	key: 'pageTransitionKey',
	default: false
})