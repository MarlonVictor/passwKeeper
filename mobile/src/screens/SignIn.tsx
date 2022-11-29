import { useState } from 'react';
import { Center, Text, Icon } from 'native-base';
import { Feather } from '@expo/vector-icons';

import { useAuth } from '../hooks/useAuth';

import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { useNavigation } from '@react-navigation/native';


export function SignIn() {
  const { signIn, isUserLoading } = useAuth()
  const { navigate } = useNavigation()

  const [userName, setUserName] = useState<string>('MarlonVictor')
  const [password, setPassword] = useState<string>('')

  function handleSignIn() {
    signIn(userName, password)
    navigate('passwords')
  }


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
        placeholder='User'
        marginTop={4} 
      />

      <Input 
        onChangeText={setPassword}
        value={password}
        type='password'
        placeholder='*******' 
        marginTop={2} 
      />

      <Button 
        mt={10}
        title='ENTRAR' 
        rightIcon={<Icon as={Feather} name='log-in' color='gray.600' size='sm' />}
        onPress={handleSignIn}
        isLoading={isUserLoading}
      />

      <Text fontSize={12} color='gray.200' textAlign='center' opacity={80} mt={4}>
        Não utilizamos nenhuma informação além do seu e-mail {'\n'} para criação de sua conta.
      </Text>
    </Center>
  )
}