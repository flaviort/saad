// the real root layout (html, body) lives in app/[locale]/layout.jsx,
// this one only exists so app/not-found.jsx has a layout to render in
export default function RootLayout({ children }: { children: React.ReactNode }) {
	return children
}
