import { Center, Text, Icon } from 'native-base';
import { Fontisto } from '@expo/vector-icons';

import { useAuth } from '../hooks/useAuth';

import { Button } from '../components/Button';


export function SignIn() {
  const { user } = useAuth()

  console.log(user);

  return (
    <Center flex={1} bgColor='gray.900' p={7}>
      <Text color='gray.200' fontSize={30} fontWeight='medium'>
        PasswKeeper
      </Text>

      <Text color='gray.200' fontSize={14} opacity={80} textAlign='center'>
        Projeto em construção 🚧
      </Text>

      <Button 
        mt={10}
        title='ENTRAR COM GOOGLE' 
        leftIcon={<Icon as={Fontisto} name='google' color='gray.600' size='sm' />}
      />

      <Text fontSize={12} color='gray.200' textAlign='center' opacity={80} mt={4}>
        Não utilizamos nenhuma informação além do seu e-mail {'\n'} para criação de sua conta.
      </Text>
    </Center>
  )
}