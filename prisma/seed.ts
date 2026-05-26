import { PrismaClient } from '@prisma/client'
import { PrismaNeon } from '@prisma/adapter-neon'
import 'dotenv/config'

const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL! })
const prisma = new PrismaClient({ adapter })

async function main() {
  await prisma.memorial.createMany({
    data: [
      {
        firstName: 'Тарас',
        lastName: 'Шевченко',
        birthDate: new Date('1814-03-09'),
        deathDate: new Date('1861-03-10'),
        biography: 'Український поет, художник і громадський діяч.',
        photoUrl: null,
      },
      {
        firstName: 'Леся',
        lastName: 'Українка',
        birthDate: new Date('1871-02-25'),
        deathDate: new Date('1913-08-01'),
        biography: 'Українська письменниця, поетеса і перекладачка.',
        photoUrl: null,
      },
      {
        firstName: 'Іван',
        lastName: 'Франко',
        birthDate: new Date('1856-08-27'),
        deathDate: new Date('1916-05-28'),
        biography: 'Український письменник, поет, вчений і громадський діяч.',
        photoUrl: null,
      },
    ],
  })

  console.log('Seed завершено')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })