import { PrismaClient } from '@prisma/client'
import { PrismaNeon } from '@prisma/adapter-neon'
import { NextResponse } from 'next/server'

const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL! })
const prisma = new PrismaClient({ adapter })

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const memorial = await prisma.memorial.findUnique({
    where: { id: Number(params.id) },
  })
  if (!memorial) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(memorial)
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const body = await req.json()
  const memorial = await prisma.memorial.update({
    where: { id: Number(params.id) },
    data: body,
  })
  return NextResponse.json(memorial)
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  await prisma.memorial.delete({ where: { id: Number(params.id) } })
  return NextResponse.json({ success: true })
}