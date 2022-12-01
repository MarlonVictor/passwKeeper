import { useState } from 'react';
import { PasswordList } from '../components/PasswordList';

import { Sidebar } from '../components/Sidebar';


export default function Homer() {
  const [selectedItem, setSelectedItem] = useState('home')
  const [selectedPassword, setSelectedPassword] = useState('Youtube')

  return (
    <main className='flex h-screen'>
      <Sidebar 
        selectedItem={selectedItem} 
        setSelectedItem={setSelectedItem}
      />

      <PasswordList 
        selectedPassword={selectedPassword} 
        setSelectedPassword={setSelectedPassword}
      />

    </main>
  )
}