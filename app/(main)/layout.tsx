import NavLink from '@/components/NavLink'
import { auth } from '@/auth'
import { signOut } from '@/auth'

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()

  return (
    <div>
      <nav className="flex items-center gap-4 p-4 bg-gray-800 text-white">
        <NavLink href="/memorials">Меморіали</NavLink>
        {session?.user ? (
          <>
            <NavLink href="/profile/settings">
              {session.user.name ?? session.user.email ?? 'Профіль'}
            </NavLink>
            <NavLink href="/profile/security">Безпека</NavLink>
            <form
              action={async () => {
                'use server'
                await signOut({ redirectTo: '/login' })
              }}
            >
              <button type="submit" className="text-sm text-gray-300 hover:text-white">
                Вийти
              </button>
            </form>
          </>
        ) : (
          <>
            <NavLink href="/login">Увійти</NavLink>
            <NavLink href="/register">Реєстрація</NavLink>
          </>
        )}
      </nav>
      {children}
    </div>
  )
}