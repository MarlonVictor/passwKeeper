import { createContext, ReactNode, useState } from 'react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';

import { api } from '../lib/axios';


export interface UserProps {
  id: string;
  username: string;
}

export interface AuthContextDataProps {
  user: UserProps | undefined;
  signIn: (username: string, password: string) => void;
  isUserLoading: boolean;
}

interface AuthContextProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextDataProps)

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<UserProps>()
  const [isUserLoading, setIsUserLoading] = useState(false)

  const router = useRouter()

  async function signIn(username: string, password: string) {
    if (!username || !password) {
      return toast.error('Preencha os dois campos')
    }

    try {
      setIsUserLoading(true)

      const tokenResponse = await api.post('/users', {
        username,
        password
      })

      api.defaults.headers.common['Authorization'] = `Bearer ${tokenResponse.data.token}`

      const { data } = await api.get('/me')
      
      setUser({
        id: data.user.id,
        username: data.user.username
      })

      router.push('/home')

    } catch(err) {
      console.error(err)
      toast.error('Ocorreu algum erro ao entrar')

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