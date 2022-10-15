import React, { useState } from "react";
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Appbar, Text} from 'react-native-paper';
import GoogleLogin from "../components/googleSignin";
import Greet from "../components/greet";
import Login from "../composed/loginMainView";
import { ROUTES } from "../../navigation/routes";


export default function LoginScreen({ navigation }) {
    return (
      <View style={style.loginMainView}>
        
        
        <Greet mainText={"Hello Again!"} secondaryText={"Need a Lift?"} />
        <Login />
        
        <View style={style.registerNow}>
            <Text style={style.bottomTextAcc}> Don't have an account?</Text>
            <TouchableOpacity activeOpacity={0.6} onPress={() => navigation.push(ROUTES.RegisterFirstView)} >
              <Text style={style.higlightTextReg}> {"Register Now"} </Text>
            </TouchableOpacity>
        </View>

        <View style={style.bottomTextView}>
            <Text style={style.bottomTextOr}> or</Text>
            <GoogleLogin />
        </View>

      </View>
    );
  }

const style = StyleSheet.create({
  loginMainView: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: 'center',
    justifyContent: 'center',
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
})
  