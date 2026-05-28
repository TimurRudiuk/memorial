'use client'

import { useState } from 'react'

export default function PasswordForm() {
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setMessage('')

    if (newPassword !== confirmPassword) {
      setStatus('error')
      setMessage('Паролі не збігаються')
      return
    }

    setStatus('loading')

    const res = await fetch('/api/profile/password', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ currentPassword, newPassword }),
    })

    const data = await res.json()

    if (res.ok) {
      setStatus('success')
      setMessage('Пароль змінено')
      setCurrentPassword('')
      setNewPassword('')
      setConfirmPassword('')
    } else {
      setStatus('error')
      setMessage(data.error ?? 'Помилка')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Поточний пароль</label>
        <input
          type="password"
          value={currentPassword}
          onChange={e => setCurrentPassword(e.target.value)}
          required
          className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Новий пароль</label>
        <input
          type="password"
          value={newPassword}
          onChange={e => setNewPassword(e.target.value)}
          required
          className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
        />
        <p className="text-xs text-gray-400 mt-1">Мінімум 6 символів</p>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Підтвердіть пароль</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
          required
          className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
        />
      </div>
      {status === 'error' && <p className="text-red-500 text-sm">{message}</p>}
      {status === 'success' && <p className="text-green-600 text-sm">{message}</p>}
      <button
        type="submit"
        disabled={status === 'loading'}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 text-sm"
      >
        {status === 'loading' ? 'Збереження...' : 'Змінити пароль'}
      </button>
    </form>
  )
}