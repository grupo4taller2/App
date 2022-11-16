import { SafeAreaView, StyleSheet, TouchableNativeFeedback, View } from "react-native"
import { Avatar, Surface, Text } from "react-native-paper"
import Constants from "expo-constants";
import React from "react";
import UserWallet from "../components/WalletAddress";
import MoneyExtraction from "../components/ExtractPopup";
import { useUserContext } from "../components/context";
import { extract, getWallet } from "../../model/wallet";

export default function WalletView({navigation}){

    const context = useUserContext();

    const {userState} = context;

    const [visibleAddress, setVisibleAddress] = React.useState(false);
    const [visibleExtraction, setVisibleExtraction] = React.useState(false);

    const [loading, setLoading] = React.useState(false);

    const [balance, setBalance] = React.useState('');
    const [address, setAddress] = React.useState('');
    const [unclaimed, setUnclaimed] = React.useState(0);

    const toggleAddress = () => {setVisibleAddress(!visibleAddress)}

    const toggleExtraction = () => {setVisibleExtraction(!visibleExtraction)}

    const showScreen = !visibleAddress && !visibleExtraction;

    const extractionCheckout = async (amount, destination) => {
        await extract(context, amount, destination)
    }

    const loadWalletInfo = async () => {
        setLoading(true);
        
        try{    
            const walletInfo = await getWallet(isDriver(userState.userInfo), context);
            setAddress(walletInfo.walletAddres);
            setBalance(walletInfo.balance + " ETH");
            setUnclaimed(walletInfo.unclaimed);
            
        }catch (error){
            setAddress("Error retrieving address");
            setBalance("Could not retrieve your balance");
        }
        setLoading(false);
    }

    React.useEffect(() => {
        loadWalletInfo()}, []);

    return (
        <>
        <UserWallet visible={visibleAddress} toggle={toggleAddress} wallet={address}/>
        <MoneyExtraction visible={visibleExtraction} toggle={toggleExtraction} maxValue={unclaimed} extractionCheckout={extractionCheckout}/>
        {showScreen && <>
        <SafeAreaView style={[style.PrivateView, {flex: 0.1}]}>
            <TouchableNativeFeedback onPress={() => navigation.pop()}>
                <Avatar.Icon style={style.backArrow} size={50} icon="chevron-left" />
            </TouchableNativeFeedback>
        </SafeAreaView>
        <View style={style.PrivateView}>
                
                <View style={style.OptionsView}>
                    <TouchableNativeFeedback onPress={toggleAddress}>
                <Surface style={style.OptionSurface} elevation={5}>
                    <Avatar.Icon style={{backgroundColor: "#fff"}} size={40} icon="import" />
                    <Text>Deposit</Text>
                </Surface>
                </TouchableNativeFeedback>
                {
                    isDriver(userState.userInfo) &&

                <TouchableNativeFeedback onPress={toggleExtraction}>
                <Surface style={style.OptionSurface} elevation={5}>
                    <Avatar.Icon style={{backgroundColor: "#fff"}} size={40} icon="export" />
                    <Text>Withdraw</Text>
                </Surface>
                </TouchableNativeFeedback>
                }
                </View>
                <View style={style.creditView}>
                    <Surface style={style.CreditSurface} elevation={5}>
                    <View style={{minWidth: 250, flexDirection: 'row', justifyContent: 'center'}}>
                        <Text style={{fontSize: 20}}>Total balance</Text>
                        <TouchableNativeFeedback onPress={loadWalletInfo}>
                        <Avatar.Icon style={{backgroundColor: "#fff", marginLeft: 20}}  size={35} icon="reload"/>
                        </TouchableNativeFeedback>
                    </View>
                    <Text style={[style.nameText, {margin: 10}]}>
                        {loading ? "Loading..." : balance}
                        </Text>
                    </Surface>
                    {isDriver(userState.userInfo) ? 
                    <Surface style={style.CreditSurface} elevation={5}>
                    <View style={{minWidth: 250, flexDirection: 'row', justifyContent: 'center'}}>
                        <Text style={{fontSize: 20}}>Unclaimed earnings</Text>
                        <TouchableNativeFeedback onPress={loadWalletInfo}>
                        <Avatar.Icon style={{backgroundColor: "#fff", marginLeft: 20}}  size={35} icon="reload"/>
                        </TouchableNativeFeedback>
                    </View>
                    <Text style={[style.nameText, {margin: 10}]}>
                        {loading ? "Loading..." : unclaimed.toFixed(5) + ' ETH'}
                        </Text>
                    </Surface>
                 : null}
                </View>
                
            </View>
            </>
            }
            </>
    )
}

function isDriver(userInfo){
    
    return userInfo.driver_information;
}

const style = StyleSheet.create(
    {
        PrivateView: {
            flex: 0.9,
            backgroundColor: "#fff",
            
        },
        OptionsView: {
            flex: 1/5,
            flexDirection: "row",
            alignItems: "flex-start",
            justifyContent: "center"
        },
        OptionSurface: {
            padding: 8,
            flex: 1/2,
            minHeight: 100,
            margin: 12,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: "#fff"
          },
        CreditSurface: {
            
            maxWidth: "80%",
            padding: 8,
            margin: 8,
            alignItems: 'center',
            justifyContent: 'center',
            alignSelf: "center",
            backgroundColor: "#fff"
        },
        creditView: {
            flex: 1/2,
            
            alignSelf: 'center'
        },
        nameText: {
            fontSize: 20,
            alignSelf: 'center'
        },
        backArrow: {
            backgroundColor: "#fff",
            marginTop: Constants.statusBarHeight
        }
    }
)