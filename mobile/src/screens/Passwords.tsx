import { useCallback, useState } from 'react';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { Center, Text, FlatList, Pressable, useToast } from 'native-base';

import { Button } from '../components/Button';
import { Loading } from '../components/Loading';
import { PasswordItem, PasswordProps } from '../components/PasswordItem';
import { CategoryItem, CategoryProps } from '../components/CategoryItem';

import { api } from '../services/api';
import { useAuth } from '../hooks/useAuth';


export function Passwords() {
  const { navigate } = useNavigation()
  const { user } = useAuth()

  const [isLoading, setIsLoading] = useState(true)
  const [categories, setCategories] = useState<CategoryProps[]>([])
  const [passwords, setPasswords] = useState<PasswordProps[]>([])

  const toast = useToast()

  async function fetchData() {
    try {
      const categoriesResponse = await api.get('/categories')
      const categoriesList = categoriesResponse.data.categories

      const passwordsFetchUrl = categoriesList.length
        ? `/passwords/${user.id}/${categoriesList[0].id}`
        : `/passwords/${user.id}`

      const passwordsResponse = await api.get(passwordsFetchUrl)
      const passwordsList = passwordsResponse.data.passwords
      
      setCategories(categoriesList)
      setPasswords(passwordsList)
      
    } catch (err) {
      console.error(err)
      toast.show({
        title: 'Erro ao listar os dados',
        placement: 'top',
        bgColor: 'red.800'
      })

    } finally {
      setIsLoading(false)
    }
  }

  useFocusEffect(useCallback(() => {
    fetchData()
  }, []))

  
  return (
    <Center flex={1} bgColor='gray.900' p={7}>
      <Text color='gray.200' fontSize={30} fontWeight='medium'>
        List
      </Text>

      <Button 
        mt={10}
        title='New' 
        onPress={() => navigate('new')}
      />

      {isLoading 
        ? <Loading />
        : <>
            <FlatList 
              data={categories}
              keyExtractor={item => item.id}
              renderItem={({ item }) => <CategoryItem data={item} />}
              px={5}
              showsVerticalScrollIndicator={false}
              ListEmptyComponent={() => <Pressable onPress={() => navigate('newCategory')}>Sem categorias ainda</Pressable>}
            />

            <FlatList 
              data={passwords}
              keyExtractor={item => item.id}
              renderItem={({ item }) => <PasswordItem data={item} />}
              px={5}
              showsVerticalScrollIndicator={false}
              ListEmptyComponent={() => <Pressable onPress={() => navigate('newPassword')}>Nenhuma senha cadastrada</Pressable>}
            />
        </>
      }
    </Center>
  )
}