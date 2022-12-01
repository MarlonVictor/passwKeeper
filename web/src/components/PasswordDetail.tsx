import { IoMdTrash, IoIosEye, IoIosEyeOff, IoIosCopy } from 'react-icons/io';

import { Button } from "./Button";
import { Label } from './Label';

export function PasswordDetail() {
  return (
    <section className="flex-1">
      <div className="w-[40rem] xl:w-[33rem] mx-auto h-screen py-28">

        <header className='border-b-2 border-neutral pb-20'>
          <Button buttonStyle='secondary' additionalClass='text-sm ml-auto'>
            <IoMdTrash size={18} />
            Delete
          </Button>

          <div className='flex items-center gap-28 p-8 text-neutral-light'>
            <img 
              src='https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/YouTube_social_red_square_%282017%29.svg/1024px-YouTube_social_red_square_%282017%29.svg.png'
              className='w-64 h-64 bg-neutral-mid rounded-md object-cover'
            />

            <div className='flex flex-col gap-8'>
              <strong className='font-semibold text-2xl leading-[100%]'>
                Youtube
              </strong>

              <span className='text-sm leading-[100%] brightness-75'>
                Login
              </span>
            </div>
          </div>
        </header>
        
        <ul className='border-b-2 border-neutral py-20'>
          <li className='group flex items-center justify-between p-16 hover:bg-white-o transition-colors rounded-md'>
            <div className='flex flex-col flex-1 gap-2'>
              <Label text='Username' inputId='username' />
              <input 
                type="text" 
                id='username' 
                value='cmarlonvictor11@gmail.com' 
                readOnly
                className='ml-2 leading-[100%] bottom-0 bg-transparent text-neutral-light pointer-events-none'
              />
            </div>

            <Button buttonStyle='icon' additionalClass='opacity-0 group-hover:opacity-100 transition-opacity'>
              <IoIosCopy size={18} />
            </Button>
          </li>

          <li className='group flex items-center justify-between p-16 hover:bg-white-o transition-colors rounded-md'>
            <div className='flex flex-col flex-1 gap-2'>
              <Label text='Password' inputId='password' />
              <input 
                type="password" 
                id='password' 
                value='ee11' 
                readOnly
                className='ml-2 leading-[100%] bottom-0 bg-transparent text-neutral-light pointer-events-none'
              />
            </div>

            <div className="flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button buttonStyle='icon'>
                <IoIosEye size={18} />
              </Button>

              <Button buttonStyle='icon'>
                <IoIosCopy size={18} />
              </Button>
            </div>
          </li>
        </ul>

      </div>
    </section>
  )
}