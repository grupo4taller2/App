import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../view/screens/HomeScreen';
import Profile from '../view/screens/ProfileScreen';
import {UserNavConstants} from '../config/userNavConstants';
import WalletView from '../view/composed/walletView';
import TripScreen from '../view/screens/TripScreen';
import UserSearchView from '../view/screens/UserSearchScreen';
import RegisterAsDriver from '../view/composed/registerAsDriver';
import OngoingTripScreen from '../view/screens/OngoingTripScreen';
import AvailableJobsScreen from '../view/screens/AvailableJobsScreen';
import OngoingJobScreen from '../view/screens/OngoingJobScreen';
import RatingScreen from '../view/screens/RatingScreen';

const Stack = createStackNavigator();

export default function UserStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name={UserNavConstants.HomeScreen} component={HomeScreen} options={ { headerShown: false }} />
        <Stack.Screen name={UserNavConstants.ProfileScreen} component={Profile} options={{headerShown: false}} />
        <Stack.Screen name={UserNavConstants.WalletView} component={WalletView} options={{headerShown: false}} />
        <Stack.Screen name={UserNavConstants.TripScreen} component={TripScreen} options={{headerShown: false}} />
        <Stack.Screen name={UserNavConstants.OngoingTripScreen} component={OngoingTripScreen} options={{headerShown: false}} />
        <Stack.Screen name={UserNavConstants.UserSearchScreen} component={UserSearchView} options={{headerShown: false}} />
        <Stack.Screen name={UserNavConstants.DriverReg} component={RegisterAsDriver} options={{headerShown: false}} />
        <Stack.Screen name={UserNavConstants.AvailableJobsScreen} component={AvailableJobsScreen} options={{headerShown: false}} />
        <Stack.Screen name={UserNavConstants.OngoingJobScreen} component={OngoingJobScreen} options={{headerShown: false}} />
        <Stack.Screen name={UserNavConstants.RatingScreen} component={RatingScreen} options={{headerShown: false}} />
        <Stack.Screen name={UserNavConstants.DriverInfo} component={RegisterAsDriver} options={{headerShown: false}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
