import ClientEnvLogger from '@/components/ClientEnvLogger'
import { headers } from 'next/headers'

export default function HomePage() {
  // Серверна консоль
  console.log('APP_NAME:', process.env.APP_NAME)
  console.log('APP_VERSION:', process.env.APP_VERSION)

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">
        {process.env.NEXT_PUBLIC_APP_TITLE}
      </h1>
      <p className="mt-2 text-gray-500">
        Version: {process.env.APP_VERSION}
      </p>
      <ClientEnvLogger />
    </div>
  )
}