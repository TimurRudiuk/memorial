import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white py-8 px-8">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <span style={{ fontFamily: 'var(--font-parisienne)' }} className="text-2xl text-gray-900">
          Memorial
        </span>
        <div className="flex items-center gap-6">
          <Link href="/memorials" className="text-sm text-gray-500 hover:text-gray-800 transition-colors">Меморіали</Link>
          <Link href="/about" className="text-sm text-gray-500 hover:text-gray-800 transition-colors">Про нас</Link>
          <Link href="/contact" className="text-sm text-gray-500 hover:text-gray-800 transition-colors">Контакти</Link>
        </div>
        <p className="text-sm text-gray-400">© {new Date().getFullYear()} Memorial. Всі права захищені.</p>
      </div>
    </footer>
  )
}