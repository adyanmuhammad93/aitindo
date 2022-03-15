import { useEffect } from 'react'

export default function PreventScroll(preventScroll) {
  useEffect(() => {
    if (preventScroll) {
      document.querySelector('html').classList.add('overflow-y-hidden')
      document.querySelector('html').classList.remove('overflow-y-auto')
    } else {
      document.querySelector('html').classList.add('overflow-y-auto')
      document.querySelector('html').classList.remove('overflow-y-hidden')
    }
  }, [preventScroll])

  return { preventScroll }
}
