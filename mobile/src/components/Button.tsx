import { Button as ButtonNativeBase, Text, IButtonProps } from 'native-base'


interface ButtonProps extends IButtonProps {
  title: string;
  type?: 'PRIMARY' | 'SECONDARY'
}

export function Button({ title, type = 'PRIMARY', ...rest }: ButtonProps) {
  return (
    <ButtonNativeBase  
      w="full"
      h={12}
      rounded="sm"
      bg={type === "SECONDARY" ? "gray.200" : "yellow.500"}
      _pressed={{ 
        opacity: 0.8,
        bg: type === "SECONDARY" ? "gray.200" : "yellow.500"
      }}
      _loading={{ 
        _spinner: { color: "gray.600" } 
      }}
      {...rest}
    >
      <Text
        fontSize={12}
        fontWeight="medium"
        color="gray.600"
      >
        {title}
      </Text>
    </ButtonNativeBase>
  )
}