import { createContext, ReactNode, useCallback, useState } from 'react'
import Cookies from 'js-cookie'

import api from '../services/api'

type User = {
  id: string
  email: string
  name: string
  avatar_url: string
}

type AuthState = {
  token: string
  user: User
}

type SignInCredentials = {
  email: string
  password: string
}

type AuthContextData = {
  user: User
  signIn(credentials: SignInCredentials): Promise<void>
  signOut(): void
  updateUser(user: User): void
}

export const AuthContext = createContext({} as AuthContextData)

type AuthProviderProps = {
  children?: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [data, setData] = useState<AuthState>(() => {
    const token = Cookies.get('@MarvelStone:token')
    const user = Cookies.get('@MarvelStone:user')

    if (token && user) {
      api.defaults.headers.authorization = `Bearer ${token}`
      return { token, user: JSON.parse(user) as User }
    }

    return {} as AuthState
  })

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('sessions', { email, password })
    const { token, user } = response.data

    Cookies.set('@MarvelStone:token', token)
    Cookies.set('@MarvelStone:user', JSON.stringify(user))

    api.defaults.headers.authorization = `Bearer ${token}`
    setData({ token, user })
  }, [])

  const signOut = useCallback(() => {
    Cookies.remove('@MarvelStone:token')
    Cookies.remove('@MarvelStone:user')

    setData({} as AuthState)
  }, [])

  const updateUser = useCallback(
    (user: User) => {
      localStorage.setItem('@MarvelStone:user', JSON.stringify(user))

      setData({
        token: data.token,
        user
      })
    },
    [setData, data.token]
  )

  return (
    <AuthContext.Provider
      value={{ user: data.user, signIn, signOut, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  )
}
