import { useState } from 'react';
import { IoIosMenu } from 'react-icons/io';

import { Button } from '../components/Button';
import { PasswordDetail } from '../components/PasswordDetail';
import { PasswordList } from '../components/PasswordList';

import { Sidebar } from '../components/Sidebar';


export default function Homer() {
  const [selectedItem, setSelectedItem] = useState('home')
  const [selectedPassword, setSelectedPassword] = useState('Youtube')

  const [sideIsOpen, setSideIsOpen] = useState(true)

  return (
    <main className='flex h-screen'>
      <Sidebar 
        sideIsOpen={sideIsOpen}
        selectedItem={selectedItem} 
        setSelectedItem={setSelectedItem}
      />

      <PasswordList 
        selectedPassword={selectedPassword} 
        setSelectedPassword={setSelectedPassword}
      />

      <PasswordDetail />

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