import { StyleSheet, View } from "react-native"
import { TextInput } from "react-native-paper"

export default function UserPublicInfo(props){

    const username = props.username;
    const userType = props.userType;

    const userCallback = props.userCallback ? props.userCallback : (dummy) => {};

    const userTypeCallback = props.userTypeEditable ? props.userTypeCallback : (dummy) => {};

    return (<View style={style.infoField}>
        <TextInput style={style.infoText} editable={props.edit} label="Username" 
                    value={username} onChangeText={userCallback}/>
        <TextInput style={style.infoText} editable={props.userTypeEditable} label="User type" 
                    value={userType} onChangeText={userTypeCallback}/>
    </View>)
}

const style = StyleSheet.create({
    infoField: {
        flex: 0.2,
        flexDirection: 'row'
    },
    infoText: {
        flex: 0.5,
        maxHeight: 50,
        marginBottom: 5,
        fontWeight: "bold",
        backgroundColor: "#eaeaba"
    },
})