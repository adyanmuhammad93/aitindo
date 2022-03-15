import { useRouter } from 'next/router'
import { createContext, useContext, useEffect } from 'react'
import { useIsLoggedIn } from 'hooks/useAuth'
import {
  postValidateCustomerToken,
  removeUserLoginInfoFromLocalStorage,
} from '../services/auth-service'

const authContext = createContext()

const AuthContextProvider = ({ children }) => {
  const router = useRouter()
  const isLoggedIn = useIsLoggedIn()

  const validateToken = async () => {
    try {
      if (!isLoggedIn) return true

      await postValidateCustomerToken()

      return true
    } catch (err) {
      console.error(err)
      return false
    }
  }

  const handleUnauthorized = async () => {
    const isAuthorized = await validateToken()

    if (!isAuthorized) {
      await removeUserLoginInfoFromLocalStorage()
      router.replace('/')
    }
  }

  useEffect(() => {
    if (isLoggedIn === null) return

    handleUnauthorized()
  }, [isLoggedIn])

  return (
    <authContext.Provider value={{ handleUnauthorized }}>
      {children}
    </authContext.Provider>
  )
}

export const useAuthContext = () => useContext(authContext)

export default AuthContextProvider
