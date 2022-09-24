import { Button, Text } from 'react-native-paper';
import * as Google from 'expo-auth-session/providers/google'
import React from 'react';
import * as WebBrowser from 'expo-web-browser';
import { StyleSheet, TouchableOpacity } from 'react-native';
import {WEBKEY, ANDROIDKEY} from '@env'
import { UserContext, useUserContext } from './context';


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
    React.useEffect(() => {
      
      if (response?.type === "success") {
        signIn(response);
        
      }
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