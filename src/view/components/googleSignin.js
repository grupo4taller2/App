import { Button, Text } from 'react-native-paper';
import * as Google from 'expo-auth-session/providers/google'
import React from 'react';
import * as WebBrowser from 'expo-web-browser';
import { Alert, StyleSheet, TouchableOpacity } from 'react-native';
import {WEBKEY, ANDROIDKEY} from '@env'
import { UserContext, useUserContext } from './context';
import { getAuth, GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import { googleGetUser } from '../../model/status';


WebBrowser.maybeCompleteAuthSession();

export default function GoogleLogin(props){

    const {signIn} = useUserContext();
    
    const [request, response, promptAsync] = Google.useAuthRequest({
      androidClientId: ANDROIDKEY,
      expoClientId: WEBKEY,
      webClientId: WEBKEY
    },
    {
      useProxy: true
    })

    const handleSignIn = async (authentication) => {
      const credential = GoogleAuthProvider.credential(authentication.idToken, authentication.accessToken);
      const auth = getAuth();

      const signInResult = await signInWithCredential(auth, credential)
      .catch((err) => alert(err));

      if (signInResult.user === undefined) return;
      //If there is no user to this email. generate one
      await googleGetUser(signInResult);


      signIn(signInResult);

    };

    React.useEffect(() => {
      
      if (response?.type === "success") handleSignIn(response.authentication);
    }, [response]);

    return (
    <TouchableOpacity activeOpacity={0.6} onPress={() => {promptAsync()}}>
        <Text style={style.higlightTextGoogle}> Sign in with Google</Text>
    </TouchableOpacity>
    )
    
  }
  

const style = StyleSheet.create({
  higlightTextGoogle: {
    fontSize: 15,
    fontWeight: 'bold',
    paddingBottom: 25,
  }
})