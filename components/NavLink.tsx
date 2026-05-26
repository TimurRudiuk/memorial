"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

interface NavLinkProps {
  href: string
  children: React.ReactNode
}

export default function NavLink({ href, children }: NavLinkProps) {
  const pathname = usePathname()
  const isActive = pathname === href

  return (
    <Link
      href={href}
      style={{
        fontWeight: isActive ? "bold" : "normal",
        textDecoration: isActive ? "underline" : "none",
        marginRight: "16px",
        color: isActive ? "#a78bfa" : "white",
      }}
    >
      {children}
    </Link>
  )
}