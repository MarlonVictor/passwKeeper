import { PasswordProps } from '../pages/home';
import { Button } from './Button';
import { Input } from './Input';

import { IoMdAdd } from 'react-icons/io';


interface PasswordItemProps {
  id: string;
  title: string;
  username: string;
  imgUrl?: string;
  isSelected: boolean;
}

interface PasswordListProps {
  passwords: PasswordProps[];
  selectedPassword: string;
  setSelectedPassword: (item: string) => void;
}

export function PasswordList(listData: PasswordListProps) {
  const PasswordItem = (passwordData: PasswordItemProps) => (
    <li 
      onClick={() => listData.setSelectedPassword(passwordData.id)} 
      className={`
      flex items-center rounded-md gap-12 p-16 cursor-pointer transition-all hover:bg-white-o
      ${passwordData.isSelected ? '!bg-primary text-black shadow-md' : 'text-neutral-light'}
    `}>

      {passwordData.imgUrl
        ? (
          <img 
            alt={passwordData.title}
            src={passwordData.imgUrl}
            className='w-34 h-34 bg-neutral-mid rounded-md object-cover'
          />
        )
        : (
          <span className='w-34 h-34 bg-neutral-mid rounded-md grid place-items-center uppercase text-2xl font-semibold text-neutral-light'>
            {passwordData.title.split('')[0]}
          </span>
        )
      }
      

      <div className='flex flex-col gap-8'>
        <strong className='font-semibold text-lg leading-[100%]'>
          {passwordData.title}
        </strong>

        <span className='text-sm leading-[100%] brightness-75'>
          {passwordData.username}
        </span>
      </div>

    </li>
  )

  return (
    <section className='flex flex-col px-16 border-r-4 border-black w-[30rem]'>
      <div className='flex gap-20 mt-28'>
        <Input 
          id='search' 
          type='text' 
          placeholder='Search Password' 
          inputStyle='default'
        />

        <Button 
          type='button' 
          buttonStyle='primary' 
          additionalClass='px-16 py-0'
        >
          <IoMdAdd size={18} />
        </Button>
      </div>

      <ul className='flex flex-col gap-8 mt-28'>

        {!listData.passwords.length
          ? <span className='text-neutral-light block mx-auto'>Empty list</span>
          : listData.passwords.map(password => (
              <PasswordItem 
                key={password.id}
                id={password.id}
                title={password.title}
                username={password.email}
                imgUrl={password.icon}
                isSelected={listData.selectedPassword == password.id}
              />
            ))
        }       

      </ul>
    </section>
  )
}