import { NativeBaseProvider, StatusBar } from 'native-base';
import { useFonts, DMSans_400Regular, DMSans_500Medium_Italic, DMSans_700Bold } from '@expo-google-fonts/dm-sans'

import { AuthContextProvider } from './src/contexts/AuthContext';

import { SignIn } from './src/screens/SignIn';
import { Loading } from './src/components/Loading';

import { THEME } from './src/styles/theme';


export default function App() {
  const [ fontsLoaded ] = useFonts({ DMSans_400Regular, DMSans_500Medium_Italic, DMSans_700Bold })

  return (
    <NativeBaseProvider theme={THEME}>
      <AuthContextProvider>
        <StatusBar 
          translucent
          barStyle='light-content'
          backgroundColor='transparent'
        />

        {fontsLoaded ? <SignIn /> : <Loading />}
      </AuthContextProvider>
    </NativeBaseProvider>
  );
}
