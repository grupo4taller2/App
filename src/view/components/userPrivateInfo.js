import { StyleSheet, View } from "react-native"
import { TextInput } from "react-native-paper"

export default function UserPrivateInfo(props){
    const phone = props.phone;
    const phoneCallback = props.phoneCallback;
    
    const email = props.email;
    const emailCallback = props.emailCallback;

    const address = props.address;
    const addressCallback = props.addressCallback


    return (
        <>
        <View style={style.infoField}>
                        <TextInput style={[style.infoText, {flex: 1}]} editable={props.edit} label="Default Address"
                                    value={address} onChangeText={addressCallback}/>
                        <TextInput style={style.infoText}  editable={false} label="E-mail" 
                                    value={email} onChangeText={emailCallback}/>
                        <TextInput style={style.infoText} editable={props.edit} label="Phone number"
                                    value={phone} onChangeText={phoneCallback}/>
                    </View>
                    </>)
}

const style = StyleSheet.create({
    infoField: {
        flex: 1,
        flexDirection: 'column-reverse'
    },
    infoText: {
        flex: 0.5,
        maxHeight: 50,
        marginBottom: 5,
        fontWeight: "bold",
        backgroundColor: "#fff"
        
    }
})