'use client'

import useSWR from 'swr'

const fetcher = (url: string) => fetch(url).then(res => res.json())

export default function MemorialsPage() {
  const { data, error, isLoading } = useSWR('/api/memorials', fetcher)

  if (isLoading) return <p>Завантаження...</p>
  if (error) return <p>Помилка завантаження</p>

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Меморіали</h1>
      <ul className="flex flex-col gap-4">
        {data.map((memorial: any) => (
          <li key={memorial.id} className="border p-4 rounded-lg">
            <h2 className="text-xl font-semibold">
              {memorial.firstName} {memorial.lastName}
            </h2>
            <p className="text-sm text-gray-500">
              {new Date(memorial.birthDate).getFullYear()} —{' '}
              {new Date(memorial.deathDate).getFullYear()}
            </p>
            <p className="mt-2">{memorial.biography}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}