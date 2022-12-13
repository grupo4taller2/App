
import { getAuth, signOut } from 'firebase/auth';
import React, { useReducer, useState, useRef, useEffect } from 'react';
import './src/config/firebase';
import { logSignup, logUser } from './src/model/login';
import { getHeader, getMyInfo, getUser } from './src/model/status';
import AuthStack from './src/navigation/authStack';
import UserStack from './src/navigation/userStack';
import { UserContext } from './src/view/components/context';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import axios from 'axios';


const initialState = () => {
  return {
    user: null
  }
};

const reducer = (state=initialState(), action = {}) => {
  return action
}

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});


export default function App() {

  const [userState, dispatch] = useReducer(reducer, reducer());
  const [federatedMemo, setFederatedMemo] = useState({});
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  async function registerForPushNotificationsAsync() {
    let token;
    if (true) {//if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);
    } else {
      alert('Must use physical device for Push Notifications');
    }
  
    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
  
    return token;
  }  

  const updateToken = async (username, context) => {
    let url = `http://g4-fiuber.herokuapp.com/api/v1/users/push/token`;

    try {
      const authToken = getHeader(context); 
      await axios.post(url, {username: username, token: expoPushToken}, authToken);
      
    }
    catch(error) {
        console.warn("Issue while sending updated pushToken to backend.");
        console.log(error)
    }
  }

  const authState = React.useMemo(() => {
    return ({
      userState,
      federated: {
        value: federatedMemo,
        setValue: setFederatedMemo
      },
      signIn: async (responseToken) => {
          let userInfo = await getMyInfo(responseToken.user.email.toLowerCase(), responseToken);
          userInfo = await getMyInfo(userInfo.username, responseToken);
          await updateToken(userInfo.username, {userState: responseToken}); // send pushToken to back

          const type = userInfo.driver_information ? "Driver" : "Rider";
          logUser(type);

          dispatch({token: responseToken._tokenResponse.idToken, user: responseToken.user, userInfo: userInfo})
      },
      signOut: async () => {
        const auth = getAuth();
        const signed_auth = await signOut(auth);
        dispatch({user: false})
      },
      register: async (credentials, back_response) => {
          const token = credentials._tokenResponse;
          const user = credentials.user;
          
          const userInfo = await getMyInfo(back_response.username, credentials);
          
          await updateToken(userInfo.username, {userState: token}); // send pushToken to back
          
          dispatch({
            token: token,
            user: user,
            userInfo: userInfo
          })
      },
      update: async () => {
        const newInfo = await getMyInfo(userState.userInfo.username, userState);
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
