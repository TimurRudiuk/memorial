import Link from 'next/link'
import { auth } from '@/auth'
import { signOut } from '@/auth'

export default async function Navbar() {
  const session = await auth()

  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between px-8 py-4 bg-white border-b border-gray-200">
      <div className="flex items-center gap-7">
        <Link href="/memorials" className="text-sm text-gray-500 hover:text-gray-800 transition-colors">Меморіали</Link>
        <Link href="/about" className="text-sm text-gray-500 hover:text-gray-800 transition-colors">Про нас</Link>
        <Link href="/contact" className="text-sm text-gray-500 hover:text-gray-800 transition-colors">Контакти</Link>
      </div>
      <div className="flex items-center gap-3">
        {session?.user ? (
          <>
            <Link href="/profile" className="flex items-center gap-2 text-sm text-gray-700 hover:text-gray-900 transition-colors">
              {session.user.image ? (
                <img src={session.user.image} alt="avatar" className="w-8 h-8 rounded-full object-cover" />
              ) : (
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-medium text-gray-600">
                  {session.user.name?.[0] ?? session.user.email?.[0] ?? '?'}
                </div>
              )}
              <span>{session.user.name ?? session.user.email}</span>
            </Link>
            <form action={async () => { 'use server'; await signOut({ redirectTo: '/' }) }}>
              <button type="submit" className="px-4 py-2 text-sm border border-gray-400 rounded-lg hover:bg-gray-50 transition-colors">
                Вийти
              </button>
            </form>
          </>
        ) : (
          <>
            <Link href="/login" className="px-4 py-2 text-sm border border-gray-400 rounded-lg hover:bg-gray-50 transition-colors">
              Увійти
            </Link>
            <Link href="/register" className="px-4 py-2 text-sm bg-gray-900 text-white rounded-lg hover:bg-gray-700 transition-colors">
              Реєстрація
            </Link>
          </>
        )}
      </div>
    </nav>
  )
}