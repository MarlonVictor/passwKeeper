import { useCallback, useState } from 'react';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { Center, FlatList, Pressable, Text, useToast } from 'native-base';

import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Loading } from '../components/Loading';
import { CategoryItem, CategoryProps } from '../components/CategoryItem';

import { api } from '../services/api';
import { useAuth } from '../hooks/useAuth';


export function NewPassword() {
  const toast = useToast()
  const { user } = useAuth()
  const { navigate } = useNavigation()

  const [isLoading, setIsLoading] = useState(true)
  const [categories, setCategories] = useState<CategoryProps[]>([])

  const [title, setTitle] = useState('')
  const [email, setEmail] = useState('')
  const [value, setValue] = useState('')
  const [webside, setWebside] = useState('')
  const [categoryId, setCategoryId] = useState('')


  async function fetchCategories() {
    try {
      const categoriesResponse = await api.get('/categories')
      const categoriesList = categoriesResponse.data.categories

      setCategories(categoriesList)

    } catch (err) {
      toast.show({
        title: 'Erro ao listar as categorias',
        placement: 'top',
        bgColor: 'red.800'
      })

    } finally {
      setIsLoading(false)
    }
  }

  async function handlePasswordCreate() {
    const newPasswordData = {
      title,
			email,
      value,
			webside,
      categoryId,
      userId: user.id,
    }

    if (Object.values(newPasswordData).some(item => !item.length)) {
      return toast.show({
        title: 'Preencha todos os campos',
        placement: 'top',
        bgColor: 'red.800'
      })
    }

    try {
      setIsLoading(true)
      await api.post('/passwords', newPasswordData)

      toast.show({
        title: 'Senha salva!',
        placement: 'top',
        bgColor: 'green.700',
      })

      navigate('passwords')

    } catch (err) {
      toast.show({
        title: 'Não foi possível salvar a senha',
        placement: 'top',
        bgColor: 'red.800'
      })

    } finally {
      setIsLoading(false)
    }
  }
  
  useFocusEffect(useCallback(() => {
    fetchCategories()
  }, []))


  return (
    <Center flex={1} bgColor='gray.900' p={7}>
      <Text color='gray.200' fontSize={30} fontWeight='medium'>
        New Password
      </Text>

      <Input 
        placeholder='Título'
        onChangeText={setTitle}
        value={title}
        mt={2}
      />

      <Input 
        placeholder='Username'
        onChangeText={setEmail}
        value={email}
        mt={2}
      />

      <Input 
        placeholder='Password'
        onChangeText={setValue}
        value={value}
        mt={2}
      />

      <Input 
        placeholder='URL'
        onChangeText={setWebside}
        value={webside}
        mt={2}
      />

      {isLoading 
        ? <Loading />
        : <FlatList 
            data={categories}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <CategoryItem 
                data={item} 
                onPress={() => setCategoryId(item.id)}
              />
            )}
            px={5}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={() => <Pressable onPress={() => navigate('newCategory')}>Sem categorias ainda</Pressable>}
          />
      }

      <Button 
        mt={10}
        title='Create' 
        onPress={handlePasswordCreate}
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