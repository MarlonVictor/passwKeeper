import { createContext, ReactNode } from 'react';


interface UserProps {
  name: string;
  avatarUrl: string;
}

export interface AuthContextDataProps {
  user: UserProps;
  signIn: () => Promise<void>;
}

interface AuthContextProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextDataProps)

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const user = {
    name: 'Marlon',
    avatarUrl: 'oi'
  }

  async function signIn() {
    console.log('SIGNIN')
  }

  return (
    <AuthContext.Provider value={{ user, signIn }}>
      {children}
    </AuthContext.Provider>
  )
}