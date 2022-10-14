import React, { Component } from 'react';
import {StyleSheet, View} from 'react-native';
import Outward from '../../controler/outward';
import ConfirmableTextField from './confirmableTextField';
import TextField from './textField';
import TextFieldFunction from './textfieldFunction';


const RegisterCarInput = (props) => {    
    const carMakeInfo = {
        label: "Car Make",
        mode: "outlined",
        style: styles.inputBox
    };
    const carModelInfo = {
        label: "Model",
        mode: "outlined",
        style: styles.inputBox
    };
    const carYearInfo = {
        label: "Year of Production",
        mode: "outlined",
        style: styles.inputBox
    };
    const carPlateInfo = {
        label: "Plate Number",
        mode: "outlined",
        style: styles.inputBox
    };
    const carColorInfo = {
        label: "Color",
        mode: "outlined",
        style: styles.inputBox
    };
    return(
        <View style={inputViewStyle}>
                    <TextFieldFunction text={props.carMake} setText={props.carMakeSet} info={carMakeInfo} disabled={props.disabled}/>
                    <TextFieldFunction text={props.carModel} setText={props.carModelSet} info={carModelInfo} disabled={props.disabled}/>
                    <TextFieldFunction text={props.carYear} setText={props.carYearSet} info={carYearInfo} disabled={props.disabled}/>
                    <TextFieldFunction text={props.carPlate} setText={props.carPlateSet} info={carPlateInfo} disabled={props.disabled}/>
                    <TextFieldFunction text={props.carColor} setText={props.carColorSet} info={carColorInfo} disabled={props.disabled}/>
        </View>
    )
}

const styles = StyleSheet.create({
    inputBox: {
        maxHeight: 60,
        margin: 10,
        paddingLeft: 8,
      }
})

const inputViewStyle = StyleSheet.create({
        flex: 1,
        marginBottom: 100,
        minWidth: 350,
        maxHeight: 550,
        justifyContent: 'flex-start',
})

export default RegisterCarInput;
