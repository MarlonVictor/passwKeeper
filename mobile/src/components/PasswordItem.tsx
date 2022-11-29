import { Heading, HStack, Text } from 'native-base';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';


export interface PasswordProps {
  id: string;
  title: string;
  email: string;
  value: string;
  webside: string;
  icon: string;
  notes?: string;
}

interface Props extends TouchableOpacityProps {
  data: PasswordProps;
}

export function PasswordItem({ data, ...rest }: Props) {
  return (
    <TouchableOpacity {...rest}>
      <HStack
        w='full'
        h={20}
        bgColor='gray.600'
        borderBottomWidth={3}
        borderBottomColor='yellow.500'
        justifyContent='space-between'
        alignItems='center'
        rounded='sm'
        mb={3}
        p={4}
      >
        <Heading color='white' fontSize='md'>
          {data.title}
        </Heading>

        <Text color='gray.200' fontSize='xs' ml={8}>
          {data.value}
        </Text>
      </HStack>
    </TouchableOpacity>
  )
}