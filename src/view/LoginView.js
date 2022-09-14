import React, { useState } from "react";
import { StatusBar } from 'expo-status-bar';
import {TouchableHighlight, View} from 'react-native';
import {Text, TextInput, Button, TouchableRipple} from 'react-native-paper';
import { styles } from "../styles/styles";
import LoginInfo from "./loginInputView";
import Outward from "../controler/outward";
import Login from "./loginMainView";


export default function LoginView() {
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

        <Login />
        
        <View style={styles.registerNow}>
            <Text> Don't have an account?</Text>
            <TouchableHighlight><Text style={styles.higlightText}> Register Now</Text></TouchableHighlight>  
        </View>

      </View>
    );
  }
  