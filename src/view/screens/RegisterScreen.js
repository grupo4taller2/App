import React, { useState } from "react";
import {StyleSheet, TouchableHighlight, View} from 'react-native';
import {Text, TextInput, Button, TouchableRipple} from 'react-native-paper';
import RegisterInfo from "../registerInfoView";
import { Appbar } from 'react-native-paper';


export default function RegisterScreen({ navigation }) {
    return (
      <View style={style.registerMainView}>
        
        <View style={style.headerView}>
            <Appbar.Header>
              <Appbar.BackAction onPress={() => {navigation.navigate('Login')}} />
            </Appbar.Header>
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
  headerView: {
    flex: 1.5,
    flexDirection: 'row',
  },
  instructionText: {
    color: 'black',
    fontWeight: '500',
    fontSize: 26,
    paddingTop: 75,
  },
  registerView: {
    flex: 5,
    alignItems: 'center',
  },
})
  