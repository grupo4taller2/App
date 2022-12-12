import React from "react";
import { SafeAreaView, StyleSheet, TouchableNativeFeedback, View } from "react-native";
import InfoInput from "../../controler/infoInput";
import { updateDriverInfo } from "../../model/status";
import { useUserContext } from "../components/context";
import StatusButton from "../components/loginButton";
import RegisterCarInput from "./registerCarInput";
import Constants from 'expo-constants';
import { Avatar } from "react-native-paper";
import ErrorSnackBar from "../components/ErrorSnackBar";

export default function RegisterAsDriver({navigation}){
    const context = useUserContext();
    const {userState,asDriver} = context;
    const props = userState.userInfo.driver_information.car;

    const [editCompleted, setEditCompleted] = React.useState(false);
    const [editResult, setEditResult] = React.useState(false);
    

    const [carMakeText, setCarMake] = React.useState(props.manufacturer);
    const [carMakeError, setCarMakeError] = React.useState(false);
    const carMake = {value: carMakeText, error: carMakeError};
    const [carYearText, setCarYear] = React.useState(props.year_of_production.toString());
    const [carYearError, setCarYearError] = React.useState(false);
    const carYear = {value: carYearText, error: carYearError}
    const [carPlateText, setCarPlate] = React.useState(props.plate);
    const [carPlateError, setCarPlateError] = React.useState(false);
    const carPlate = {value: carPlateText, error: carPlateError}
    const [carColorText, setCarColor] = React.useState(props.color);
    const [carColorError, setCarColorError] = React.useState(false);
    const carColor = {value: carColorText, error: carColorError}
    const [carModelText, setCarModel] = React.useState(props.model);
    const [carModelError, setCarModelError] = React.useState(false);
    const carModel = {value: carModelText, error: carModelError};

    const [editing, setEditing] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    
    const checkNotEmpty = () => {
        const carMakeEmpty = carMakeText === '';
        const carYearEmpty = carYearText === '';
        const carPlateEmpty = carPlateText === '';
        const carColorEmpty = carColorText === '';
        const carModelEmpty = carModelText === '';
        
        if (carMakeEmpty) {
            setCarMakeError(true)
        }
        if (carYearEmpty) {
            setCarYearError(true)
        }
        if (carPlateEmpty) {
            setCarPlateError(true)
        }
        if (carColorEmpty) {
            setCarColorError(true)
        }
        if (carModelEmpty) {
            setCarModelError(true)
        }
        
        return carMakeEmpty || carColorEmpty || carPlateEmpty || carModelEmpty || carYearEmpty;
    }

    const bundleInfo = () => {
        const info = {};
        info.first_name = userState.userInfo.first_name;
        info.last_name = userState.userInfo.last_name;
        info.phone_number = userState.userInfo.driver_information.phone_number;
        info.car_manufacturer = carMakeText;
        info.car_model = carModelText;
        info.car_year_of_production = parseInt(carYearText);
        info.car_color = carColorText;
        info.car_plate = carPlateText;
        
        return info;
    };

    const handleEdition = async () => {
        if (checkNotEmpty()){
            return;
        }
        setLoading(true);

        try{
            const newInfo = bundleInfo();
            
            await updateDriverInfo(newInfo, userState.userInfo.email, context);
            setEditResult(true);
        }catch (error){
            console.log(error);
            setEditResult(false);
        }
        setEditCompleted(true);
        setLoading(false);
    };
    
    
    const edit = async () => {
        if (editing) {
            await handleEdition();
            setEditing(false);
        }else{
            setEditing(true);
        }
    }



    return (
        <>
        <SafeAreaView style={styles.backView}>
            <TouchableNativeFeedback onPress={() => navigation.pop()}>
                <Avatar.Icon style={styles.backArrow} size={50} icon="chevron-left" />
            </TouchableNativeFeedback>
        </SafeAreaView>
        <View style={styles.mainView}>
            
        <View style={styles.carInputView}>
            <RegisterCarInput carMake={carMake} carModel={carModel} carYear={carYear} carPlate={carPlate} carColor={carColor} 
                                carMakeSet={setCarMake} carModelSet={setCarModel} carYearSet={setCarYear} carPlateSet={setCarPlate} carColorSet={setCarColor}
                                disabled={!editing}/>
        </View>
        <StatusButton style={{button: styles.finishButton, buttonContent: styles.finishButtonContent, buttonText: styles.finishButtonText}}
                            disabled={false} call={edit} load={() => {}} loading={loading}
                            text={editing ? "Save information" : "Edit car information"}/>
        <ErrorSnackBar error={editCompleted} text={editResult ? "Car info updated" : "Some error ocurred"}  
                            onDismissSnackBar={() => {setEditCompleted(false)}} success={editResult}/>

        </View>
        </>
    )
}


const styles = StyleSheet.create({
    carInputView: {
        flex: 0.5,
        paddingLeft: 30,
        paddingRight: 30,
        padding: 10
    },
    mainView: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fff",
    },
    finishButton: {
        position: "absolute",
        bottom: 5,
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
    backView: {
        flex: 0.1,
        backgroundColor: "#fff",
        
    },
    backArrow: {
        backgroundColor: "#fff",
        marginTop: Constants.statusBarHeight
    }
})
