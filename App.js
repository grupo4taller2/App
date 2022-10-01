import { getAuth, signOut } from 'firebase/auth';
import React, { useReducer } from 'react';
import './src/config/firebase';
import RootNavigation from './src/navigation';
import AuthStack from './src/navigation/authStack';
import UserStack from './src/navigation/userStack';
import { UserContext } from './src/view/components/context';


const initialState = () => {
  return {
    user: null
  }
};

const reducer = (state=initialState(), action = {}) => {
  return action
}


export default function App() {

  const [userState, dispatch] = useReducer(reducer, reducer());


  const authState = React.useMemo(() => {
    return ({
      userState,
      signIn: (responseToken) => {
          dispatch({...responseToken, user: true})
      },
      signOut: async () => {
        const auth = getAuth();
        const signed_auth = await signOut(auth);
        dispatch({user: false})
      }
    })
  })
  return (
    <UserContext.Provider value={authState} >
      {userState.user ? <UserStack /> : <AuthStack />}
    </UserContext.Provider>
  );
}
