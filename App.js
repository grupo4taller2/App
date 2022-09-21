import { View } from "react-native";
import { Provider, Text } from "react-native-paper";
import LoginScreen from "./src/view/LoginScreen";
import RegisterScreen from "./src/view/RegisterScreen";
import { NavigationContainer } from '@react-navigation/native';


export default function App() {
  return (
    <Provider>
      <NavigationContainer>
        <RegisterScreen />
      </NavigationContainer>
    </Provider>    
  );
}