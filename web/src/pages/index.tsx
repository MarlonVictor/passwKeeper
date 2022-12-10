import { useState } from 'react';
import { MdLogin } from 'react-icons/md';
import { ImSpinner2 } from 'react-icons/im';

import { Label } from '../components/Label';
import { Input } from '../components/Input';
import { Button } from '../components/Button';

import { useAuth } from '../hooks/useAuth';


export default function SignIn() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const { signIn, isUserLoading } = useAuth()

  return (
    <div className='text-neutral-light h-screen grid place-content-center'>
      <h1 className='text-3xl font-bold tracking-wide relative after:w-10 after:h-10 after:bg-primary after:absolute after:rounded-full after:-right-14 w-max mx-auto'>
        PasswKeeper
      </h1>

      <p className='text-xs opacity-80 text-center pt-4'>
        Caso não tenha uma conta, criaremos com os dados <br/>
        imputados abaixo 🔒
      </p>

      <form className='w-[25rem] mt-32'>
        <div className='flex flex-col -mx-3 mb-12'>
          <div className='w-full mb-14'>
            <Label text='Login' inputId='username' />
            <Input 
              id='username' 
              type='text' 
              placeholder='Username' 
              value={username}
              onChange={ev => setUsername(ev.target.value)}
              inputStyle='default'
            />
          </div>

          <div className='w-full'>
            <Label text='Senha' inputId='value' />
            <Input 
              id='value' 
              type='text' 
              placeholder='********' 
              value={password}
              onChange={ev => setPassword(ev.target.value)}
              inputStyle='default'
            />
          </div>
        </div>

        <Button 
          type='button' 
          buttonStyle='primary' 
          additionalClass='w-full'
          isLoading={isUserLoading}
          onClick={() => signIn(username, password)}
        >
          {isUserLoading
            ? <ImSpinner2 size={16} className='animate-spin' />
            : (
              <>
                ENTRAR
                <MdLogin size={16} />
              </>
            )}
        </Button>
      </form>
    </div>
  )
}