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

    const carMake = new InfoInput(null, {
        label: "Car Make",
        mode: "outlined",
        style: styles.inputBox
    });
    const carYear = new InfoInput(null, {
        label: "Year of Production",
        mode: "outlined",
        style: styles.inputBox
    });
    const carPlate = new InfoInput(null, {
        label: "Plate Number",
        mode: "outlined",
        style: styles.inputBox
    });
    const carColor = new InfoInput(null, {
        label: "Color",
        mode: "outlined",
        style: styles.inputBox
    });

    const carModel = new InfoInput(null, {
        label: "Model",
        mode: "outlined",
        style: styles.inputBox
    });

    
    const bundleInfo = (props, driver) => {
        const info = {};
        info.username = props.all.username.getText();
        info.password = props.all.password.getText();
        info.email = props.all.email.getText().toLowerCase();
        //TODO: first name and last name
        info.first_name = props.firstName.getText();
        info.last_name = props.lastName.getText();
        info.phone_number = props.all.phone.getText();
        info.wallet = props.all.wallet.getText();
        //TODO: convertir a latitud y longitud
        info.preferred_location_name = props.all.location.getText();

        if (driver){
            info.car_manufacturer = carMake.getText();
            //TODO: agregar modelo de auto
            info.car_model = carModel.getText();
            info.car_year_of_production = carYear.getText();
            info.car_color = carColor.getText();
            info.car_plate = carPlate.getText();
        }
        
        
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
            console.log(info); 
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
            <RegisterCarInput carMakeText={carMake} carModelText={carModel} carYearText={carYear} carPlateText={carPlate} carColorText={carColor} disabled={!checkedRight} />
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
