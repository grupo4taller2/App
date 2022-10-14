import React, { Component, useEffect } from 'react';
import {StyleSheet, View} from 'react-native';
import Outward from '../../controler/outward';
import InfoInput from '../../controler/infoInput';
import { Text, Checkbox, Button } from 'react-native-paper';
import RegisterCarInput from '../composed/registerCarInput';
import TextField from '../composed/textField';
import { createStatusChangerWithChecks, register } from '../../model/status';
import { useUserContext } from './context';
import StatusButton from './loginButton';


export default function UserDriverBox(props) {
    const [checkedLeft, setCheckedLeft] = React.useState(false);
    const [checkedRight, setCheckedRight] = React.useState(false);
    const [carMake, setCarMake] = React.useState();
    const [carYear, setCarYear] = React.useState();
    const [carPlate, setCarPlate] = React.useState();
    const [carColor, setCarColor] = React.useState();
    const [carModel, setCarModel] = React.useState();
    
    
    const bundleInfo = (props, driver) => {
        const info = {};
        info.username = props.all.username.getText();
        info.email = props.all.email.getText().toLowerCase();
        info.password = props.all.password.getText();
        info.first_name = props.firstName;
        info.last_name = props.lastName;
        info.phone_number = props.all.phone.getText();
        info.wallet = props.all.wallet.getText();
        info.preferred_location_name = props.all.location.getText();

        if (driver){
            info.car_manufacturer = carMake;
            //TODO: agregar modelo de auto
            info.car_model = carModel;
            info.car_year_of_production = Number(carYear);
            info.car_color = carColor;
            info.car_plate = carPlate;
        }
        console.log(info);
        return {info: info, isDriver: driver};
    };

    //TODO: implementar estos checks
    const bundleChecks = () => {
        return () => true;
    }

    

    const finishSignUp = (props, driver) => {
        
        
        return (context) => { 
            const info = bundleInfo(props, driver);
        //TODO: implementar el failed callback
        const callBack = createStatusChangerWithChecks(register,
        new Outward(),
        info,
        () => {console.log("Failed")},
        bundleChecks())
            callBack(context)
        }
        }
    
    return(
        <View style={styles.infoView}>
            

        <View style={styles.carTextView}>
            <Text style={styles.carText}>Are you a driver?</Text>
            <Text style={styles.driversOnlyText}>(Drivers Only)</Text>
            <View style={styles.checkBundle}>
                    <Checkbox.Android
                        style={styles.typeCheckbox}
                        color="#8f0404"
                        uncheckedColor="#8f0404"
                        status={checkedRight ? 'checked' : 'unchecked'}
                        onPress={() => {
                            setCheckedRight(!checkedRight);
                        }}
                        onChange={() => {
                            if(checkedRight){
                              setText('')
                            }}}
                        />
                </View>
        </View>

        <View style={styles.carInputView}>
            <RegisterCarInput carMake={carMake} carModel={carModel} carYear={carYear} carPlate={carPlate} carColor={carColor} 
                              carMakeSet={setCarMake} carModelSet={setCarModel} carYearSet={setCarYear} carPlateSet={setCarPlate} carColorSet={setCarColor}
                              disabled={!checkedRight} />
        </View>

        <View style={styles.buttonView}>
           
            <StatusButton style={{button: styles.finishButton, buttonContent: styles.finishButtonContent, buttonText: styles.finishButtonText}}
                            disabled={false} call={finishSignUp(props, checkedRight)} 
                            text={"Finish Sign up"}/>
        </View>
    </View>
    )
}


const styles = StyleSheet.create({
    inputView: {
        flex: 1,
        marginBottom: 100,
        minWidth: 350,
        maxHeight: 550,
        justifyContent: 'center',
        alignContent: 'center',
    },
    locationInputView: {
        flex: 1,
    },
    infoView: {
        flex: 6,
    },
    typeText: {
        fontSize: 18,
        marginLeft: 15,
    },
    typeCheckbox: {
        backgroundColor: '#AA44FF',
    },
    checkboxView:{
        flex: 0.1,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginTop: 15,
    },
    checkBundle: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    carInputView: {
        flex: 1,
        paddingLeft: 30,
        paddingRight: 30,
    },
    inputBox: {
        maxHeight: 60,
        margin: 10,
        paddingLeft: 8,
    },  
    carText: {
        fontSize: 18,
    },
    driversOnlyText: {
        fontSize: 12,
    },
    carTextView: {
        flexDirection: 'row',
        width: '85%',
        marginLeft: 25,
        marginTop: 10,
        alignItems: 'flex-end',
    },
    finishButton: {
        backgroundColor: '#37a0bd',
        borderRadius: 100,
    },
    finishButtonContent: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        width: 320,
        height: 70,
    },
    finishButtonText: {
      color: 'white',
      fontSize: 20,
      fontWeight: '500',
      alignSelf: 'center',
    },
    buttonView: {
        flex: 0.2,
        alignItems: 'center',
    },
  })
