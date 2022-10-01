import React, { useReducer } from 'react';
import './src/config/firebase';
import RootNavigation from './src/navigation';
import UserStack from './src/navigation/userStack';
import { UserContext } from './src/view/components/context';
import Profile from './src/view/screens/ProfileScreen';


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
          console.log("Pase por aca");
          dispatch({...responseToken, user: true})
      }
    })
  })
  return (
    <UserContext.Provider value={authState} >
      <UserStack />
    </UserContext.Provider>
  );
}
