
import React from "react";
import { StyleSheet, View } from "react-native";
import { Button, Dialog, Paragraph, Text } from "react-native-paper";
import ErrorSnackBar from "./ErrorSnackBar";
import { Input } from "react-native-elements";


const WALLETCHECK = /0x[a-zA-Z0-9]{40}/

export default function MoneyExtraction(props){
    
    
    const [transactionResponse, setResponse] = React.useState(false);

    const [error, setError] = React.useState(false);

    const [errorMessage, setErrorMessage] = React.useState('');
    const [checkout, setCheckout] = React.useState(false);

    const [amount, setAmount] = React.useState(0);
    const [sendAddress, setSendAddress] = React.useState('');

    const [withdrawMessage, setWithdrawMessage] = React.useState('');
    const [withdrawStatus, setWithdrawStatus] = React.useState(false);

    const [loading, setLoading] = React.useState(false);

    const changeAmount = (newAmount) => {
        newAmount = newAmount.replace(/,/g, '.')
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

    const extractMoney = async () => {
        const matched = sendAddress.match(WALLETCHECK);
        if (matched && sendAddress === matched[0]){
            setLoading(true);
            try{
                console.log(sendAddress);
                console.log(amount);
                await props.extractionCheckout(amount, sendAddress);
                //Abrir snackbar como success
                setWithdrawStatus(true);
                setWithdrawMessage("Your withdraw is on the way");
                setResponse(true);
                setLoading(false);
                return;
            }catch (error) {
                //Abrir el snackbar de error (failed transaction)
                setWithdrawStatus(false);
                setWithdrawMessage("Transaction failed");
                setResponse(true);
                setLoading(false);
                return;
            }
        }

        //Abrir el snackbar de error (wallet incorrecta)
        setWithdrawStatus(false);
        setWithdrawMessage("Invalid wallet");
        setResponse(true);
        setLoading(false);
        
    };

    const onDismissSnackBar = () => {
        setResponse(!transactionResponse);
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
            <Paragraph>You have: {props.maxValue.toFixed(5)} left for extraction</Paragraph>
            <View style={style.rowView}>
                <Input style={style.InputAmount} errorStyle={error ? {color: 'red'} : null} errorMessage={error ? errorMessage : null} 
                keyboardType="numeric" onChangeText={changeAmount} value={amount}/>
                <Text style={style.WalletText}>ETH</Text>
            </View>
            </>
            }
        </Dialog.Content>
        <Dialog.Actions>
            {!loading ? <>{checkout ?
            <Button onPress={extractMoney}>Confirm extraction</Button> : <Button onPress={proceedWithExtraction}>Confirm amount</Button>}
            <Button  onPress={checkout ? () => {cancel(); props.toggle()} : props.toggle}>{checkout ? "Cancel" : "Close"}</Button>
            </>
            :
            <Text>Processing your transaction</Text>}
        </Dialog.Actions>
    </Dialog>
    <ErrorSnackBar error={transactionResponse} onDismissSnackBar={onDismissSnackBar} text={withdrawMessage} success={withdrawStatus} />
    </>)
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