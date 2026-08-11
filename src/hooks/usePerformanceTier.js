import { useEffect, useState } from 'react'

export function usePerformanceTier() {
  const [tier, setTier] = useState('balanced')

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const compact = window.matchMedia('(max-width: 760px)').matches
    const saveData = Boolean(navigator.connection?.saveData)
    const memory = navigator.deviceMemory || 8
    const cores = navigator.hardwareConcurrency || 8

    if (reducedMotion || saveData) setTier('reduced')
    else if (compact || memory <= 4 || cores <= 4) setTier('balanced')
    else setTier('high')
  }, [])

  return tier
}
