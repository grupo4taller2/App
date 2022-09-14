import React, { useState } from "react";
import { StatusBar } from 'expo-status-bar';
import {TouchableHighlight, View} from 'react-native';
import {Text, TextInput, Button, TouchableRipple} from 'react-native-paper';
import { styles } from "./styles/styles";
import TextField from "./view/textField";
import InfoInput from "./controler/text";


export default function LoginView() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    let userText = new InfoInput(null, {
      label: "Username",
      mode: "outlined",
      style: styles.inputBox
    });

    let passwordText = new InfoInput(true, {
      label: "Password",
      mode: "outlined",
      style: styles.inputBox
    });

    return (
      <View style={styles.loginMainView}>
  
        <View style={styles.greetView}>
            <Text style={styles.mainGreet}>
                Hello Again!
            </Text>
            <Text style={styles.secondaryGreet}>
                Need a Lift?
            </Text>
        </View>

        <View style={styles.inputView}>
          <TextField text={userText} />
          <TextField text={passwordText}/>
        </View>

        <Button style={styles.singInButton} labelStyle={styles.buttonText} uppercase={false}>
          Sign In
        </Button>
        
        <View style={styles.registerNow}>
            <Text> Don't have an account?</Text>
            <TouchableHighlight><Text style={styles.higlightText}> Register Now</Text></TouchableHighlight>  
        </View>

      </View>
    );
  }
  