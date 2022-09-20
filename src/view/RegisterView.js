import React, { useState } from "react";
import {StyleSheet, TouchableHighlight, View} from 'react-native';
import {Text, TextInput, Button, TouchableRipple} from 'react-native-paper';
import RegisterInfo from "./registerInfoView";


export default function RegisterView() {
    return (
      <View style={style.registerMainView}>
  
        <View style={style.instructionView}>
            <Text style={style.instructionText}>
              {'Let\'s start off \nby getting you set up'}
            </Text>
        </View>
        
        <View style={style.registerView}>
          <RegisterInfo />
        </View>

      </View>
    );
  }

const style = StyleSheet.create({
  registerMainView: {
    flex: 1,
    backgroundColor: '#fff',
  },
  instructionView: {
    flex: 1,
    paddingTop: 50,
    paddingLeft: 50,
  },
  instructionText: {
    color: 'black',
    fontWeight: '500',
    fontSize: 26,
  },
  registerView: {
    flex: 5,
    alignItems: 'center',
  },
})
  