import { View } from "react-native";
import { Provider, Text } from "react-native-paper";
import LoginView from "./src/LoginView";


export default function App() {
  return (
    <Provider>
      <LoginView />
    </Provider>    
  );
}