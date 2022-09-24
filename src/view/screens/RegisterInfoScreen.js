import React, { useState, Component } from "react";
import {StyleSheet, TouchableHighlight, View} from 'react-native';
import {Text, TextInput, Button, Checkbox } from 'react-native-paper';
import { Appbar } from 'react-native-paper';
import TextField from "../composed/textField";
import InfoInput from "../../controler/infoInput";
import UserTypeCheck from "../composed/registerUserView";


export default function RegisterInfoScreen({ navigation }) {
    return (
      <View style={style.registerInfoMainView}>
        
        <View style={style.headerView}>
            <Appbar.Header>
              <Appbar.BackAction onPress={() => {navigation.pop()}} />
            </Appbar.Header>
            <Text style={style.instructionText}>
              {"Great! \nyou're almost done"}
            </Text>
        </View>
        
        <UserTypeCheck location={style.locationInput}/>

      </View>
    )
}

const style = StyleSheet.create({
  registerInfoMainView: {
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
  locationInput: {
    flex: 4,
    marginBottom: 100,
    minWidth: 350,
    maxHeight: 550,
    justifyContent: 'flex-start',
  },
})
  