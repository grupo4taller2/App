import React, { Component } from 'react';
import {StyleSheet, View} from 'react-native';
import Outward from '../../controler/outward';
import TextField from './textField';
import InfoInput from '../../controler/infoInput';
import UserDriverBox from '../components/userDriverBox';
import { Text } from 'react-native-paper';


export default function UserTypeCheck() {
    const location = new InfoInput(null, {
        label: "Default Location",
        mode: "outlined",
        style: styles.inputBox
    });
    return(
        <React.Fragment>
            <View style={styles.infoView}>

                <View style={styles.locationInputView} >
                    <TextField text={location} />
                </View>

                <UserDriverBox/>
                
            </View>
        </React.Fragment>
    )
}


const styles = StyleSheet.create({
  inputBox: {
    maxHeight: 60,
    margin: 10,
    paddingLeft: 8,
  },  
  locationInputView: {
      flex: 1,
      marginBottom: 15,
      justifyContent: 'center',
      minWidth: 350,
      maxHeight: 150,
      paddingLeft: 30,
      paddingRight: 30,
  },
  infoView: {
      flex: 4,      
  },
})
