import NavLink from '@/components/NavLink'

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="flex gap-1 mb-6 border-b border-gray-200">
        <NavLink href="/profile" tabStyle>👤 Профіль</NavLink>
        <NavLink href="/profile/security" tabStyle>🔒 Безпека</NavLink>
      </div>
      {children}
    </div>
  )
}