import { IoMdTrash, IoIosEye, IoIosEyeOff, IoIosCopy } from 'react-icons/io';
import toast from 'react-hot-toast';

import { PasswordProps } from '../pages/home';
import { Button } from './Button';
import { Label } from './Label';
import { useEffect, useState } from 'react';


interface PasswordDetailProps {
  selectedItem: string;
  selectedPassword: string;
  passwordsShown: PasswordProps[];
}

export function PasswordDetail(data: PasswordDetailProps) {
  const [showPassword, setShowPassword] = useState(false)

  const [title, setTitle] = useState('')
  const [imgUrl, setImgUrl] = useState('')
  const [email, setEmail] = useState('')
  const [value, setValue] = useState('')
  const [website, setWebsite] = useState('')
  const [notes, setNotes] = useState('')

  function copyText(inputId: string) {
    const inputEl = document.querySelector(`.password-detail #${inputId}`)
    const inputValue = inputEl?.getAttribute('value') || ''

    navigator.clipboard.writeText(inputValue)
    toast.success('Texto copiado!')
    setShowPassword(false)
  }

  function getPasswordValues() {
    const password = data.passwordsShown.filter(pw => pw.id == data.selectedPassword)
    setShowPassword(false)

    if (password.length){
      setTitle(password[0].title)
      setImgUrl(password[0].icon || '')
      setEmail(password[0].email)
      setValue(password[0].value)
      setWebsite(password[0].webside)
      setNotes(password[0].notes || '')
    }
  }

  function clearPasswordValues() {
    setTitle('')
    setImgUrl('')
    setEmail('')
    setValue('')
    setWebsite('')
    setNotes('')
  }

  useEffect(() => getPasswordValues(), [data.selectedPassword])
  useEffect(() => clearPasswordValues(), [data.selectedItem])

  if (!title) {
    return (
      <section className='flex-1 grid place-content-center password-detail text-neutral-light'>
        <h1 className='text-3xl font-bold tracking-wide relative after:w-10 after:h-10 after:bg-primary after:absolute after:rounded-full after:-right-14 w-max mx-auto'>
          PasswKeeper
        </h1>
      </section>
    )
  }

  return (
    <section className='flex-1 password-detail'>
      <div className='w-[40rem] xl:w-[33rem] mx-auto h-screen p-28'>

        <header className='border-b-2 border-neutral pb-20'>
          <Button buttonStyle='secondary' additionalClass='text-sm ml-auto'>
            <IoMdTrash size={18} />
            Delete
          </Button>

          <div className='flex items-center gap-28 px-10 py-8 text-neutral-light'>
            {imgUrl
              ? (
                <img 
                  alt={title}
                  src={imgUrl}
                  className='w-64 h-64 bg-neutral-mid rounded-md object-cover'
                />
              )
              : (
                <span className='w-64 h-64 bg-neutral-mid rounded-md grid place-items-center uppercase text-2xl font-semibold text-neutral-light'>
                  {title.split('')[0]}
                </span>
              )
            }

            <div className='flex flex-col gap-8'>
              <strong className='font-semibold text-2xl leading-[100%]'>
                {title}
              </strong>

              <span className='text-sm leading-[100%] brightness-75'>
                Login
              </span>
            </div>
          </div>
        </header>
        
        <ul className='border-b-2 border-neutral py-20'>
          <li className='group flex items-center justify-between px-10 py-16 hover:bg-white-o transition-colors rounded-md'>
            <div className='flex flex-col flex-1 gap-2'>
              <Label text='Username' inputId='username' />
              <input 
                type='text' 
                id='username' 
                value={email} 
                onChange={e => setValue(e.target.value)}
                readOnly
                className='ml-2 leading-[100%] bottom-0 bg-transparent text-neutral-light pointer-events-none outline-none'
              />
            </div>

            <Button 
              buttonStyle='icon' 
              onClick={() => copyText('username')}
              additionalClass='opacity-0 group-hover:opacity-100 transition-opacity'
            >
              <IoIosCopy size={18} />
            </Button>
          </li>

          <li className='group flex items-center justify-between px-10 py-16 hover:bg-white-o transition-colors rounded-md'>
            <div className='flex flex-col flex-1 gap-2'>
              <Label text='Password' inputId='password' />
              <input 
                type={showPassword ? 'text' : 'password'}
                id='password' 
                value={value} 
                onChange={e => setValue(e.target.value)}
                readOnly
                className='ml-2 leading-[100%] bottom-0 bg-transparent text-neutral-light pointer-events-none outline-none'
              />
            </div>

            <div className='flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity'>
              <Button buttonStyle='icon' onClick={() => setShowPassword(!showPassword)}>
                {showPassword 
                  ? <IoIosEyeOff size={18} />
                  : <IoIosEye size={18} />
                }
              </Button>
              

              <Button buttonStyle='icon' onClick={() => copyText('password')}>
                <IoIosCopy size={18} />
              </Button>
            </div>
          </li>

          <li className='group flex items-center justify-between px-10 py-16 hover:bg-white-o transition-colors rounded-md'>
            <div className='flex flex-col flex-1 gap-2'>
              <Label text='Website' inputId='website' />
              <input 
                type='text' 
                id='website' 
                value={website} 
                onChange={e => setWebsite(e.target.value)}
                readOnly
                className='ml-2 leading-[100%] bottom-0 bg-transparent text-neutral-light pointer-events-none outline-none'
              />
            </div>

            <Button 
              buttonStyle='icon' 
              onClick={() => copyText('website')}
              additionalClass='opacity-0 group-hover:opacity-100 transition-opacity'
            >
              <IoIosCopy size={18} />
            </Button>
          </li>
        </ul>

        {notes && (
          <ul className='py-20'>
            <li className='group flex flex-col gap-2 px-10 py-16'>
              <Label text='Notes' inputId='notes' />
              <textarea 
                id='notes' 
                readOnly
                className='ml-2 h-160 leading-[140%] bottom-0 bg-transparent text-neutral-light pointer-events-none resize-none overflow-hidden'
                value={notes}
                onChange={e => setNotes(e.target.value)}
              />
            </li>
          </ul>
        )}
      </div>
    </section>
  )
}