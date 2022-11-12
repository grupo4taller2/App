
import { getAuth, signOut } from 'firebase/auth';
import React, { useReducer } from 'react';
import './src/config/firebase';
import { logSignup, logUser } from './src/model/login';
import { getMyInfo, getUser } from './src/model/status';
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
      signIn: async (responseToken) => {
          const userInfo = await getMyInfo(responseToken.user.email.toLowerCase(), responseToken);
          const type = userInfo.driver_information ? "Driver" : "Rider";
          logUser(type);
          dispatch({token: responseToken._tokenResponse.idToken, user: responseToken.user, userInfo: userInfo})
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
      update: async () => {
        const newInfo = await getMyInfo(userState.userInfo.email, userState);
        dispatch({token: userState.token , user: userState.user, userInfo: newInfo})
      },
    })
  })
  return (
    <UserContext.Provider value={authState} >
      {userState.user ? <UserStack /> : <AuthStack />}
    </UserContext.Provider>
  );
}
