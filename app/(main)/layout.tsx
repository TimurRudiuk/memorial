import NavLink from "@/components/NavLink"

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <nav>
        <NavLink href="/memorials">Меморіали</NavLink>
        <NavLink href="/profile/settings">Налаштування</NavLink>
        <NavLink href="/profile/security">Безпека</NavLink>
      </nav>
      {children}
    </div>
  )
}