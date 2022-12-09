import { ButtonHTMLAttributes } from 'react';


interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  buttonStyle: 'primary' | 'secondary' | 'icon',
  isLoading?: boolean,
  additionalClass?: string
}

export function Button({ buttonStyle, isLoading, additionalClass, ...rest }: Props) {
  const mainStyles = `flex items-center justify-center gap-6 p-10 rounded-md text-xs font-medium transition-all hover:brightness-95 hover:shadow-[rgb(33,33,33)_0px_20px_30px_-10px] ${isLoading && 'brightness-75 pointer-events-none'}`
  const primaryStyles = 'bg-primary text-neutral'
  const secondaryStyles = 'bg-neutral text-neutral-light'
  const iconStyles = 'text-neutral-light hover:bg-white-o hover:brightness-100'

  const buttonClass = `
    ${mainStyles} 
    ${buttonStyle == 'primary' && primaryStyles}
    ${buttonStyle == 'secondary' && secondaryStyles}
    ${buttonStyle == 'icon' && iconStyles}
    ${additionalClass}
  `

  return (
    <button 
      {...rest}
      className={buttonClass}
    />
  )
}