import React from "react";
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native-paper';
import GoogleLogin from "../components/googleSignin";
import Greet from "../components/greet";
import Login from "../composed/loginMainView";
import { ROUTES } from "../../navigation/routes";


export default function LoginScreen({ navigation }) {
  const recoverPassword = () => {
    navigation.push(ROUTES.PasswordRecoveryPage)
  }  
  
  return (
      <View style={style.loginMainView}>
        
        
        <Greet mainText={"Hello Again!"} secondaryText={"Need a Lift?"} />
        <Login navigation={recoverPassword}/>
        <Text style={style.forgotPasswordText} onPress={recoverPassword}>{"Forgot password?"}</Text>
        <View style={style.registerNow}>
            <Text style={style.bottomTextAcc}> Don't have an account?</Text>
            <TouchableOpacity activeOpacity={0.6} onPress={() => navigation.push(ROUTES.RegisterFirstView)} >
              <Text style={style.higlightTextReg}> {"Register Now"} </Text>
            </TouchableOpacity>
        </View>

        <View style={style.bottomTextView}>
            <Text style={style.bottomTextOr}>or</Text>
        </View>
        <GoogleLogin navigation={navigation}/>
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
    flex: 0.15,
    flexDirection: "row",
    alignItems: 'flex-end',
  },
  bottomTextAcc: {
    paddingBottom: 5,
  },
  bottomTextOr: {
    paddingBottom: 10,
  },
  higlightTextReg: {
    fontSize: 15,
    fontWeight: 'bold',
    paddingBottom: 5,
  },
  forgotPasswordText: {
    marginTop: 10,
    fontSize: 12,
    color: "#37a0bd"
  }
})
  