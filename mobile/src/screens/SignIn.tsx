import { Center, Text, Icon, Input } from 'native-base';
import { Feather } from '@expo/vector-icons';

import { useAuth } from '../hooks/useAuth';

import { Button } from '../components/Button';
import { useState } from 'react';


export function SignIn() {
  const { user, signIn, isUserLoading } = useAuth()

  const [userName, setUserName] = useState<string>('MarlonVictor')
  const [password, setPassword] = useState<string>('')


  return (
    <Center flex={1} bgColor='gray.900' p={7}>
      <Text color='gray.200' fontSize={30} fontWeight='medium'>
        PasswKeeper
      </Text>

      <Text color='gray.200' fontSize={14} opacity={80} textAlign='center'>
        Projeto em construção 🚧
      </Text>

      <Input 
        onChangeText={setUserName}
        value={userName}
        size='lg' 
        placeholder='User' 
        w='full' 
        borderColor='gray.600' 
        marginTop={4} 
        color='gray.200' 
        focusOutlineColor='gray.600'
        _focus={{
          bg: 'gray.200',
          color: 'gray.600'
        }}
      />

      <Input 
        onChangeText={setPassword}
        value={password}
        type="password"
        size='lg' 
        placeholder='*******' 
        w='full' 
        borderColor='gray.600' 
        marginTop={2} 
        color='gray.200' 
        focusOutlineColor='gray.600'
        _focus={{
          bg: 'gray.200',
          color: 'gray.600'
        }}
      />

      <Button 
        mt={10}
        title='ENTRAR' 
        rightIcon={<Icon as={Feather} name='log-in' color='gray.600' size='sm' />}
        onPress={() => signIn(userName, password)}
        isLoading={isUserLoading}
      />

      <Text fontSize={12} color='gray.200' textAlign='center' opacity={80} mt={4}>
        Não utilizamos nenhuma informação além do seu e-mail {'\n'} para criação de sua conta. {user}
      </Text>
    </Center>
  )
}