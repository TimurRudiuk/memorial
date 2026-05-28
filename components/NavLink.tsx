'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface NavLinkProps {
  href: string
  children: React.ReactNode
  tabStyle?: boolean
}

export default function NavLink({ href, children, tabStyle }: NavLinkProps) {
  const pathname = usePathname()
  const isActive = pathname === href

  if (tabStyle) {
    return (
      <Link
        href={href}
        className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
          isActive
            ? 'border-blue-600 text-blue-600'
            : 'border-transparent text-gray-500 hover:text-gray-700'
        }`}
      >
        {children}
      </Link>
    )
  }

  return (
    <Link
      href={href}
      style={{
        fontWeight: isActive ? 'bold' : 'normal',
        textDecoration: isActive ? 'underline' : 'none',
        marginRight: '16px',
        color: isActive ? '#a78bfa' : 'white',
      }}
    >
      {children}
    </Link>
  )
}