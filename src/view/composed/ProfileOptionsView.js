import { StyleSheet, TouchableNativeFeedback, View } from "react-native"
import { Avatar, Menu, Surface } from "react-native-paper"
import { ProfileOption } from "../components/ProfileOption"

export default function ProfileOptionsView(){
    return (
        <View style={style.privateOptions}>
                <ProfileOption icon="forum" text="messages" />
                <ProfileOption icon="wallet" text="wallet" />
                <ProfileOption icon="logout" text="Log out" />
                <ProfileOption icon="card-account-details" text="Become a driver" />
            </View>
    )
}


const style = StyleSheet.create(
    {
        privateOptions: {
            flex: 0.6,
            alignItems: "center",
            justifyContent: "center"
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