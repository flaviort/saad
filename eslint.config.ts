import type { Linter } from 'eslint'
import nextCoreWebVitals from 'eslint-config-next/core-web-vitals'
import nextTypescript from 'eslint-config-next/typescript'

const eslintConfig: Linter.Config[] = [
	...nextCoreWebVitals,
	...nextTypescript,
	{
		ignores: ['.next/**', 'node_modules/**', 'public/**', 'next-env.d.ts']
	}
]

export default eslintConfig
