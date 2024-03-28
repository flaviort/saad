import routes from './routes'

const menu = [
	{ name: 'Home', href: routes.home },
	{ name: 'About', href: routes.about, sub: [
		{ name: 'Our Mission', href: routes.mission },
		{ name: 'Our Team', href: routes.team }
	]},
	{ name: 'Services', href: routes.services },
	{ name: 'Contact', href: routes.contact }
]
  
export default menu