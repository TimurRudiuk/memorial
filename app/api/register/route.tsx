import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import bcrypt from 'bcryptjs'

export async function POST(req: Request) {
  try {
    console.log('1. Початок запиту')
    const body = await req.json()
    console.log('2. Отримано body:', { email: body.email, name: body.name, hasPassword: !!body.password })
    
    const { email, password, name } = body

    if (!email || !password) {
      console.log('3. Валідація не пройдена')
      return NextResponse.json({ error: 'Email і пароль обовʼязкові' }, { status: 400 })
    }

    console.log('4. Перевірка існуючого користувача')
    const existing = await prisma.user.findUnique({ where: { email } })
    console.log('5. Результат перевірки:', existing)
    
    if (existing) {
      console.log('6. Користувач вже існує')
      return NextResponse.json({ error: 'Користувач вже існує' }, { status: 400 })
    }

    console.log('7. Хешування пароля')
    const hashed = await bcrypt.hash(password, 10)
    console.log('8. Пароль захеповано')

    console.log('9. Створення користувача')
    const user = await prisma.user.create({
      data: { email, password: hashed, name },
    })
    console.log('10. Користувача створено:', user.id)

    return NextResponse.json({ id: user.id, email: user.email }, { status: 201 })
    
  } catch (error) {
    console.error('ПОМИЛКА:', error)
    console.error('Деталі:', error instanceof Error ? error.message : String(error))
    console.error('Стек:', error instanceof Error ? error.stack : 'Немає стеку')
    
    return NextResponse.json(
      { 
        error: 'Server error',
        details: process.env.NODE_ENV === 'development' ? String(error) : undefined
      }, 
      { status: 500 }
    )
  }
}