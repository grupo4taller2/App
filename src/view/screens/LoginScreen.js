import React, { useState } from "react";
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Text} from 'react-native-paper';
import Login from "../loginMainView";


export default function LoginScreen({ navigation }) {
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
            <Text style={style.bottomTextAcc}> Don't have an account?</Text>
            <TouchableOpacity activeOpacity={0.6} onPress={() => navigation.navigate('Register')} >
              <Text style={style.higlightTextReg}> {"Register Now"} </Text>
            </TouchableOpacity>
        </View>

        <View style={style.bottomTextView}>
            <Text style={style.bottomTextOr}> or</Text>
            <TouchableOpacity activeOpacity={0.6} onPress={() => {/* firabase function for google log in */}}>
              <Text style={style.higlightTextGoogle}> Sign in with Google </Text>
            </TouchableOpacity>
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
    flex: 0.7,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  bottomTextView: {
    flex: 0.3,
    flexDirection: "row",
    alignItems: 'flex-end',
  },
  bottomTextAcc: {
    paddingBottom: 5,
  },
  bottomTextOr: {
    paddingBottom: 25,
  },
  higlightTextReg: {
    fontSize: 15,
    fontWeight: 'bold',
    paddingBottom: 5,
  },
  higlightTextGoogle: {
    fontSize: 15,
    fontWeight: 'bold',
    paddingBottom: 25,
  },
})
  