import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Center, Text, useToast } from 'native-base';

import { Button } from '../components/Button';
import { Input } from '../components/Input';

import { api } from '../services/api';


export function NewCategory() {
  const { navigate } = useNavigation()

  const [title, setTitle] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const toast = useToast()

  async function handleCategoryCreate() {
    if (!title.trim()) {
      return toast.show({
        title: 'Informe um título para a categoria!',
        placement: 'top',
        bgColor: 'red.800'
      })
    }

    try {
      setIsLoading(true)
      await api.post('/category', { title })

      toast.show({
        title: 'Categoria criada!',
        placement: 'top',
        bgColor: 'green.700',
      })

      navigate('passwords')

    } catch (err) {
      toast.show({
        title: 'Não foi possível criar categoria',
        placement: 'top',
        bgColor: 'red.800'
      })

    } finally {
      setTitle('')
      setIsLoading(false)
    }
  }

  return (
    <Center flex={1} bgColor='gray.900' p={7}>
      <Text color='gray.200' fontSize={30} fontWeight='medium'>
        New Category
      </Text>

      <Input 
        placeholder='Nome da categoria'
        onChangeText={setTitle}
        value={title}
      />

      <Button 
        mt={10}
        title='Create' 
        onPress={handleCategoryCreate}
        isLoading={isLoading}
      />

      <Button 
        mt={10}
        title='Back to passwords' 
        onPress={() => navigate('passwords')}
      />
    </Center>
  )
}