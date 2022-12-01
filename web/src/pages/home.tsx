import { useState } from 'react';

import { Sidebar } from '../components/Sidebar';


export default function Homer() {
  const [selectedItem, setSelectedItem] = useState('home')

  return (
    <main className='flex h-screen'>
      <Sidebar 
        selectedItem={selectedItem}  
        setSelectedItem={setSelectedItem}
      />
    </main>
  )
}