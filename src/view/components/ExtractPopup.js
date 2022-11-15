
import React from "react";
import { StyleSheet, Touchable, TouchableNativeFeedback, View } from "react-native";
import { Button, Dialog, Paragraph, Surface, Text } from "react-native-paper";
import * as Clipboard from 'expo-clipboard';
import ErrorSnackBar from "./ErrorSnackBar";
import { useUserContext } from "./context";
import TextFieldFunction from "../composed/textfieldFunction";
import { Input } from "react-native-elements";


export default function MoneyExtraction(props){
    
    
    const [copied, setCopied] = React.useState(false);

    const [error, setError] = React.useState(false);

    const [errorMessage, setErrorMessage] = React.useState('');
    const [checkout, setCheckout] = React.useState(false);

    const [amount, setAmount] = React.useState(0);
    const [sendAddress, setSendAddress] = React.useState('');

    const [withdrawMessage, setWithdrawMessage] = React.useState('');
    const [withdrawStatus, setWithdrawStatus] = React.useState(false);

    const changeAmount = (newAmount) => {
        
        setAmount(parseFloat(newAmount));
        if (newAmount > props.maxValue){
            setErrorMessage("Not enought funds");
            setError(true)
        }else{
            setAmount(newAmount);
            setError(false);
            setErrorMessage('')
        }
    }

    const onDismissSnackBar = () => {
        setCopied(!copied);
    }

    const proceedWithExtraction = () => {
        if (!error){
            setCheckout(true);
        }else{
            setWithdrawMessage("Not enough funds for extraction");
        }
    }

    const cancel = () => {
        setCheckout(false);
    }

    return (
    <>
    <Dialog visible={props.visible}>
        <Dialog.Title>Money extraction</Dialog.Title>
        <Dialog.Content>
            { checkout ? 
            <>
                <Paragraph>Please confirm your address</Paragraph>
                <Paragraph>{amount} ETH will be withdrawed from your account</Paragraph>
                <View style={style.rowView}>
                    <Input style={style.InputAmount} errorStyle={error ? {color: 'red'} : null} errorMessage={error ? errorMessage : null} 
                     onChangeText={setSendAddress} value={sendAddress}/>
                </View>
            </> 
            : 
            <>
            <Paragraph>How much money would you like to extract?</Paragraph>
            <View style={style.rowView}>
                <Input style={style.InputAmount} errorStyle={error ? {color: 'red'} : null} errorMessage={error ? errorMessage : null} 
                keyboardType="numeric" onChangeText={changeAmount} value={amount}/>
                <Text style={style.WalletText}>USD</Text>
            </View>
            </>
            }
        </Dialog.Content>
        <Dialog.Actions>
            {checkout ? <Button onPress={props.toggle}>Confirm extraction</Button> : <Button onPress={proceedWithExtraction}>Confirm amount</Button>}
            <Button  onPress={checkout ? () => {cancel(); props.toggle()} : props.toggle}>{checkout ? "Cancel" : "Close"}</Button>
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