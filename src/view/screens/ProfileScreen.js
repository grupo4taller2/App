import { SafeAreaView, StyleSheet, TouchableNativeFeedback, View } from "react-native";
import { Appbar, Avatar, Drawer, List, Menu, Surface, Text } from "react-native-paper";
import Constants from 'expo-constants';
import ProfileTopView from "../composed/profileTopView";
import WalletView from "../composed/walletView";
import ProfileOptionsView from "../composed/ProfileOptionsView";

export default function Profile({navigation}){
    return (
        <View style={style.Mainview}>
            <ProfileTopView />
            
            <ProfileOptionsView />
        </View>
    )
}

const style = StyleSheet.create(
    {
        Mainview: {
            flex: 1,
            backgroundColor: "#f0efc0"
            
        }
    }
)