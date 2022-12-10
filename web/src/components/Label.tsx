interface LabelProps {
  text: string;
  inputId: string;
  additionalClass?: string;
}

export function Label(data: LabelProps) {
  return (
    <label 
      htmlFor={data.inputId} 
      className={`block ml-2 tracking-tight font-inter text-neutral-mid text-xs font-bold mb-2 cursor-pointer ${data.additionalClass}`}
    >
      {data.text}
    </label>
  )
}