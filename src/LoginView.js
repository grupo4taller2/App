import React, { useState } from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, TouchableHighlight, View} from 'react-native';
import {Text, TextInput, Button, TouchableRipple} from 'react-native-paper';
import FiUberLogo from '../resources/images/logo.png';

export default function LoginView() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
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
          <TextInput
            label="Username"
            mode="outlined"
            style={styles.inputBox}
          />
          <TextInput
            label="Password"
            mode="outlined"
            style={styles.inputBox}
            right={<TextInput.Icon icon="eye"/>}
          />
        </View>

        <Button style={styles.singInButton} buttonColor="#37a0bd" labelStyle={styles.buttonText} uppercase={false}>
          Sign In
        </Button>
        
        <View style={styles.registerNow}>
            <Text> Don't have an account?</Text>
            <TouchableHighlight><Text style={styles.higlightText}> Register Now</Text></TouchableHighlight>  
        </View>

      </View>
    );
  }
  
  const styles = StyleSheet.create({
    loginMainView: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    greetView: {
      flex: 1,
      paddingTop: 100
    },
    inputView: {
      flex: 2,
      marginBottom: 100,
      minWidth: 350,
      maxHeight: 150,
      justifyContent: "flex-start"
    },
    inputBox: {
      maxHeight: 60,
      margin: 10,
    },  
    mainGreet: {
        textAlign: "center",
        color: "black",
        fontWeight: "bold",
        fontSize: 34
    },
    secondaryGreet: {
        textAlign: "center",
        color: "black",
        fontWeight: "300",
        fontSize: 24
    },
    singInButton: {
        flex: 1,
        justifyContent: "center",
        width: 350,
        maxHeight: 70,
    },
    registerNow: {
        flex: 1,
        flexDirection: "row",
        paddingBottom: 25,
        alignItems: 'flex-end'
        
    },
    buttonText: {
        color: "white",
        fontSize: 20,
        fontWeight: "500",
        alignSelf: 'center'
    },
    higlightText: {
      fontSize: 15,
      fontWeight: 'bold'
    }
  });
  