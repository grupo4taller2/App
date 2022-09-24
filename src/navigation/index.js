import React from 'react';
import UserStack from './userStack';
import AuthStack from './authStack';
import { UserContext } from '../view/components/context';
import MainScreen from '../view/screens/MainScreen';

export default function RootNavigation() {
  return (
    <React.Fragment>
      <AuthStack />
    </React.Fragment>) 

}
