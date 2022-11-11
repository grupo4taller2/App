
import React from "react";
import { StyleSheet, Touchable, TouchableNativeFeedback, View } from "react-native";
import { Button, Dialog, Paragraph, Surface, Text } from "react-native-paper";
import * as Clipboard from 'expo-clipboard';
import ErrorSnackBar from "./ErrorSnackBar";
import { useUserContext } from "./context";
import TextFieldFunction from "../composed/textfieldFunction";
import { Input } from "react-native-elements";


export default function MoneyExtraction(props){
    
    const {userState} = useUserContext();

    const address = getWalletAddress(userState.userInfo);
    
    const [copied, setCopied] = React.useState(false);

    const [error, setError] = React.useState(false);

    const [errorMessage, setErrorMessage] = React.useState('');

    const [amount, setAmount] = React.useState(0);

    const [withdrawMessage, setWithdrawMessage] = React.useState('');
    const [withdrawStatus, setWithdrawStatus] = React.useState(false);

    const changeAmount = (newAmount) => {
        
        setAmount(parseFloat(newAmount));
        if (newAmount > 100){
            setErrorMessage("Not enought funds");
            setError(true)
        }else{
            setError(false);
            setErrorMessage('')
        }
    }

    const onDismissSnackBar = () => {
        setCopied(!copied);
    }

    return (
    <>
    <Dialog visible={props.visible}>
        <Dialog.Title>Money extraction</Dialog.Title>
        <Dialog.Content>
            <Paragraph>How much money would you like to extract?</Paragraph>
            <View style={style.rowView}>
                <Input style={style.InputAmount} errorStyle={error ? {color: 'red'} : null} errorMessage={error ? errorMessage : null} 
                keyboardType="numeric" onChangeText={changeAmount}/>
                <Text style={style.WalletText}>USD</Text>
            </View>
        </Dialog.Content>
        <Dialog.Actions>
            <Button  onPress={props.toggle}>Close</Button>
        </Dialog.Actions>
    </Dialog>
    <ErrorSnackBar error={copied} onDismissSnackBar={onDismissSnackBar} text={withdrawMessage} success={withdrawStatus} />
    </>)
}


function getWalletAddress(userInfo){
    return (
        userInfo.driver_information ? userInfo.driver_information.wallet : userInfo.rider_information.wallet
    )
}

const style = StyleSheet.create(
    {
        surface: {
            borderRadius: 10,
            height: 50,
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row'
        },
        WalletText: {
           margin: 10,
           fontSize: 20,
           fontWeight: "bold",
           
        },
        InputAmount: {
            borderRadius: 50,
            
        },

        ClipboardButton: {
            position: "absolute",
            left: 0,
            bottom: 25,
            marginHorizontal: 10, 
        },

        rowView: {
            flexDirection: 'row',
            justifyContent: "center",
            margin: 20
            
        }
    }
)