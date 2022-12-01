import { Button } from './Button';
import { Input } from './Input';

import { IoMdAdd } from 'react-icons/io';


interface PasswordItemProps {
  title: string;
  username: string;
  imgUrl?: string;
  isSelected: boolean;
}

interface PasswordListProps {
  selectedPassword: string;
  setSelectedPassword: (item: string) => void;
}

export function PasswordList(listData: PasswordListProps) {
  const passwords = [
    { title: 'Youtube', username: 'cmarlonvictor11@gmail.com', imgUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/YouTube_social_red_square_%282017%29.svg/1024px-YouTube_social_red_square_%282017%29.svg.png' },
    { title: 'Facebook', username: 'cmarlonvictor@yahoo.com.br', imgUrl: 'https://www.giochiunitiinternational.com/wp-content/uploads/2020/10/facebook-logo-vector-images-icon-sign-and-symbols-facebook-vector-png-600_600.png' },
    { title: 'Banco Inter', username: 'MarlonCRV' },
    { title: 'Nike', username: 'cmarlonvictor@yahoo.com.br', imgUrl: 'https://www.nike.com.br/images/meta/open-graph-main-image.jpg' }
  ]

  const PasswordItem = (passwordData: PasswordItemProps) => (
    <li 
      onClick={() => listData.setSelectedPassword(passwordData.title)} 
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
          id='username' 
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

        {passwords.map(password => (
          <PasswordItem 
            title={password.title}
            username={password.username}
            imgUrl={password.imgUrl}
            isSelected={listData.selectedPassword == password.title}
          />
        ))}

      </ul>
    </section>
  )
}