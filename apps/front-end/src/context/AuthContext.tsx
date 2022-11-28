import { createContext, useEffect, useState, ReactNode } from 'react'
import { useRouter } from 'next/router'

import { AUTH_TOKEN_NAME, USER_DATA_NAME } from './constants'
import {
  AuthValuesType,
  RegisterParams,
  LoginParams,
  ErrCallbackType,
} from './types'
import { api } from 'src/hooks/useApi'
import { AuthCredentialsDTO, UserMeResponseDTO } from '@dashboard/dtos'

// ** Defaults
const defaultProvider: AuthValuesType = {
  user: null,
  loading: true,
  setLoading: () => Boolean,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
}

const AuthContext = createContext(defaultProvider)

type Props = {
  children: ReactNode
}

const AuthProvider = ({ children }: Props) => {
  // ** States
  const [user, setUser] = useState<UserMeResponseDTO | null>(
    defaultProvider.user,
  )
  const [loading, setLoading] = useState<boolean>(defaultProvider.loading)

  // ** Hooks
  const router = useRouter()

  useEffect(() => {
    const initAuth = async (): Promise<void> => {
      const storedToken = window.localStorage.getItem(AUTH_TOKEN_NAME)
      if (!storedToken) {
        setLoading(false)
        return
      }

      setLoading(true)

      api.setCredentials(storedToken!)
      let userMeResponse: UserMeResponseDTO | null
      try {
        userMeResponse = await api.users.me()
      } catch (error) {
        handleLogout()
        return
      }

      setLoading(false)
      setUser(userMeResponse!)
    }

    initAuth().catch(console.error)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleLogin = async (
    params: LoginParams,
    errorCallback?: ErrCallbackType,
  ) => {
    let credentials: AuthCredentialsDTO | null
    try {
      credentials = await api.auth.login(params)
    } catch (error) {
      console.error('An error occurred while logging in', error)
      if (errorCallback) errorCallback({})
      return
    }

    window.localStorage.setItem(AUTH_TOKEN_NAME, credentials.authToken)

    let userMeResponse: UserMeResponseDTO | null
    try {
      userMeResponse = await api.users.me()
    } catch (error) {
      handleLogout()
      return
    }

    setLoading(false)
    setUser(userMeResponse!)
    const returnUrl = (router.query.returnUrl as string) || '/home'

    router.replace(returnUrl)
  }

  const handleLogout = () => {
    setUser(null)
    setLoading(false)
    window.localStorage.removeItem(USER_DATA_NAME)
    window.localStorage.removeItem(AUTH_TOKEN_NAME)
    router.push('/login')
  }

  const values = {
    user,
    loading,
    setUser,
    setLoading,
    login: handleLogin,
    logout: handleLogout,
  }

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export { AuthContext, AuthProvider }
