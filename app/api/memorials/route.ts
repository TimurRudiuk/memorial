import { PrismaClient } from '@prisma/client'
import { PrismaNeon } from '@prisma/adapter-neon'
import { NextResponse } from 'next/server'

const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL! })
const prisma = new PrismaClient({ adapter })

export async function GET() {
  const memorials = await prisma.memorial.findMany()
  return NextResponse.json(memorials)
}

export async function POST(req: Request) {
  const body = await req.json()
  const memorial = await prisma.memorial.create({ data: body })
  return NextResponse.json(memorial, { status: 201 })
}