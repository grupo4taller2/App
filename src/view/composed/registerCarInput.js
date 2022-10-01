import React, { Component } from 'react';
import {StyleSheet, View} from 'react-native';
import Outward from '../../controler/outward';
import ConfirmableTextField from './confirmableTextField';
import TextField from './textField';


const RegisterCarInput = (props) => {    
    return(
        <View style={inputViewStyle}>
                    <TextField text={props.carMakeText} disabled={props.disabled} />
                    <TextField text={props.carYearText} disabled={props.disabled} />
                    <TextField text={props.carPlateText} disabled={props.disabled} />
                    <TextField text={props.carColorText} disabled={props.disabled} />
        </View>
    )
}


const inputViewStyle = StyleSheet.create({
        flex: 1,
        marginBottom: 100,
        minWidth: 350,
        maxHeight: 550,
        justifyContent: 'flex-start',
})

export default RegisterCarInput;
