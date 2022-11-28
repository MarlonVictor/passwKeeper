import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Passwords } from '../screens/Passwords';
import { New } from '../screens/New';
import { NewCategory } from '../screens/NewCategory';


const { Navigator, Screen } = createNativeStackNavigator()

export function AppRoutes() {
  return (
    <Navigator screenOptions={{
      headerShown: false,
    }}>
      <Screen
        name='passwords'
        component={Passwords}
      />
      
      <Screen
        name='new'
        component={New}
      />
      
      <Screen
        name='newCategory'
        component={NewCategory}
      />
    </Navigator>
  )
}