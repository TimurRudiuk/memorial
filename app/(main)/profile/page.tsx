import { auth } from '@/auth'
import prisma from '@/lib/prisma'
import { redirect } from 'next/navigation'
import ProfileForm from '@/components/ProfileForm'

export default async function ProfilePage() {
  const session = await auth()
  if (!session?.user?.id) redirect('/login')

  const user = await prisma.user.findUnique({
    where: { id: Number(session.user.id) },
    select: { email: true, name: true, createdAt: true },
  })

  if (!user) redirect('/login')

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-1">Профіль</h1>
      <p className="text-sm text-gray-500 mb-6">
        Акаунт створено: {new Date(user.createdAt).toLocaleDateString('uk-UA')}
      </p>
      <div className="bg-white border rounded-lg p-6">
        <ProfileForm initialName={user.name} email={user.email} />
      </div>
    </div>
  )
}