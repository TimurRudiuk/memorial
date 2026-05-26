'use client'

import { useEffect } from 'react'

export default function ClientEnvLogger() {
  useEffect(() => {
    console.log('NEXT_PUBLIC_APP_TITLE:', process.env.NEXT_PUBLIC_APP_TITLE)
  }, [])

  return null
}