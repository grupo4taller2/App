import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RegisterScreen from '../view/screens/RegisterScreen';
import LoginScreen from '../view/screens/LoginScreen';

const Stack = createNativeStackNavigator();

export default function AuthStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} options={ { headerShown: false }} />
        <Stack.Screen name="Register" component={RegisterScreen} options={ { headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};