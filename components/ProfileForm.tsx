'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useSession } from 'next-auth/react'

interface Props {
  initialName: string | null
  email: string
}

export default function ProfileForm({ initialName, email }: Props) {
  const { update } = useSession()
  const router = useRouter()
  const [name, setName] = useState(initialName ?? '')
  const [isEditing, setIsEditing] = useState(false)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')

    const res = await fetch('/api/profile', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name }),
    })

    const data = await res.json()

    if (res.ok) {
      await update({ name: data.name })
      router.refresh()
      setStatus('success')
      setMessage('Збережено')
      setIsEditing(false)
    } else {
      setStatus('error')
      setMessage(data.error ?? 'Помилка')
    }
  }

  return !isEditing ? (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-2 text-sm">
        <span className="text-gray-500">Email</span>
        <span className="col-span-2">{email}</span>
        <span className="text-gray-500">Імʼя</span>
        <span className="col-span-2">{name || <span className="text-gray-400 italic">не вказано</span>}</span>
      </div>
      {status === 'success' && <p className="text-green-600 text-sm">{message}</p>}
      <button
        onClick={() => setIsEditing(true)}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
      >
        Редагувати
      </button>
    </div>
  ) : (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <input
          type="email"
          value={email}
          disabled
          className="w-full border p-2 rounded bg-gray-100 text-gray-500 text-sm"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Імʼя</label>
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
        />
      </div>
      {status === 'error' && <p className="text-red-500 text-sm">{message}</p>}
      <div className="flex gap-3">
        <button
          type="submit"
          disabled={status === 'loading'}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 text-sm"
        >
          {status === 'loading' ? 'Збереження...' : 'Зберегти'}
        </button>
        <button
          type="button"
          onClick={() => { setIsEditing(false); setName(initialName ?? '') }}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 text-sm"
        >
          Скасувати
        </button>
      </div>
    </form>
  )
}