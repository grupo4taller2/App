import React, { useReducer } from 'react';
import './src/config/firebase';
import RootNavigation from './src/navigation';
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
          console.log("Pase por aca");
          dispatch({...responseToken, user: true})
      }
    })
  })
  return (
    <UserContext.Provider value={authState} >
      <RootNavigation />
    </UserContext.Provider>
  );
}
