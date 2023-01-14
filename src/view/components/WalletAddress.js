import React from "react";
import { StyleSheet } from "react-native";
import { Button, Dialog, Paragraph, Surface, Text } from "react-native-paper";
import * as Clipboard from 'expo-clipboard';
import ErrorSnackBar from "./ErrorSnackBar";


export default function UserWallet(props){
       
    const [copied, setCopied] = React.useState(false);
    

    const onDismissSnackBar = () => {
        setCopied(!copied);
    }

    const setStringAsync = async () => {
        await Clipboard.setStringAsync(props.wallet);
        setCopied(true);
    }
    
    return (
    <>
    <Dialog visible={props.visible}>
        <Dialog.Title>Wallet address</Dialog.Title>
        <Dialog.Content>
            <Paragraph>Deposit USDC on this wallet to get more credit</Paragraph>
            <Surface style={style.surface}>
                    <Text style={style.WalletText} selectable={true}>{props.wallet}</Text>
            </Surface>
        </Dialog.Content>
        <Button style={style.ClipboardButton} icon="clipboard" onPress={setStringAsync}></Button>
        <Dialog.Actions>
            <Button  onPress={props.toggle}>Close</Button>
        </Dialog.Actions>
    </Dialog>
    <ErrorSnackBar error={copied} onDismissSnackBar={onDismissSnackBar} text="Wallet address copied to clipboard!" success={true} />
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
            position: "absolute",
            left: 0,
            fontSize: 11,
            marginHorizontal: 10
        },

        ClipboardButton: {
            position: "absolute",
            left: 0,
            bottom: 25,
            marginHorizontal: 10, 
        }
    }
)