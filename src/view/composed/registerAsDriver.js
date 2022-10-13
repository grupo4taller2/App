import { StyleSheet, View } from "react-native";
import InfoInput from "../../controler/infoInput";
import { useUserContext } from "../components/context";
import StatusButton from "../components/loginButton";
import RegisterCarInput from "./registerCarInput";

export default function RegisterAsDriver(props){
    const {asDriver} = useUserContext();

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

    const toDriver = () => {
        let ok = true;
        const info = {
            car_manufacturer: carMake.getText(),
            //TODO: agregar modelo de auto
            car_model: carModel.getText(),
            car_year_of_production: carYear.getText(),
            car_color: carColor.getText(),
            car_plate: carPlate.getText(),
        };

        if (!info.car_manufacturer){
            ok = false;
            carMake.fail();
        } 
        if (!info.car_model){ 
            ok = false;
            carModel.fail();
        }
        if (!info.car_year_of_production) {
            ok =false;
            carYear.fail();
        }

        if (!info.car_plate) {
            ok =false;
            carPlate.fail();
        }
        

        if (!info.car_color) {
            ok =false;
            carColor.fail();
        }
        

        if (ok){
            asDriver(info);
        }
    };


    return (
        <View style={styles.mainView}>
        <View style={styles.carInputView}>
            <RegisterCarInput carMakeText={carMake} carModelText={carModel} carYearText={carYear} carPlateText={carPlate} carColorText={carColor} />
        </View>
        <StatusButton style={{button: styles.finishButton, buttonContent: styles.finishButtonContent, buttonText: styles.finishButtonText}}
                            disabled={false} call={toDriver} 
                            text={"Become a driver"}/>
        </View>
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
        backgroundColor: "#eaeaba",
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