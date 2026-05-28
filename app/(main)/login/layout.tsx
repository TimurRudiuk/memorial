import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#faf9f7] flex flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center px-8 py-16">
        {children}
      </main>
      <Footer />
    </div>
  )
}