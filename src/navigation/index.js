import React from 'react';
import UserStack from './userStack';
import AuthStack from './authStack';
import { useUserContext } from '../view/components/context';

export default function RootNavigation() {
  const context = useUserContext();

  return (
    <React.Fragment>
      {context.userState.user ? <UserStack /> : <AuthStack />}
    </React.Fragment>) 

}
