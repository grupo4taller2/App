import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../view/screens/HomeScreen';
import Profile from '../view/screens/ProfileScreen';
import {UserNavConstants} from '../config/userNavConstants';
import WalletView from '../view/composed/walletView';
import TripScreen from '../view/screens/TripScreen';
import UserSearchView from '../view/screens/UserSearchScreen';

const Stack = createStackNavigator();

export default function UserStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name={UserNavConstants.HomeScreen} component={HomeScreen} options={ { headerShown: false }} />
        <Stack.Screen name={UserNavConstants.ProfileScreen} component={Profile} options={{headerShown: false}} />
        <Stack.Screen name={UserNavConstants.WalletView} component={WalletView} options={{headerShown: false}} />
        <Stack.Screen name={UserNavConstants.TripScreen} component={TripScreen} options={{headerShown: false}} />
        <Stack.Screen name={UserNavConstants.UserSearchScreen} component={UserSearchView} options={{headerShown: false}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
