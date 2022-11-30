import { InputHTMLAttributes } from 'react';


interface Props extends InputHTMLAttributes<HTMLInputElement> {
  inputStyle: 'default' | 'edit' | 'search'
}

export function Input({ inputStyle, ...rest }: Props) {
  return (
    <input 
      {...rest}
      className='appearance-none block w-full text-sm bg-neutral text-gray-700 rounded-md p-10 leading-tight text-neutral-light focus:outline-none focus:bg-neutral-light focus:text-neutral transition-colors placeholder:text-neutral-mid placeholder:font-medium'
    />
  )
}