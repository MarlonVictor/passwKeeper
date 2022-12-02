import { IoIosList, IoMdTrash, IoMdAdd } from 'react-icons/io';
import { GiPadlock } from 'react-icons/gi';


interface CategoryItemProps {
  title: string;
  isSelected: boolean;
  itemName: string;
  type: 'home' | 'category' | 'trash' | 'add';
}

interface SidebarProps {
  sideIsOpen: boolean;
  selectedItem: string;
  setSelectedItem: (item: string) => void;
}

export function Sidebar(sidebarData: SidebarProps) {
  const categories = [
    { id: '1', title: 'Main' },
    { id: '2', title: 'Social' },
    { id: '3', title: 'Bank' },
    { id: '4', title: 'Shopping' },
  ]

  const CategoryItem = (categoryData: CategoryItemProps) => (
    <li 
      onClick={() => sidebarData.setSelectedItem(categoryData.itemName)} 
      className={`
      flex items-center gap-8 p-8 rounded-md font-medium cursor-pointer transition-all text-sm hover:bg-white-o
      ${categoryData.isSelected ? '!bg-primary text-neutral-dark shadow-md' : 'text-neutral-light'}
    `}>
  
      {categoryData.type === 'home' && <GiPadlock size={20} className={`${categoryData.isSelected ? 'text-neutral-dark' : 'text-primary'}`} />}
      {categoryData.type === 'category' && <IoIosList size={20} />}
      {categoryData.type === 'trash' && <IoMdTrash size={20} className={`${categoryData.isSelected ? 'text-neutral-dark' : 'text-[#f02560]'}`} />}
      {categoryData.type === 'add' && <IoMdAdd size={20} className='brightness-75' />}
      
      {categoryData.title}

    </li>
  )

  return (
    <aside className={`flex flex-col justify-between bg-neutral p-16 pt-72 border-r-4 border-black w-[20rem] z-10 h-screen transition-transform md2:absolute md2:-translate-x-[20rem] ${sidebarData.sideIsOpen && '!translate-x-0'}`}>

      <div className='flex flex-col h-full'>
        <ul className='flex flex-col gap-4'>
          <CategoryItem 
            title='All Passwords' 
            type='home'
            itemName='home'
            isSelected={sidebarData.selectedItem == 'home'} 
          />

          <CategoryItem 
            title='Trash' 
            type='trash'
            itemName='trash'
            isSelected={sidebarData.selectedItem == 'trash'}  
          />
        </ul>

        <div className='flex flex-col mt-28 gap-10'>
          <span className='block font-medium text-neutral-mid text-sm'>Categories</span>

          <ul className='flex flex-col gap-4'>

            {categories.map(category => (
              <CategoryItem 
                key={category.id}
                title={category.title}
                type='category'
                itemName={category.id}
                isSelected={sidebarData.selectedItem == category.id}
              />
            ))}

          </ul>
        </div>
      </div>

      <CategoryItem 
        title='New Category' 
        type='add'
        itemName='add'
        isSelected={sidebarData.selectedItem == 'add'}
      />

    </aside>
  )
}