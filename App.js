import { View } from "react-native";
import { Provider, Text } from "react-native-paper";
import './src/config/firebase'
import { useAuthentication } from "./src/hooks/useAuthentication";
import LoginScreen from "./src/view/LoginScreen";
import RegisterScreen from "./src/view/RegisterScreen";
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
  
  const {user} = useAuthentication();

  return (
    <Provider>
      <NavigationContainer>
        <LoginScreen />
      </NavigationContainer>
    </Provider>    
  );
}