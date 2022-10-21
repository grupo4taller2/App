import React, { Component } from 'react';
import {StyleSheet, View} from 'react-native';
import Outward from '../../controler/outward';
import ConfirmableTextField from './confirmableTextField';
import TextField from './textField';


const RegisterCarInput = (props) => {    
    const carMakeInfo = {
        label: props.carMake.error ? "No car make given" : "Car Make",
        mode: "outlined",
        style: styles.inputBox,
        error: props.carMake.error
    };
    const carModelInfo = {
        label: props.carModel.error ? "No car model given" : "Model",
        mode: "outlined",
        style: styles.inputBox,
        error: props.carModel.error
    };
    const carYearInfo = {
        label: props.carYear.error ? "No production year given" : "Year of Production",
        mode: "outlined",
        style: styles.inputBox,
        error: props.carYear.error
    };
    const carPlateInfo = {
        label: props.carPlate.error ? "Need a plate" : "Plate Number",
        mode: "outlined",
        style: styles.inputBox,
        error: props.carPlate.error
    };
    const carColorInfo = {
        label: props.carColor.error ? "Must have a color" : "Color",
        mode: "outlined",
        style: styles.inputBox,
        error: props.carColor.error
    };
    return(
        <View style={inputViewStyle}>
            <TextFieldFunction text={props.carMake.value} setText={props.carMakeSet} info={carMakeInfo} disabled={props.disabled}/>
            <TextFieldFunction text={props.carModel.value} setText={props.carModelSet} info={carModelInfo} disabled={props.disabled}/>
            <TextFieldFunction text={props.carYear.value} setText={props.carYearSet} info={carYearInfo} disabled={props.disabled}/>
            <TextFieldFunction text={props.carPlate.value} setText={props.carPlateSet} info={carPlateInfo} disabled={props.disabled}/>
            <TextFieldFunction text={props.carColor.value} setText={props.carColorSet} info={carColorInfo} disabled={props.disabled}/>
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
