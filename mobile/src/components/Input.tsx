import { Input as NativeBaseInput, IInputProps } from 'native-base';


export function Input({ ...rest }: IInputProps) {
  return (
    <NativeBaseInput
      fontFamily='body'
      size='lg' 
      placeholder='*******' 
      w='full' 
      borderColor='gray.600'
      color='gray.200' 
      focusOutlineColor='gray.600'
      _focus={{
        bg: 'gray.200',
        color: 'gray.600'
      }}
      {...rest}
    />
  );
}