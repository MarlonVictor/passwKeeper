import { createContext, ReactNode, useState } from 'react';

import { api } from '../services/api';


export interface AuthContextDataProps {
  user: string;
  signIn: (username: string, password: string) => void;
  isUserLoading: boolean;
}

interface AuthContextProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextDataProps)

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState('')
  const [isUserLoading, setIsUserLoading] = useState(false)

  async function signIn(username: string, password: string) {
    if (!username || !password) return

    try {
      setIsUserLoading(true)

      const tokenResponse = await api.post('/users', {
        username,
        password
      })

      api.defaults.headers.common['Authorization'] = `Bearer ${tokenResponse.data.token}`

      const userResponse = await api.get('/me')
      setUser(userResponse.data.user.username)

    } catch(err) {
      console.error(err)

    } finally {
      setIsUserLoading(false)
    }
  }

  return (
    <AuthContext.Provider value={{ user, signIn, isUserLoading }}>
      {children}
    </AuthContext.Provider> 
  )
}