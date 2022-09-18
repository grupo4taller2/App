import React, { useState } from "react";
import {StyleSheet, TouchableHighlight, View} from 'react-native';
import {Text, TextInput, Button, TouchableRipple} from 'react-native-paper';
import Login from "./loginMainView";


export default function LoginView() {
    return (
      <View style={style.loginMainView}>
  
        <View style={style.greetView}>
            <Text style={style.mainGreet}>
                Hello Again!
            </Text>
            <Text style={style.secondaryGreet}>
                Need a Lift?
            </Text>
        </View>

        <Login />
        
        <View style={style.registerNow}>
            <Text> Don't have an account?</Text>
            <TouchableHighlight><Text style={style.higlightText}> Register Now</Text></TouchableHighlight>  
        </View>

      </View>
    );
  }

const style = StyleSheet.create({
  mainGreet: {
    textAlign: 'center',
    color: 'black',
    fontWeight: 'bold',
    fontSize: 34,
},
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
  secondaryGreet: {
    textAlign: 'center',
    color: 'black',
    fontWeight: '300',
    fontSize: 24,
},
registerNow: {
  flex: 1,
  flexDirection: "row",
  paddingBottom: 25,
  alignItems: 'flex-end',
},
higlightText: {
  fontSize: 15,
  fontWeight: 'bold'
},
})
  