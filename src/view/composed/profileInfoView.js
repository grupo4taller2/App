import React from "react";
import { StyleSheet, View } from "react-native"
import { Button, List, Surface, Text, TextInput } from "react-native-paper";
import InfoInput from "../../controler/infoInput";
import { updateInfo } from "../../model/status";
import { useUserContext } from "../components/context";
import EditButton from "../components/editButton";
import ErrorSnackBar from "../components/ErrorSnackBar";
import UserPrivateInfo from "../components/userPrivateInfo";
import UserPublicInfo from "../components/userPublicInfo";
import TextField from "./textField"

/*
Informacion pertinente:

====PUBLICA====
1. Username
2. Fecha de ingreso a la plataforma
3. Si es o no un conductor

====PRIVADA====
4. mail
5. numero de telefono
6. Direccion predeterminada

====PRIVADA CONDUCTOR====
7. Patente del auto
8. Color del auto
9. Fabricante del auto
*/
export default function ProfileInfoView(){

    const context = useUserContext();
    const userState = context.userState;
    const riderInfo = getUserInfo(userState.userInfo);
    
    const [edit, setEdit] = React.useState(false);

    const [first_name, setFirstName] = React.useState(userState.userInfo.first_name);

    const [last_name, setLastName] = React.useState(userState.userInfo.last_name);

    const [phone, setPhone] = React.useState(riderInfo.phone_number ? riderInfo.phone_number : userState.user.phoneNumber);

    const [email, setEmail] = React.useState(userState.userInfo.email);

    const [address, setAddress] = React.useState(riderInfo.preferred_location_name);

    const [editResult, setEditResult] = React.useState(false);
    const [editCompleted, setEditCompleted] = React.useState(false);
    const [beingEdited, setBeingEdited] = React.useState(false);

    const onEdit = (setCallback) => {
        return edit ? setCallback : (dummy) => {}
    };
    
    const checkOnSave = (new_value) => {
        const callback = async () => {
            
            if (!new_value) {
                setBeingEdited(true);
                const newInfo = {
                    first_name: first_name,
                    last_name: last_name,
                    phone_number: phone,
                    preferred_location_name: address
                }
                try{
                    await updateInfo(newInfo, email, context);
                    setEditResult(true);
               }catch{
                    setEditResult(false);
                }
                setEditCompleted(true);
                setBeingEdited(false);
            }
            setEdit(new_value);
            
            
        }

        return callback;
    }

    const returnType = (carModel) => {
        return carModel ? "driver" : "passenger";
    };

    return (<>
            <View style={style.infoContainer}>
                <View style={style.infoWrapper}>
                    <UserPublicInfo edit={edit} first_name={first_name} nameCallback={onEdit(setFirstName)}
                                    last_name={last_name} lastNameCallback={onEdit(setLastName)}
                                    userType={returnType(userState.user.car_model)} userTypeEditable={false}/>
                    <UserPrivateInfo edit={edit} phone={phone} phoneCallback={onEdit(setPhone)}
                                                email={email} emailCallback={onEdit(setEmail)}
                                                address={address} addressCallback={onEdit(setAddress)}/>
                </View>
                <EditButton edit={edit} callback={checkOnSave(!edit)} loading={beingEdited}/>
                <ErrorSnackBar error={editCompleted} text={editResult ? "Profile edited" : "Some error ocurred"}  
                            onDismissSnackBar={() => {setEditCompleted(false)}} success={editResult}/>
            </View>
            </>)
}


const style = StyleSheet.create(
    {
        infoContainer: {
            flex: 0.5,
        },
        infoWrapper: {
            flex: 0.85
        }
    }
)

function getUserInfo(info){
    if (info.rider_information){
        return info.rider_information;
    }
    if(info.driver_information){
        return info.driver_information;
    }

    return info;
}