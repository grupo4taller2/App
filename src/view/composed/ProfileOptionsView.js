import { StyleSheet, TouchableNativeFeedback, View } from "react-native"
import { Avatar, Menu, Surface } from "react-native-paper"
import { UserNavConstants } from "../../config/userNavConstants";
import { createStatusChanger } from "../../model/status";
import { useUserContext } from "../components/context";
import { ProfileOption } from "../components/ProfileOption"

export default function ProfileOptionsView({navigation}){

    const {signOut} = useUserContext();

    const failedLogOut = () => {
        console.log("Failed to log out")
      };
    
      const callBack = createStatusChanger(
        signOut, 
        null,
        null,
        failedLogOut
      )


    return (
        <View style={style.privateOptions}>
                <ProfileOption icon="account-search" text="search users" callback={() => {console.log("Clicked"); navigation.push(UserNavConstants.UserSearchScreen)}}/>
                <ProfileOption icon="wallet" text="wallet" callback={() => navigation.push(UserNavConstants.WalletView)}/>
                <ProfileOption icon="logout" text="Log out" callback={callBack}/>
                <ProfileOption icon="card-account-details" text="Become a driver" />
            </View>
    )
}


const style = StyleSheet.create(
    {
        privateOptions: {
            flex: 0.4,
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