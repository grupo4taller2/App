import { Button } from 'react-native-paper';
import * as Google from 'expo-auth-session/providers/google'
import React from 'react';
import * as WebBrowser from 'expo-web-browser';

WebBrowser.maybeCompleteAuthSession();

export default function GoogleLogin(props){
  
  
    const [request, response, promptAsync] = Google.useAuthRequest({
      expoClientId: '91621333154-2cccsnv6n0bo4iv18rokuur856oo6sdi.apps.googleusercontent.com'
    })
    React.useEffect(() => {
      
      if (response?.type === "success") {
        console.log(response);
      }
    }, [response]);

    return (<Button style={[props.singInButton]} contentStyle={props.signInButtonContent} labelStyle={props.buttonText} uppercase={false} onPress={() => promptAsync()}>
      Google
    </Button>)
  
  }
  