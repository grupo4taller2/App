import { SafeAreaView, StyleSheet, TouchableNativeFeedback, View } from "react-native";
import { Appbar, Avatar, Drawer, List, Menu, Surface, Text } from "react-native-paper";
import Constants from 'expo-constants';
import ProfileTopView from "../composed/profileTopView";
import WalletView from "../composed/walletView";
import ProfileOptionsView from "../composed/ProfileOptionsView";
import ProfileInfoView from "../composed/profileInfoView";
import { useUserContext } from "../components/context";
import React from "react";

export default function Profile({navigation}){

    const {update} = useUserContext();

    React.useEffect(() => {
        console.log("Called this one");
        update()
    }, [])


    return (
        <View style={style.Mainview}>
            <SafeAreaView style={style.backView}>
            <TouchableNativeFeedback onPress={() => navigation.pop()}>
                <Avatar.Icon style={style.backArrow} size={50} icon="chevron-left" />
            </TouchableNativeFeedback>
        </SafeAreaView>
            <ProfileTopView />
            <ProfileInfoView />
            <ProfileOptionsView navigation={navigation}/>
        </View>
    )
}

const style = StyleSheet.create(
    {
        Mainview: {
            flex: 1,
            backgroundColor: "#fff"
        },
        backView: {
            flex: 0.1,
            backgroundColor: "#fff",
        },
        backArrow: {
            backgroundColor: "#fff",
            marginTop: Constants.statusBarHeight
        }
    }
)