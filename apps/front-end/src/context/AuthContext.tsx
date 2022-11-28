import {
  createContext, useEffect, useState, ReactNode,
} from 'react';
import { useRouter } from 'next/router';

import { api } from 'src/hooks/useApi';
import { AuthCredentialsDTO, UserMeResponseDTO } from '@dashboard/dtos';
import { AUTH_TOKEN_NAME, USER_DATA_NAME } from './constants';
import { AuthValuesType, LoginParams, ErrCallbackType } from './types';

// ** Defaults
const defaultProvider: AuthValuesType = {
  user: null,
  loading: true,
  setLoading: () => Boolean,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
};

const AuthContext = createContext(defaultProvider);

type Props = {
  children: ReactNode
}

function AuthProvider({ children }: Props) {
  // ** States
  const [user, setUser] = useState<UserMeResponseDTO | null>(
    defaultProvider.user,
  );
  const [loading, setLoading] = useState<boolean>(defaultProvider.loading);

  // ** Hooks
  const router = useRouter();

  const handleLogout = () => {
    setUser(null);
    setLoading(false);
    window.localStorage.removeItem(USER_DATA_NAME);
    window.localStorage.removeItem(AUTH_TOKEN_NAME);
    router.push('/login');
  };

  const handleLogin = async (
    params: LoginParams,
    errorCallback?: ErrCallbackType,
  ) => {
    let credentials: AuthCredentialsDTO | null;
    try {
      credentials = await api.auth.login(params);
    } catch (error) {
      console.error('An error occurred while logging in', error);
      if (errorCallback) errorCallback({});
      return;
    }

    window.localStorage.setItem(AUTH_TOKEN_NAME, credentials.authToken);

    let userMeResponse: UserMeResponseDTO | null;
    try {
      userMeResponse = await api.users.me();
    } catch (error) {
      handleLogout();
      return;
    }

    setLoading(false);
    setUser(userMeResponse!);
    window.localStorage.setItem(USER_DATA_NAME, JSON.stringify(userMeResponse!));
    const returnUrl = (router.query.returnUrl as string) || '/home';

    router.replace(returnUrl);
  };

  useEffect(() => {
    const initAuth = async (): Promise<void> => {
      const storedToken = window.localStorage.getItem(AUTH_TOKEN_NAME);
      if (!storedToken) {
        setLoading(false);
        return;
      }

      api.setCredentials(storedToken!);
      let userMeResponse: UserMeResponseDTO | null;
      try {
        userMeResponse = await api.users.me();
      } catch (error) {
        setLoading(false);
        handleLogout();
        return;
      }

      setUser(userMeResponse!);
      window.localStorage.setItem(
        USER_DATA_NAME,
        JSON.stringify(userMeResponse!),
      );
      setLoading(false);

      /*
      if (!router.pathname.includes('login')) {
        router.replace('/login')
      } */
    };

    initAuth().catch(console.error);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // TODO: useMemo on this or something
  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const values = {
    user,
    loading,
    setUser,
    setLoading,
    login: handleLogin,
    logout: handleLogout,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
}

export { AuthContext, AuthProvider };
