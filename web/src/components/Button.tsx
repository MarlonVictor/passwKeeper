import { ButtonHTMLAttributes } from 'react';


interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  buttonStyle: 'primary' | 'secondary' | 'tertiary',
  isLoading?: boolean,
  additionalClass?: string
}

export function Button({ buttonStyle, isLoading, additionalClass, ...rest }: Props) {
  const mainStyles = `flex items-center justify-center gap-6 p-10 rounded-md text-xs font-medium transition-all hover:brightness-95 ${isLoading && 'brightness-75 pointer-events-none'}`
  const primaryStyles = 'bg-primary text-neutral'

  const buttonClass = `
    ${mainStyles} 
    ${buttonStyle == 'primary' && primaryStyles}
    ${additionalClass}
  `

  return (
    <button 
      {...rest}
      className={buttonClass}
    />
  )
}