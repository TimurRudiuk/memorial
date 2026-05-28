import { auth } from '@/auth'
import prisma from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import { NextResponse } from 'next/server'

export async function PUT(req: Request) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { currentPassword, newPassword } = await req.json()

  if (!currentPassword || !newPassword)
    return NextResponse.json({ error: 'Усі поля обовʼязкові' }, { status: 400 })

  if (newPassword.length < 6)
    return NextResponse.json({ error: 'Мінімум 6 символів' }, { status: 400 })

  const user = await prisma.user.findUnique({ where: { id: Number(session.user.id) } })

  if (!user?.password)
    return NextResponse.json({ error: 'Зміна пароля недоступна для OAuth-акаунтів' }, { status: 400 })

  const valid = await bcrypt.compare(currentPassword, user.password)
  if (!valid)
    return NextResponse.json({ error: 'Невірний поточний пароль' }, { status: 400 })

  const hashed = await bcrypt.hash(newPassword, 10)
  await prisma.user.update({ where: { id: Number(session.user.id) }, data: { password: hashed } })

  return NextResponse.json({ success: true })
}