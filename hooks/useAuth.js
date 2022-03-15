import { useEffect, useState } from 'react'

export const useIsLoggedIn = () => {
  const [isLoggeedIn, setIsLoggedIn] = useState(null)

  useEffect(() => {
    if (localStorage.getItem('isLogin') === '1') setIsLoggedIn(true)
    else setIsLoggedIn(false)
  }, [])

  return isLoggeedIn
}
