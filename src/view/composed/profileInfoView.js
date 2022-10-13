import React from "react";
import { StyleSheet, View } from "react-native"
import { Button, List, Surface, Text, TextInput } from "react-native-paper";
import InfoInput from "../../controler/infoInput";
import { updateInfo } from "../../model/status";
import { useUserContext } from "../components/context";
import EditButton from "../components/editButton";
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
    const [edit, setEdit] = React.useState(false);

    const [username, setUsername] = React.useState(userState.userInfo.username);

    const [phone, setPhone] = React.useState(userState.userInfo.phone_number ? userState.userInfo.phone_number : userState.user.phoneNumber);

    const [email, setEmail] = React.useState(userState.userInfo.email);

    const [address, setAddress] = React.useState(userState.userInfo.preferred_location_name);

    const onEdit = (setCallback) => {
        return edit ? setCallback : (dummy) => {}
    };
    
    const checkOnSave = (new_value) => {
        const callback = () => {
            if (!new_value) {
                const newInfo = {
                    username: username,
                    phone_number: phone,
                    email: email,
                    preferred_location_name: address
                }
                updateInfo(newInfo, context);
            }
            setEdit(new_value)
        }

        return callback;
    }

    const returnType = (carModel) => {
        return carModel ? "driver" : "passenger";
    };

    return (<>
            <View style={style.infoContainer}>
                <View style={style.infoWrapper}>
                    <UserPublicInfo edit={edit} username={username} userCallback={onEdit(setUsername)}
                                    userType={returnType(userState.user.car_model)} userTypeEditable={false}/>
                    <UserPrivateInfo edit={edit} phone={phone} phoneCallback={onEdit(setPhone)}
                                                email={email} emailCallback={onEdit(setEmail)}
                                                address={address} addressCallback={onEdit(setAddress)}/>
                </View>
                <EditButton edit={edit} callback={checkOnSave(!edit)}/>
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