import { createNavigation } from 'next-intl/navigation'
import { routing } from './routing'

// locale-aware versions of next/link and next/navigation
export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing)
