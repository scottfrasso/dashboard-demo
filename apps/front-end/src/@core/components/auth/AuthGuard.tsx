// ** React Imports
import { ReactNode, ReactElement, useEffect } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** Hooks Import
import { useAuth } from 'src/hooks/useAuth'
import { USER_DATA_NAME } from 'src/context/constants'

interface AuthGuardProps {
  children: ReactNode
  fallback: ReactElement | null
}

function AuthGuard(props: AuthGuardProps) {
  const { children, fallback } = props
  const auth = useAuth()
  const router = useRouter()

  useEffect(
    () => {
      if (!router.isReady) {
        return
      }

      if (auth.user === null && !window.localStorage.getItem(USER_DATA_NAME)) {
        if (router.asPath !== '/') {
          router.replace({
            pathname: '/login',
            query: { returnUrl: router.asPath },
          })
        } else {
          router.replace('/login')
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router.route],
  )

  if (auth.loading || auth.user === null) {
    return fallback
  }

  return <>{children}</>
}

export default AuthGuard
