import { View } from "react-native";
import { Provider, Text } from "react-native-paper";
import LoginView from "./src/view/LoginView";
import RegisterView from "./src/view/RegisterView";


export default function App() {
  return (
    <Provider>
      <RegisterView />
    </Provider>    
  );
}