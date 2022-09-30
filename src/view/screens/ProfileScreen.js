import { SafeAreaView, StyleSheet, TouchableNativeFeedback, View } from "react-native";
import { Avatar, Drawer, List, Menu, Surface, Text } from "react-native-paper";
import Constants from 'expo-constants';

export default function Profile(){
    return (
        <View style={style.Mainview}>
            <SafeAreaView style={style.ProfileView}>
                <View style={style.NameReviewView}>
                <Text style={style.nameText}>Francisco Javier Pereira</Text>
                <Drawer.Item style={style.stars} label="4.8" icon="star" />
                </View>
                <View style={style.ProfilePict}>
                    <Avatar.Image style={{backgroundColor: "#f0efc0"}} size={60} source={require('../../../assets/fotoMira.jpg')}/>
                </View>
            </SafeAreaView>
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
            <View style={style.privateOptions}>
                <TouchableNativeFeedback>
                <Surface style={style.optionStyle} elevation={4}>
                    <Menu.Item leadingIcon="account" title="My account" style={style.optionItem}></Menu.Item>
                    <Avatar.Icon style={style.optionArrow} icon="chevron-right"/>
                </Surface>
                </TouchableNativeFeedback>
                <TouchableNativeFeedback>
                <Surface style={style.optionStyle} elevation={4}>
                    <Menu.Item leadingIcon="wallet" title="Wallet" style={style.optionItem}></Menu.Item>
                    <Avatar.Icon style={style.optionArrow} icon="chevron-right"/>               
                </Surface>
                </TouchableNativeFeedback>
                <TouchableNativeFeedback>
                <Surface style={style.optionStyle} elevation={4}>
                    <Menu.Item leadingIcon="help" title="Help" style={style.optionItem}></Menu.Item>
                    <Avatar.Icon style={style.optionArrow} icon="chevron-right"/>
                </Surface>
                </TouchableNativeFeedback>
                <TouchableNativeFeedback>
                <Surface style={style.optionStyle} elevation={4}>
                    <Menu.Item leadingIcon="card-account-details" title="Become a driver" style={style.optionItem}></Menu.Item>
                    <Avatar.Icon style={style.optionArrow} icon="chevron-right"/>
                </Surface>
                </TouchableNativeFeedback>
            </View>
        </View>
    )
}

const style = StyleSheet.create(
    {
        Mainview: {
            flex: 1,
            backgroundColor: "#f0efc0"
            
        },
        ProfileView: {
            flex: 0.1,
            
            justifyContent: "center",
            flexDirection: "row",
            
            paddingTop: Constants.statusBarHeight,
            margin: 0
        },
        PrivateView: {
            flex: 0.3
        },
        OptionsView: {
            flex: 1/2,
            flexDirection: "row",
            alignItems: "flex-start",
            justifyContent: "flex-start"
        },
        creditView: {
            flex: 1/3,
            position: 'absolute',
            bottom: 0,
            alignSelf: 'center'
        },
        privateOptions: {
            flex: 0.6,
            alignItems: "center",
            justifyContent: "center"
        },
        NameReviewView: {
            flex: 0.7,
        },
        ProfilePict: {
            flex: 0.3,
            justifyContent: 'center',
            alignItems: 'center'
        },
        nameText: {
            fontSize: 20,
            fontWeight: 'bold',
            alignSelf: 'center'
        },
        stars: {
            
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
        optionStyle: {
            flex: 0.2,
            minWidth: 350,
            margin: 5,
            backgroundColor: "#eaeaba"
        },

        optionArrow: {
            backgroundColor: '#eaeaba',
            position: 'absolute',
            right: 0
        },
        optionItem: {
            
        }
    }
)