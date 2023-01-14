import { SafeAreaView, StyleSheet, TouchableNativeFeedback, View } from "react-native";
import { Avatar, Text } from "react-native-paper";
import Constants from 'expo-constants';
import ProfileTopView from "../composed/profileTopView";
import ProfileOptionsView from "../composed/ProfileOptionsView";
import ProfileInfoView from "../composed/profileInfoView";
import { useUserContext } from "../components/context";
import React from "react";

export default function Profile({navigation}){

    const {update} = useUserContext();
    const context = useUserContext();

    React.useEffect(() => {
        update()
    }, [])


    return (
        <View style={style.Mainview}>
            <SafeAreaView style={style.backView}>
                <TouchableNativeFeedback onPress={() => navigation.pop()}>
                    <Avatar.Icon style={style.backArrow} size={50} icon="chevron-left" />
                </TouchableNativeFeedback>
                <Text style={style.userText}>{context.userState.userInfo.username}</Text>
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
            flexDirection: 'row',
        },
        backArrow: {
            backgroundColor: "#fff",
            marginTop: Constants.statusBarHeight
        },
        userText: {
            alignSelf: 'center',
            fontWeight: 'bold',
            fontSize: 26,
            marginLeft: 10,
            marginTop: '7%',
        }
    }
)