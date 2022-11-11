import { StyleSheet, View } from "react-native"
import { TextInput } from "react-native-paper"

export default function UserPublicInfo(props){

    const first_name = props.first_name;
    const last_name = props.last_name;
    const userType = props.userType;

    const nameCallback = props.nameCallback ? props.nameCallback : (dummy) => {};
    const lastNameCallback = props.lastNameCallback ? props.lastNameCallback : (dummy) => {};


    const userTypeCallback = props.userTypeEditable ? props.userTypeCallback : (dummy) => {};

    return (
    <>
    <View style={style.infoField}>
        <TextInput style={style.infoText} editable={props.edit} label="First name" 
                    value={first_name} onChangeText={nameCallback}/>
        <TextInput style={style.infoText} editable={props.edit} label="Last name" 
                    value={last_name} onChangeText={lastNameCallback}/> 
    </View>
    </>)

}

const style = StyleSheet.create({
    infoField: {
        flex: 0.3,
        flexDirection: 'row'
    },
    infoText: {
        flex: 0.5,
        maxHeight: 50,
        marginBottom: 5,
        fontWeight: "bold",
        backgroundColor: "#fff"
    },
})