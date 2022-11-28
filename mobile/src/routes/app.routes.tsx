import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { SignIn } from "../screens/SignIn";
import { Passwords } from "../screens/Passwords";

const { Navigator, Screen } = createNativeStackNavigator()
// const { Navigator, Screen } = createBottomTabNavigator()


export function AppRoutes() {
  return (
    <Navigator screenOptions={{
      headerShown: false,
    }}>
      <Screen
        name="signIn"
        component={SignIn}
      />

      <Screen
        name="passwords"
        component={Passwords}
      />
    </Navigator>
  )
}