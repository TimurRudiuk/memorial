'use client'

import { useState } from 'react'


const items = [
  { q: 'Як це працює?', a: 'Ви реєструєтесь, створюєте меморіал — додаєте ім\'я, фото, біографію та дати. Сторінка стає доступною для всіх.' },
  { q: 'Чи це безкоштовно?', a: 'Поки так, базовий функціонал повністю безкоштовний. Створюйте меморіали без обмежень.' },
  { q: 'Чи можна редагувати меморіал після створення?', a: 'Так, ви можете в будь-який час змінити інформацію, фото або біографію.' },
  { q: 'Чи буде сторінка доступна завжди?', a: 'Так, меморіали зберігаються назавжди і доступні цілодобово з будь-якої точки світу.' },
]

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <div className="flex flex-col gap-3">
      {items.map((item, i) => (
        <div key={i} className="border border-gray-200 rounded-xl overflow-hidden">
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex items-center justify-between px-6 py-4 text-left text-sm font-medium text-gray-800 hover:bg-gray-50 transition-colors"
          >
            {item.q}
            <span className="text-gray-400 text-lg">{open === i ? '−' : '+'}</span>
          </button>
          {open === i && (
            <div className="px-6 pb-4 text-sm text-gray-500 leading-relaxed border-t border-gray-100">
              {item.a}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}