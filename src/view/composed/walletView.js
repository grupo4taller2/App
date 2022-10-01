import { StyleSheet, TouchableNativeFeedback, View } from "react-native"
import { Avatar, Surface, Text } from "react-native-paper"

export default function WalletView(){
    return (
        <View style={style.PrivateView}>
                <View style={style.OptionsView}>
                    <TouchableNativeFeedback>
                <Surface style={style.OptionSurface} elevation={5}>
                    <Avatar.Icon style={{backgroundColor: "#eaeaba"}} size={40} icon="import" />
                    <Text>Deposit</Text>
                </Surface>
                </TouchableNativeFeedback>
                <TouchableNativeFeedback>
                <Surface style={style.OptionSurface} elevation={5}>
                    <Avatar.Icon style={{backgroundColor: "#eaeaba"}} size={40} icon="export" />
                    <Text>Withdraw</Text>
                </Surface>
                </TouchableNativeFeedback>
                </View>
                <View style={style.creditView}>
                    <Surface style={style.CreditSurface} elevation={5}>
                    <View style={{minWidth: 250, flexDirection: 'row', justifyContent: 'center'}}>
                        <Text style={{fontSize: 20}}>Total balance</Text>
                        <TouchableNativeFeedback>
                        <Avatar.Icon style={{backgroundColor: "#eaeaba", marginLeft: 20}}  size={35} icon="eye"/>
                        </TouchableNativeFeedback>
                    </View>
                    <Text style={[style.nameText, {margin: 10}]}>45.78 USD</Text>
                    </Surface>
                </View>
            </View>
    )
}



const style = StyleSheet.create(
    {
        PrivateView: {
            flex: 0.3
        },
        OptionsView: {
            flex: 1/2,
            flexDirection: "row",
            alignItems: "flex-start",
            justifyContent: "flex-start"
        },
        OptionSurface: {
            padding: 8,
            flex: 1/2,
            minHeight: 100,
            margin: 12,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: "#eaeaba"
          },
        CreditSurface: {
            
            maxWidth: "80%",
            padding: 8,
            alignItems: 'center',
            justifyContent: 'center',
            alignSelf: "center",
            backgroundColor: "#eaeaba"
        },
        creditView: {
            flex: 1/3,
            position: 'absolute',
            bottom: 0,
            alignSelf: 'center'
        },
        nameText: {
            fontSize: 20,
            alignSelf: 'center'
        },
    }
)