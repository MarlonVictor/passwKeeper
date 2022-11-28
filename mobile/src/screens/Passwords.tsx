import { useNavigation } from "@react-navigation/native";
import { Center, Text } from "native-base";

import { Button } from '../components/Button';

export function Passwords() {
  const navigation = useNavigation();

  
  return (
    <Center flex={1} bgColor='gray.900' p={7}>
      <Text color='gray.200' fontSize={30} fontWeight='medium'>
        List
      </Text>

      <Button 
        mt={10}
        title='Voltar' 
        // onPress={() => signIn(userName, password)}
        onPress={() => {
          navigation.goBack();
        }}
      />
    </Center>
  )
}