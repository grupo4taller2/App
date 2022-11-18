import { StyleSheet, TouchableNativeFeedback, View } from "react-native"
import { Avatar, Menu, Surface } from "react-native-paper"
import { UserNavConstants } from "../../config/userNavConstants";
import { createStatusChanger } from "../../model/status";
import { useUserContext } from "../components/context";
import { ProfileOption } from "../components/ProfileOption"

export default function ProfileOptionsView({navigation}){

    const context = useUserContext();
    const signOut = context.signOut;
    const userState = context.userState;

    const failedLogOut = () => {
        console.log("Failed to log out")
      };
    
      const callBack = createStatusChanger(
        signOut, 
        null,
        null,
        failedLogOut
      )

    const driverCallback = userState.userInfo.driver_information ? () => navigation.push(UserNavConstants.DriverInfo): null;
    
    return (
        <View style={style.privateOptions}>
                <ProfileOption icon="account-search" text="Search Users" callback={() => {navigation.push(UserNavConstants.UserSearchScreen)}}/>
                <ProfileOption icon="wallet" text="Wallet" callback={() => navigation.push(UserNavConstants.WalletView)}/>
                <ProfileOption icon="logout" text="Log Out" callback={callBack}/>
                {driverCallback ? <ProfileOption icon="card-account-details" text="See Driver info" callback={driverCallback}/> : null}
            </View>
    )
}


const style = StyleSheet.create(
    {
        privateOptions: {
            flex: 0.45,
            alignItems: "center",
            justifyContent: 'space-evenly'
        },
        optionStyle: {
            flex: 0.2,
            minWidth: 350,
            margin: 5,
            backgroundColor: "#fff"
        },
        optionArrow: {
            backgroundColor: '#fff',
            position: 'absolute',
            right: 0
        },
        optionItem: {
            
        },
    }
)