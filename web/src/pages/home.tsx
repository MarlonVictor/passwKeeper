import { useEffect, useState } from 'react';
import { IoIosMenu } from 'react-icons/io';
import toast from 'react-hot-toast';

import { Button } from '../components/Button';
import { PasswordDetail } from '../components/PasswordDetail';
import { PasswordList } from '../components/PasswordList';
import { Sidebar } from '../components/Sidebar';

import { api } from '../lib/axios';
import { useAuth } from '../hooks/useAuth';
import { useRouter } from 'next/router';


export interface CategoryProps {
  id: string;
  title: string;
}

export interface PasswordProps {
  id: string;
  title: string;
  email: string;
  value: string;
  webside: string;
  icon?: string;
  notes?: string;
  userId: string;
  categoryId: string;
}

export default function Home() {
  const { user } = useAuth()
  const router = useRouter()

  const [selectedItem, setSelectedItem] = useState('home')
  const [selectedPassword, setSelectedPassword] = useState('')

  const [sideIsOpen, setSideIsOpen] = useState(true)

  const [categories, setCategories] = useState<CategoryProps[]>()
  const [passwords, setPasswords] = useState<PasswordProps[]>()
  const [passwordsShown, setPasswordsShown] = useState<PasswordProps[]>()

  async function fetchCategories() {
    if (!user) return router.push('/')
    
    try {
      const { data } = await api.get(`/categories/${user.id}`)
      setCategories(data.categories)

    } catch(err) {
      toast.error('Error loading categories')
    }
  }

  async function fetchPasswords() {
    if (!user) return router.push('/')
    
    try {
      const { data } = await api.get(`/passwords/${user.id}`)
      setPasswords(data.passwords)
      setPasswordsShown(data.passwords)

    } catch(err) {
      toast.error('Error loading passwords')
    }
  }

  function handleSetPasswordList() {
    setSelectedPassword('')
    
    if (selectedItem == 'home') {
      setPasswordsShown(passwords)

    } else if (selectedItem == 'trash') {
      setPasswordsShown([])

    } else {
      setPasswordsShown(passwords?.filter(pw => pw.categoryId == selectedItem))
    }
  }

  useEffect(() => {
    fetchCategories()
    fetchPasswords()
  }, [])

  useEffect(() => handleSetPasswordList(), [selectedItem])

  return (
    <main className='flex h-screen'>
      <Sidebar 
        categories={categories}
        sideIsOpen={sideIsOpen}
        selectedItem={selectedItem} 
        updateCategories={fetchCategories}
        setSelectedItem={setSelectedItem}
      />

      {!passwordsShown
        ? <h1>Carregando</h1>
        : (
          <>
            <PasswordList 
              passwords={passwordsShown}
              selectedPassword={selectedPassword} 
              setSelectedPassword={setSelectedPassword}
            />

            <PasswordDetail 
              selectedItem={selectedItem}
              selectedPassword={selectedPassword}
              passwordsShown={passwordsShown}
            />
          </>
        )
      }
      
      <Button 
        buttonStyle='icon' 
        additionalClass={`absolute left-0 bottom-28 rounded-l-none pl-16 transition-transform hidden md2:flex md2:translate-x-0 ${sideIsOpen && '!translate-x-[20rem]'}`}
        onClick={() => setSideIsOpen(!sideIsOpen)}
      >
        <IoIosMenu size={20} />
      </Button>
    </main>
  )
}