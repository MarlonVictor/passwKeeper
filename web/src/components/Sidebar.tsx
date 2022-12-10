import { useEffect, useState } from 'react';
import { IoIosList, IoMdAdd } from 'react-icons/io';
import { GiPadlock } from 'react-icons/gi';
import toast from 'react-hot-toast';

import { CategoryProps } from '../pages/home';

import { Modal } from './Modal';
import { Label } from './Label';
import { Input } from './Input';
import { Button } from './Button';

import { useAuth } from '../hooks/useAuth';
import { api } from '../lib/axios';
import { ImSpinner2 } from 'react-icons/im';


interface CategoryItemProps {
  title: string;
  isSelected: boolean;
  itemName: string;
  type: 'home' | 'category' | 'trash' | 'add';
  onClick?: () => void;
}

interface SidebarProps {
  categories: CategoryProps[] | undefined;
  sideIsOpen: boolean;
  selectedItem: string;
  updateCategories: () => void;
  setSelectedItem: (item: string) => void;
}

export function Sidebar(sidebarData: SidebarProps) {
  const { user } = useAuth()

  const [modalIsOpen, setModalIsOpen] = useState(false)

  const [newCategory, setNewCategory] = useState('')
  const [newCategoryLoading, setNewCategoryLoading] = useState(false)

  async function handleCreateCategory() {
    if (!newCategory) return toast.error('Fill in the title field')

    try {
      setNewCategoryLoading(true)

      await api.post('/category', {
        title: newCategory,
        userId: user?.id
      })

      sidebarData.updateCategories()
      
    } catch (err) {
      toast.error('Error creating category')

    } finally {
      setNewCategoryLoading(false)
      handleCloseModal()
    }
  }

  function handleCloseModal() {
    setNewCategory('')
    setModalIsOpen(false)
  }

  useEffect(() => {
    const modalOverlay = document.querySelectorAll('.ReactModalPortal')

    modalOverlay?.forEach(modal => modal.addEventListener('click', (ev: any) => 
      ev.target.classList.contains('ReactModal__Overlay') && handleCloseModal()
    ))
  }, [])

  const CategoryItem = (categoryData: CategoryItemProps) => (
    <li 
      onClick={() => categoryData.onClick ? categoryData.onClick() : sidebarData.setSelectedItem(categoryData.itemName)} 
      className={`
      flex items-center gap-8 p-8 rounded-md font-medium cursor-pointer transition-all text-sm hover:bg-white-o
      ${categoryData.isSelected ? '!bg-primary text-neutral-dark shadow-md' : 'text-neutral-light'}
    `}>
  
      {categoryData.type === 'home' && <GiPadlock size={20} className={`${categoryData.isSelected ? 'text-neutral-dark' : 'text-primary'}`} />}
      {categoryData.type === 'category' && <IoIosList size={20} />}
      {categoryData.type === 'add' && <IoMdAdd size={20} className='brightness-75' />}
      
      {categoryData.title}

    </li>
  )

  return (
    <>
      <aside className={`flex flex-col justify-between bg-neutral p-16 pt-72 border-r-4 border-black w-[20rem] z-10 h-screen transition-transform md2:absolute md2:-translate-x-[20rem] ${sidebarData.sideIsOpen && '!translate-x-0'}`}>

        <div className='flex flex-col h-full'>
          <ul className='flex flex-col gap-4'>
            <CategoryItem 
              title='All Passwords' 
              type='home'
              itemName='home'
              isSelected={sidebarData.selectedItem == 'home'} 
            />
          </ul>

          <div className='flex flex-col mt-28 gap-10'>
            <span className='block font-medium text-neutral-mid text-sm'>Categories</span>

            <ul className='flex flex-col gap-4'>

              {!sidebarData.categories?.length 
                ? <span className='text-neutral-light text-sm block mx-auto'>Empty list</span>
                : sidebarData.categories.map(category => (
                    <CategoryItem 
                      key={category.id}
                      title={category.title}
                      type='category'
                      itemName={category.id}
                      isSelected={sidebarData.selectedItem == category.id}
                    />
                  ))
              }
            </ul>
          </div>
        </div>

        <CategoryItem 
          title='New Category' 
          type='add'
          itemName='add'
          isSelected={sidebarData.selectedItem == 'add'}
          onClick={() => setModalIsOpen(true)}
        />
      </aside>

      <Modal isOpen={modalIsOpen} title='New Category' width='30'>
        <Label text='Category Name' inputId='newCategory' />

        <Input 
          inputStyle='default' 
          id='newCategory'
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
        />

        <div className="flex gap-8 ml-auto mt-32">
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
            isLoading={newCategoryLoading}
            onClick={handleCreateCategory}
          >
            {newCategoryLoading
              ? <ImSpinner2 size={16} className='animate-spin' />
              : <span>Create</span>
            }
          </Button>
        </div>
      </Modal>
    </>    
  )
}