import { useCallback, useState } from 'react';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { Center, Text, FlatList, Pressable, useToast } from 'native-base';

import { Button } from '../components/Button';
import { Loading } from '../components/Loading';

import { api } from '../services/api';


interface CategoriesProps {
  id: string;
  title: string
}

export function Passwords() {
  const { navigate } = useNavigation()

  const [isLoading, setIsLoading] = useState(true)
  const [categories, setCategories] = useState<CategoriesProps[]>([])

  const toast = useToast()

  async function fetchCategories() {
    try {
      const { data } = await api.get('/categories')
      setCategories(data.categories)
      
    } catch (err) {
      toast.show({
        title: 'Erro ao listar categorias',
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
        List
      </Text>

      <Button 
        mt={10}
        title='New' 
        onPress={() => navigate('new')}
      />

      {isLoading 
        ? <Loading />
        : <FlatList 
            data={categories}
            keyExtractor={item => item.id}
            renderItem={({ item }) => <Text color='gray.200' fontSize={12}>{item.title}</Text>}
            px={5}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={() => <Pressable onPress={() => navigate('newCategory')}>Sem categorias ainda</Pressable>}
          />
      }
    </Center>
  )
}