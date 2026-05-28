import { auth } from '@/auth'
import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const user = await prisma.user.findUnique({
    where: { id: Number(session.user.id) },
    select: { id: true, email: true, name: true, createdAt: true },
  })

  return NextResponse.json(user)
}

export async function PUT(req: Request) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { name } = await req.json()

  const user = await prisma.user.update({
    where: { id: Number(session.user.id) },
    data: { name: name?.trim() || null },
    select: { id: true, email: true, name: true },
  })

  return NextResponse.json(user)
}