import NavLink from "@/components/NavLink"

export default function MemorialsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <nav>
        <NavLink href="/memorials/create">Створити меморіал</NavLink>
      </nav>
      {children}
    </div>
  )
}