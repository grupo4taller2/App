import React, { Component, useEffect } from 'react';
import {StyleSheet, View} from 'react-native';
import Outward from '../../controler/outward';
import InfoInput from '../../controler/infoInput';
import { Text, Checkbox, Button } from 'react-native-paper';
import RegisterCarInput from '../composed/registerCarInput';
import TextField from '../composed/textField';
import { createStatusChangerWithChecks, getUser, postNewUser, register } from '../../model/status';
import { useUserContext } from './context';
import StatusButton from './loginButton';
import ErrorSnackBar from './ErrorSnackBar';


export default function UserDriverBox(props) {
    const context = useUserContext();
    const [checkedRight, setCheckedRight] = React.useState(false);
    const [carMake, setCarMake] = React.useState();
    const [carYear, setCarYear] = React.useState();
    const [carPlate, setCarPlate] = React.useState();
    const [carColor, setCarColor] = React.useState();
    const [carModel, setCarModel] = React.useState();

    
    const [carMakeError, setCarMakeError] = React.useState(false);
    const [carYearError, setCarYearError] = React.useState(false);
    const [carPlateError, setCarPlateError] = React.useState(false);
    const [carColorError, setCarColorError] = React.useState(false);
    const [carModelError, setCarModelError] = React.useState(false);
    
    const [error, setError] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const load = () => {
        setLoading(true);
    }

    const dismissError = () => {
        setError(!error);
    }
    
    const bundleInfo = (props, driver) => {
        const info = {};
        info.username = props.all.username.getText();
        info.email = props.all.email.getText().toLowerCase();
        info.password = props.all.password.getText();
        info.first_name = props.firstName.value;
        info.last_name = props.lastName.value;
        info.phone_number = props.all.phone.getText();
        info.preferred_location_name = props.all.location.getText();

        if (driver){
            info.car_manufacturer = carMake;
            //TODO: agregar modelo de auto
            info.car_model = carModel;
            info.car_year_of_production = Number(carYear);
            info.car_color = carColor;
            info.car_plate = carPlate;
        }
        
        return {info: info, isDriver: driver};
    };

    const bundleInfoFederated = () => {
        const info = {};
        info.username = props.username;
        info.email = props.email.toLowerCase();
        info.first_name = props.firstName;
        info.last_name = props.lastName;
        info.phone_number = props.phone ? props.phone : "";
        info.preferred_location_name = props.location;

        if (checkedRight){
            info.car_manufacturer = carMake;
            //TODO: agregar modelo de auto
            info.car_model = carModel;
            info.car_year_of_production = Number(carYear);
            info.car_color = carColor;
            info.car_plate = carPlate;
        }
        
        return {info: info, isDriver: checkedRight};
    }

    const checkNotEmpty = (value) => {
        return value && value !== '';
    }

    const carInfoCheck = () => {
        let carOk = true;
        if(checkedRight){
            
            const carMakeChecked = checkNotEmpty(carMake);
            const carColorChecked = checkNotEmpty(carColor);
            const carYearChecked =  checkNotEmpty(carYear);
            const carModelChecked =  checkNotEmpty(carModel);
            const carPlateChecked = checkNotEmpty(carPlate);
            carOk = carMakeChecked && carColorChecked && carYearChecked && carModelChecked && carPlateChecked;
            

            carMakeChecked ? setCarMakeError(false) : setCarMakeError(true);
            carModelChecked ? setCarModelError(false) : setCarModelError(true);
            carYearChecked ? setCarYearError(false) : setCarYearError(true);
            carPlateChecked ? setCarPlateError(false) : setCarPlateError(true);
            carColorChecked ? setCarColorError(false) : setCarColorError(true);
        }
        
        return carOk
    }

    const bundleChecks = () => {
        
        return () => {
            const firstName = checkNotEmpty(props.firstName.value);
            const lastName = checkNotEmpty(props.lastName.value);
            const carOk = carInfoCheck();
            


            firstName ? props.firstName.errorSet(false) : props.firstName.errorSet(true);
            lastName ? props.lastName.errorSet(false) : props.lastName.errorSet(true);
            const condition = firstName && lastName && carOk;

            if (!condition) setLoading(false);

            return condition;

        };
    }

    const federatedChecks = async () => {
        const carOk = carInfoCheck();
        let matched = props.username.match(/^\w{8,16}/);
        
        let userOk = true;
        if (!matched){
            userOk = false;
        }else{
            userOk = matched[0] === props.username;
            
        }
        if(userOk){
            try{
            await getUser(props.username);
            userOk = false;
            }catch (error){
                //console.log(error)
            }
        }

        const addressOk = checkNotEmpty(props.location)

        if (!userOk){
            props.usernameError(true);
        }else{
            props.usernameError(false);
        }
        if(!addressOk){
            props.locationError(true);
        }else{
            props.locationError(false);
        }

        return carOk && userOk && addressOk
    }

    const finishSignUpFederated = async (context) => {
        const checked = await federatedChecks();
        if (checked){
            const bundledInfo = bundleInfoFederated();
            try{
                
                const backResponse = await postNewUser(bundledInfo, {credential: props.federatedValue});
                
                await context.register(props.federatedValue, await backResponse.data);
            }catch (error){
                console.log(error);
                setError(true)
                
            }

        }
        setLoading(false);
    }

    const finishSignUp = (props, driver) => {
        
        
        if(!props.isFederated){
            return async (context) => { 

            const info = bundleInfo(props, driver);

            const callBack = createStatusChangerWithChecks(register,
            new Outward(),
            info,
            () => {setLoading(false)},
                bundleChecks())
                try{
                    await callBack(context)
                }catch (error){ 
                    console.warn(error)
                    setLoading(false)
                    props.navigation.pop();
                }

            }
        }else{
            return finishSignUpFederated
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

            <RegisterCarInput carMake={{value: carMake, error: carMakeError}} carModel={{value: carModel, error: carModelError}}

             carYear={{value: carYear, error: carYearError}} carPlate={{value: carPlate, error: carPlateError}} 
             carColor={{value: carColor, error: carColorError}} 
            carMakeSet={setCarMake} carModelSet={setCarModel} carYearSet={setCarYear} carPlateSet={setCarPlate} carColorSet={setCarColor}
            disabled={!checkedRight} />
        </View>

        <View style={styles.buttonView}>
            <ErrorSnackBar error={error} onDismissSnackBar={dismissError} text={"Unexpected error occured"} />
            {!error && <StatusButton style={{button: styles.finishButton, buttonContent: styles.finishButtonContent, buttonText: styles.finishButtonText}}
                            disabled={false} call={finishSignUp(props, checkedRight)}
                            load={load} loading={loading} 
                            text={"Finish Sign up"}/>}
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
