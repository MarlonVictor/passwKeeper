import { useEffect, useState } from 'react';
import Select, { StylesConfig } from 'react-select'
import { IoMdAdd } from 'react-icons/io';
import { ImSpinner2 } from 'react-icons/im';
import toast from 'react-hot-toast';

import { CategoryProps, PasswordProps } from '../pages/home';
import { Modal } from './Modal';
import { Button } from './Button';
import { Input } from './Input';
import { Label } from './Label';

import { api } from '../lib/axios';
import { useAuth } from '../hooks/useAuth';


interface PasswordItemProps {
  id: string;
  title: string;
  username: string;
  imgUrl?: string;
  isSelected: boolean;
}

interface PasswordListProps {
  passwords: PasswordProps[];
  categories: CategoryProps[] | [];
  selectedPassword: string;
  searchText: string;
  updatePasswords: () => void;
  setSelectedItem: (item: string) => void;
  setSelectedPassword: (item: string) => void;
  setSearchText: (item: string) => void;
}

interface CategoryListProps {
  value: string;
  label: string;
}

const selectStyles: StylesConfig = {
  control: (styles) => ({ 
    ...styles, 
    backgroundColor: '#393E46',
    color: '#EEE',
    border: 'none',
    minHeight: 'none',
    height: '2.4375rem',
    borderRadius: '0.375rem',
    borderColor: '#393E46',
    fontSize: '.875rem',
  }),
  option: (styles, { data, isFocused, isSelected }) => {
    return {
      ...styles,
      backgroundColor: isSelected ? '#717171' : isFocused ? 'rgba(255,255,255,0.05)' : '#393E46',
      color: '#EEE',
      fontSize: '.875rem',
      cursor: 'pointer',
    }
  },
  menu: (styles) => ({ ...styles, backgroundColor: '#393E46' }),
  placeholder: (styles) => ({ ...styles, color: '#EEE' }),
  input: (styles) => ({ ...styles, color: '#EEE' }),
  singleValue: (styles) => ({ ...styles, color: '#EEE' }),
}

export function PasswordList(listData: PasswordListProps) {
  const { user } = useAuth()

  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [newPasswordLoading, setNewPasswordLoading] = useState(false)
  const [categoriesList, setCategoriesList] = useState<CategoryListProps[]>([])
  const [categorySelected, setCategorySelected] = useState<string>('')

  const [newPassword, setNewPassword] = useState({
    title: '',
    email: '',
    value: '',
    icon: '',
    webside: '',
    notes: '',
  })

  async function handleCreatePassword() {
    if (!newPassword.title || !newPassword.email || !newPassword.value || !newPassword.webside)
      return toast.error('Fill in the required fields *')

    try {
      setNewPasswordLoading(true)

      await api.post('/passwords', {
        ...newPassword,
        userId: user?.id,
        categoryId: categorySelected.length ? categorySelected : categoriesList[0].value
      })

      listData.updatePasswords()
      listData.setSelectedItem('home')

    } catch (err) {
      toast.error('Error to creating password')

    } finally {
      setNewPasswordLoading(false)
      handleCloseModal()
    }
  }

  function handleCloseModal() {
    setModalIsOpen(false)

    setNewPassword({
      title: '',
      email: '',
      value: '',
      icon: '',
      webside: '',
      notes: '',
    })
  }

  useEffect(() => {
    const modalOverlay = document.querySelectorAll('.ReactModalPortal')

    setCategoriesList(listData.categories?.map(category => ({
      value: category.id,
      label: category.title
    })))

    modalOverlay?.forEach(modal => modal.addEventListener('click', (ev: any) =>
      ev.target.classList.contains('ReactModal__Overlay') && handleCloseModal()
    ))
  }, [listData.categories])

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
    <>
      <section className='flex flex-col px-16 border-r-4 border-black w-[30rem]'>
        <div className='flex gap-20 mt-28'>
          <Input 
            id='search' 
            type='text' 
            placeholder='Search Password' 
            inputStyle='default'
            value={listData.searchText}
            onChange={(e) => 
              listData.setSearchText(e.target.value.toLocaleLowerCase())
            }
          />

          <Button 
            type='button' 
            buttonStyle='primary' 
            additionalClass='px-16 py-0'
            onClick={() => setModalIsOpen(true)}
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

      <Modal isOpen={modalIsOpen} title='New Password' width='40'>
        <Label text='Title *' inputId='newPasswordTitle' additionalClass='mt-8' />
        <Input 
          inputStyle='default' 
          id='newPasswordTitle'
          value={newPassword.title}
          onChange={(e) => setNewPassword(password => ({...password, title: e.target.value}))}
        />

        <div className='grid grid-cols-2 gap-8 mt-8'>
          <div>
            <Label text='Username/Email *' inputId='newPasswordUsername' />
            <Input 
              inputStyle='default' 
              id='newPasswordUsername'
              value={newPassword.email}
              onChange={(e) => setNewPassword(password => ({...password, email: e.target.value}))}
            />
          </div>

          <div>
            <Label text='Password *' inputId='newPasswordValue' />
            <Input 
              inputStyle='default' 
              id='newPasswordValue'
              value={newPassword.value}
              onChange={(e) => setNewPassword(password => ({...password, value: e.target.value}))}
            />
          </div>
        </div>

        <Label text='Category *' inputId='newPasswordCategory' additionalClass='mt-8' />
        <Select
          defaultValue={categoriesList[0]}
          isSearchable={true}
          options={categoriesList}
          styles={selectStyles}
          onChange={(e: any) => setCategorySelected(e.value)}
        />

        <Label text='Icon URL' inputId='newPasswordIcon' additionalClass='mt-8' />
        <Input 
          inputStyle='default' 
          id='newPasswordIcon'
          value={newPassword.icon}
          onChange={(e) => setNewPassword(password => ({...password, icon: e.target.value}))}
        />

        <Label text='Website *' inputId='newPasswordWebsite' additionalClass='mt-8' />
        <Input 
          inputStyle='default' 
          id='newPasswordWebsite'
          value={newPassword.webside}
          onChange={(e) => setNewPassword(password => ({...password, webside: e.target.value}))}
        />

        <Label text='Notes' inputId='newPasswordNotes' additionalClass='mt-8' />
        <textarea 
          id='newPasswordNotes' 
          className='w-full h-160 resize-none outline-none text-sm bg-neutral rounded-md p-10 leading-tight text-neutral-light focus:bg-neutral-light focus:text-neutral transition-colors'
          value={newPassword.notes}
          onChange={(e) => setNewPassword(password => ({...password, notes: e.target.value}))}
        />

        <div className='flex gap-8 ml-auto mt-32'>
          <Button 
            buttonStyle='secondary' 
            additionalClass='px-32'
            onClick={handleCloseModal}
          >
            Close
          </Button>

          <Button 
            buttonStyle='primary' 
            additionalClass='px-32' 
            isLoading={newPasswordLoading}
            onClick={handleCreatePassword}
          >
            {newPasswordLoading
              ? <ImSpinner2 size={16} className='animate-spin' />
              : <span>Create</span>
            }
          </Button>
        </div>
      </Modal>
    </>
  )
}