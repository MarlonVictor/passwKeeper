import { createContext, ReactNode, useState } from 'react';


interface UserProps {
  username: string;
  password: string;
}

export interface AuthContextDataProps {
  user: UserProps;
  signIn: (username: string, password: string) => void;
}

interface AuthContextProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextDataProps)

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<UserProps>({
    username: '',
    password: ''
  })

  function signIn(username: string, password: string) {
    if (!username || !password) return
    
    setUser({
      username: username,
      password: password
    })
  }

  return (
    <AuthContext.Provider value={{ user, signIn }}>
      {children}
    </AuthContext.Provider> 
  )
}