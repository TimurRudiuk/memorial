import Link from 'next/link'
import { auth } from '@/auth'
import prisma from '@/lib/prisma'
import ScrollReveal from '@/components/ScrollReveal'
import FAQ from '@/components/FAQ'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default async function HomePage() {
  const session = await auth()
  const count = await prisma.memorial.count()
  const latest = await prisma.memorial.findMany({
    orderBy: { createdAt: 'desc' },
    take: 3,
  })

  return (
    <div className="min-h-screen bg-[#faf9f7]">

      <Navbar />

      {/* Hero з текстурою */}
      <section
        className="flex flex-col items-center justify-center text-center py-24 px-8"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      >
        <div className="w-10 h-px bg-gray-300 mb-5" />
        <h1 style={{ fontFamily: 'var(--font-parisienne)' }} className="text-[88px] leading-none text-gray-900 mb-5">
          Memorial
        </h1>
        <p className="text-gray-400 italic text-base max-w-sm mb-9 leading-relaxed">
          Збережіть пам'ять про близьких — назавжди
        </p>
        <Link href="/memorials" className="px-8 py-3 bg-gray-900 text-white text-sm rounded-lg hover:bg-gray-700 transition-colors">
          Переглянути меморіали
        </Link>
      </section>

      {/* Лічильник */}
      <ScrollReveal>
        <section className="py-10 bg-gray-900 text-white text-center">
          <p className="text-5xl font-bold">{count}</p>
          <p className="text-gray-400 text-sm mt-2">меморіалів вже створено</p>
        </section>
      </ScrollReveal>

      {/* Що це за сайт */}
      <ScrollReveal>
        <section className="border-t border-gray-200 py-16 px-8">
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
            <div className="flex flex-col items-center gap-3">
              <span className="text-3xl">🕯️</span>
              <h3 className="text-sm font-semibold text-gray-800">Онлайн могила</h3>
              <p className="text-sm text-gray-500 leading-relaxed">Створіть цифрове місце пам'яті для своїх близьких, яке доступне з будь-якої точки світу в будь-який час.</p>
            </div>
            <div className="flex flex-col items-center gap-3">
              <span className="text-3xl">🖼️</span>
              <h3 className="text-sm font-semibold text-gray-800">Фото та біографія</h3>
              <p className="text-sm text-gray-500 leading-relaxed">Зберігайте фотографії, життєпис та важливі дати — щоб образ дорогої людини залишався живим у пам'яті.</p>
            </div>
            <div className="flex flex-col items-center gap-3">
              <span className="text-3xl">🌹</span>
              <h3 className="text-sm font-semibold text-gray-800">Навідайте в будь-який час</h3>
              <p className="text-sm text-gray-500 leading-relaxed">Незалежно від відстані — ви завжди можете прийти і вшанувати пам'ять тих, кого більше немає поряд.</p>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Цитата */}
      <ScrollReveal>
        <section className="py-16 px-8 bg-white border-t border-gray-200 text-center">
          <p className="text-xl italic text-gray-500 max-w-xl mx-auto leading-relaxed">
            "Люди помирають двічі — перший раз коли їх не стає, і вдруге — коли про них забувають."
          </p>
          <p className="text-sm text-gray-400 mt-4">— народна мудрість</p>
        </section>
      </ScrollReveal>

      {/* Останні меморіали */}
      <ScrollReveal>
        <section className="py-16 px-8 border-t border-gray-200">
          <h2 className="text-center text-xl font-semibold text-gray-700 mb-12">Останні меморіали</h2>
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            {latest.length === 0 ? (
              <p className="col-span-3 text-center text-gray-400 text-sm">Меморіалів ще немає</p>
            ) : (
              latest.map((person) => (
                <Link href={`/memorials/${person.id}`} key={person.id}
                  className="flex flex-col items-center gap-4 p-6 border border-gray-200 rounded-2xl bg-[#faf9f7] hover:shadow-md transition-shadow">
                  <img src="/grave.png" alt="надгробок" className="w-32 h-32 object-contain" />
                  <div className="text-center">
                    <p className="font-semibold text-gray-800">{person.firstName} {person.lastName}</p>
                    <p className="text-sm text-gray-400 mt-1">
                      {new Date(person.birthDate).getFullYear()} — {new Date(person.deathDate).getFullYear()}
                    </p>
                  </div>
                </Link>
              ))
            )}
          </div>
        </section>
      </ScrollReveal>

      {/* CTA */}
      <ScrollReveal>
        <section className="py-20 px-8 bg-gray-900 text-white text-center border-t border-gray-800">
          <h2 className="text-2xl font-semibold mb-3">Створіть меморіал вже сьогодні</h2>
          <p className="text-gray-400 text-sm mb-8 max-w-md mx-auto leading-relaxed">
            Збережіть пам'ять про близьку людину — безкоштовно, назавжди, доступно з будь-якого пристрою.
          </p>
          <Link
            href={session?.user ? '/memorials/create' : '/login'}
            className="px-8 py-3 bg-white text-gray-900 text-sm font-medium rounded-lg hover:bg-gray-100 transition-colors"
          >
            Створити меморіал
          </Link>
        </section>
      </ScrollReveal>

      {/* FAQ */}
      <ScrollReveal>
        <section className="py-16 px-8 border-t border-gray-200">
          <h2 className="text-center text-xl font-semibold text-gray-700 mb-10">Часті запитання</h2>
          <div className="max-w-2xl mx-auto">
            <FAQ />
          </div>
        </section>
      </ScrollReveal>

      <Footer />

    </div>
  )
}