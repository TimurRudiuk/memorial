import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import PasswordForm from '@/components/PasswordForm'

export default async function SecurityPage() {
  const session = await auth()
  if (!session?.user?.id) redirect('/login')

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-1">Безпека</h1>
      <p className="text-sm text-gray-500 mb-6">Зміна пароля акаунту</p>
      <div className="bg-white border rounded-lg p-6">
        <PasswordForm />
      </div>
    </div>
  )
}