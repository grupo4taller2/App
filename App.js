import { View } from "react-native";
import { Provider, Text } from "react-native-paper";
import LoginView from "./src/view/LoginView";
import './src/config/firebase'
import { useAuthentication } from "./src/hooks/useAuthentication";

export default function App() {
  
  const {user} = useAuthentication();

  return (
    <Provider>
      <LoginView />
    </Provider>    
  );
}