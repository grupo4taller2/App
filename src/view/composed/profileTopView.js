import { SafeAreaView, StyleSheet, TouchableNativeFeedback, View } from 'react-native'
import { Avatar, Drawer, Text } from 'react-native-paper'
import Constants  from 'expo-constants'
import { useUserContext } from '../components/context'

export default function ProfileTopView(props){
    const context = useUserContext();
    const userState = props.isSearch ? props.result : context.userState;
    const photo = userState.user.photoURL ? {uri: userState.user.photoURL} : require("../../../assets/no_pic.jpg");
    
    return (
        <>
        <SafeAreaView style={style.ProfileView}>
                <View style={style.NameReviewView}>
                <Text style={style.nameText}>{userState.userInfo.username}</Text>
                <Drawer.Item style={style.stars} label="4.8" icon="star" />
                </View>
                <View style={style.ProfilePict}>
                    <Avatar.Image style={{backgroundColor: "#f0efc0"}} size={60} source={photo}/>
                </View>
        </SafeAreaView>
        </>
    )

}


const style = StyleSheet.create(
    {
        ProfileView: {
            flex: 0.1,
            
            justifyContent: "center",
            flexDirection: "row",
            marginTop: Constants.statusBarHeight,
            margin: 0
        },
        NameReviewView: {
            flex: 0.7,
        },
        ProfilePict: {
            flex: 0.3,
            justifyContent: 'center',
            alignItems: 'center'
        },
        stars: {
            
        },
        nameText: {
            fontSize: 20,
            fontWeight: 'bold',
            marginLeft: 20
        },
        backArrow: {
            backgroundColor: "#f0efc0",
            marginTop: Constants.statusBarHeight
        }
    }
)