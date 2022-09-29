import React, { Component, useEffect } from 'react';
import {StyleSheet, View} from 'react-native';
import Outward from '../../controler/outward';
import InfoInput from '../../controler/infoInput';
import { Text, Checkbox, Button } from 'react-native-paper';
import RegisterCarInput from '../composed/registerCarInput';
import TextField from '../composed/textField';


export default function UserDriverBox() {
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

    
    return(
        <View style={styles.infoView}>
            

            <View style={styles.checkboxView}>
                <Text style={styles.typeText}>
                    Account type:
                </Text>
                <View style={styles.checkBundle}>
                    <Text> Passenger </Text>
                    <Checkbox.Android
                        style={styles.typeCheckbox}
                        color="#8f0404"
                        uncheckedColor="#8f0404"
                        status={checkedLeft ? 'checked' : 'unchecked'}
                        onPress={() => {
                            setCheckedLeft(!checkedLeft);
                        }}
                        />
                </View>

                <View style={styles.checkBundle}>
                    <Text> Driver </Text>
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

        <View style={styles.carTextView}>
            <Text style={styles.carText}>What car do you plan on using? </Text>
            <Text style={styles.driversOnlyText}>(Drivers Only)</Text>
        </View>

        <View style={styles.carInputView}>
            <RegisterCarInput carMakeText={carMake} carYearText={carYear} carPlateText={carPlate} carColorText={carColor} disabled={!checkedRight} />
        </View>

        <View style={styles.buttonView}>
            <Button style={styles.finishButton} contentStyle={styles.finishButtonContent} 
                        labelStyle={styles.finishButtonText} onPress={()=>{console.log('submission')}}>
                Finish Sign up
            </Button>
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
        fontSize: 20,
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
        marginBottom: 30,
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
        marginBottom: 10,
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
        flex: 0.3,
        alignItems: 'center',
    },
  })
