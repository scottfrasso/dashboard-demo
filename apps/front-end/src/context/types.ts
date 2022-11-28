import { UserMeResponseDTO } from '@dashboard/dtos';

export type ErrCallbackType = (err: { [key: string]: string }) => void

export type LoginParams = {
  email: string
  password: string
  rememberMe?: boolean
}

export type RegisterParams = {
  email: string
  username: string
  password: string
}

export type AuthValuesType = {
  loading: boolean
  logout: () => void
  user: UserMeResponseDTO | null
  setLoading: (value: boolean) => void
  login: (params: LoginParams, errorCallback?: ErrCallbackType) => void
}
