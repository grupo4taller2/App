import { useNavigation } from "@react-navigation/native";
import React from "react";
import { SafeAreaView, StyleSheet, TouchableNativeFeedback, View } from "react-native";
import { Avatar, Text } from "react-native-paper";
import TextFieldFunction from "../composed/textfieldFunction";
import Constants from 'expo-constants';
import StatusButton from "../components/loginButton";
import { getAuth, sendPasswordResetEmail} from "firebase/auth";
import { getApp } from "firebase/app";
import ErrorSnackBar from "../components/ErrorSnackBar";
import { EMAILCHECK } from "../../model/textInput";

export default function PasswordRecovery({navigation}){
    
    const [text, setText] = React.useState('');
    const [error, setError] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [errorText, setErrorText] = React.useState('');
    const [snackBar, setSnackBar] = React.useState(false);

    const fieldInfo = {
        label: "Account email",
        mode: "outlined",
        style: styles.inputBox,
        error: error
    };

    const call = async (context) => {
        
        const matched =  text.match(EMAILCHECK);

        if (!matched) {
            setError(true);
            setError("Invalid Email");
            setSnackBar(true);
            return
        }else if (matched[0] !== text){
            setError(true)
            setError("Invalid Email");
            setSnackBar(true);
            return
        }

        try{
            const auth = getAuth()
            await sendPasswordResetEmail(auth, text)
            setErrorText( "Password reset email sent");
        }catch{
            setError(true);
            setErrorText("Could not send password reset email")
        }
        setSnackBar(true)
        setLoading(false)
    }

    const load = () => {
        setLoading(true)
    }

    return <React.Fragment>
        <SafeAreaView style={styles.backView}>
                <TouchableNativeFeedback onPress={() => navigation.pop()}>
                    <Avatar.Icon style={styles.backArrow} size={50} icon="chevron-left" />
                </TouchableNativeFeedback>
                <Text style={styles.header}>Password recovery</Text>
            </SafeAreaView> 
        <View style={styles.View}>
            <TextFieldFunction  style={style.textField} text={text} setText={setText} info={fieldInfo}/>
            <StatusButton text={"Send recovery e-mail"} style={styles} call={call} load={load} loading={loading}/>
        </View>
        <ErrorSnackBar error={snackBar} onDismissSnackBar={() => setSnackBar(false)} success={!error} text={errorText} />
    </React.Fragment>
}

const style = {
    textField: {
        selectionColor: '#000',
        activeOutlineColor: '#37a0bd',
        theme: {roundness: 30, colors: {background: "#fff"}},
        alignSelf: 'center'
    }

}
const styles = StyleSheet.create({
    inputBox: {
        maxHeight: 60,
        margin: 10,
        paddingLeft: 8,
        minWidth: 350
      },
      View: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: 'center',
        justifyContent: 'center',
      },
      backView: {
        flex: 0.1,
        backgroundColor: "#fff",
        flexDirection: 'row',
        alignContent: 'center',
    },
    backArrow: {
        backgroundColor: "#fff",
        marginTop: Constants.statusBarHeight
    },
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        alignSelf: "center",
        marginLeft: 60,
        marginTop: Constants.statusBarHeight
    },
    button: {
        backgroundColor: '#37a0bd',
        borderRadius: 100,
        marginTop: 50,
    },
    buttonContent: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        width: 320,
        height: 70,
    },
    buttonText: {
      color: 'white',
      fontSize: 20,
      fontWeight: '500',
      alignSelf: 'center',
    },
})