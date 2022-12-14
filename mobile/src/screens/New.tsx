import { useNavigation } from '@react-navigation/native';
import { Center, Text } from 'native-base';

import { Button } from '../components/Button';


export function New() {
  const { goBack, navigate } = useNavigation()
  
  return (
    <Center flex={1} bgColor='gray.900' p={7}>
      <Text color='gray.200' fontSize={30} fontWeight='medium'>
        New
      </Text>

      <Button 
        mt={10}
        title='Back to list' 
        onPress={goBack}
      />

      <Button 
        mt={10}
        title='New Password' 
        onPress={() => navigate('newPassword')}
      />

      <Button 
        mt={10}
        title='New Category' 
        onPress={() => navigate('newCategory')}
      />
    </Center>
  )
}