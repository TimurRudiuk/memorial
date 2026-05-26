import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

type Params = { params: Promise<{ id: string }> }

export async function GET(_: Request, { params }: Params) {
  try {
    const { id } = await params
    const memorial = await prisma.memorial.findUnique({
      where: { id: Number(id) },
    })
    if (!memorial) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json(memorial)
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

export async function PATCH(req: Request, { params }: Params) {
  try {
    const { id } = await params
    const body = await req.json()
    const memorial = await prisma.memorial.update({
      where: { id: Number(id) },
      data: body,
    })
    return NextResponse.json(memorial)
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

export async function DELETE(_: Request, { params }: Params) {
  try {
    const { id } = await params
    await prisma.memorial.delete({ where: { id: Number(id) } })
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}