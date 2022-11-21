import { FormEvent, useState } from 'react';
import { api } from '../lib/axios';


export default function Home() {
  const [passwordTitle, setPasswordTitle] = useState('')
  const [passwordValue, setPasswordValue] = useState('')

  async function createPassword(ev: FormEvent) {
    ev.preventDefault()

    try {
      await api.post('/passwords', {
        title: passwordTitle,
        value: passwordValue
      })

      setPasswordTitle('')
      setPasswordValue('')
      
    } catch (err) {
      console.error(err, 'Falha ao cadastrar senha!')
    }
  }

  return (
    <div className="text-neutral-light h-screen grid place-content-center">
      <h1 className="text-3xl font-bold tracking-wide relative after:w-10 after:h-10 after:bg-primary after:absolute after:rounded-full after:-right-14 w-max mx-auto">
        PasswKeeper
      </h1>

      <p className="text-xs opacity-80 text-center pl-8">
        Projeto em construção 🚧
      </p>

      <form onSubmit={createPassword} className="w-full max-w-lg mt-32">
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 mb-12">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Conta
            </label>
            <input 
              className="appearance-none block w-full bg-neutral text-gray-700 rounded py-8 px-6 leading-tight text-neutral-light focus:outline-none focus:bg-neutral-light focus:text-neutral transition-colors" 
              id="title" 
              type="text" 
              placeholder="Github" 
              value={passwordTitle}
              onChange={ev => setPasswordTitle(ev.target.value)}
            />
          </div>
          <div className="w-full md:w-1/2">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Senha
            </label>
            <input 
              className="appearance-none block w-full bg-neutral text-gray-700 rounded py-8 px-6 leading-tight text-neutral-light focus:outline-none focus:bg-neutral-light focus:text-neutral transition-colors" 
              id="value" 
              type="text" 
              placeholder="********" 
              value={passwordValue}
              onChange={ev => setPasswordValue(ev.target.value)}
            />
          </div>
        </div>

        <button type="submit" className="w-full py-6 mt-6 bg-primary rounded-sm text-neutral font-medium transition-all hover:brightness-95">
          Salvar
        </button>
      </form>
    </div>
  )
}
