import { getAuth, signOut } from 'firebase/auth';
import React, { useReducer } from 'react';
import './src/config/firebase';
import RootNavigation from './src/navigation';
import AuthStack from './src/navigation/authStack';
import UserStack from './src/navigation/userStack';
import { UserContext } from './src/view/components/context';
import RegisterInfoScreen from './src/view/screens/RegisterInfoScreen';
import TripScreen from './src/view/screens/TripScreen';


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
          dispatch({token: responseToken._tokenResponse, user: responseToken.user})
      },
      signOut: async () => {
        const auth = getAuth();
        const signed_auth = await signOut(auth);
        dispatch({user: false})
      },
      register: (credentials, back_response) => {
          const token = credentials._tokenResponse;
          const user = credentials.user;
          const userInfo = back_response;
          
          dispatch({
            token: token,
            user: user,
            userInfo: userInfo
          })
      },
      update: (newInfo) => {
        console.log("Publishing new info to backend", newInfo);
      },
      asDriver: (driverInfo) => {
        console.log("Generating a driver!");
      }
    })
  })

  return (
    <UserContext.Provider value={authState} >
      {userState.user ? <UserStack /> : <AuthStack />}
    </UserContext.Provider>
  );
}
