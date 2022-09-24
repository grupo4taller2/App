import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RegisterScreen from '../view/screens/RegisterScreen';
import RegisterInfoScreen from '../view/screens/RegisterInfoScreen';
import LoginScreen from '../view/screens/LoginScreen';
import MainScreen from '../view/screens/MainScreen';



export const Stack = createNativeStackNavigator();

export const ROUTES = {
    LoginMainView: "Login",
    RegisterFirstView: "Register",
    RegisterInfoView: "RegisterInfo",
    MainPage: "Main"
};

export default function AuthStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name={ROUTES.LoginMainView} component={MainScreen} options={ { headerShown: false }} />
        <Stack.Screen name={ROUTES.RegisterFirstView} component={RegisterScreen} options={ { headerShown: false }} />
        <Stack.Screen name={ROUTES.RegisterInfoView} component={RegisterInfoScreen} options={ { headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
