import { SafeAreaView, StyleSheet, TouchableNativeFeedback, View } from 'react-native'
import { Avatar, Drawer, Text } from 'react-native-paper'
import Constants  from 'expo-constants'
import { useUserContext } from '../components/context'

export default function ProfileTopView(props){
    const context = useUserContext();
    const userState = props.isSearch ? props.result : context.userState;
    const isDriver = context.userState.userInfo.driver_information? true : false;
    const rating = calculateRating();
    const photo = userState.user.photoURL ? {uri: userState.user.photoURL} : require("../../../assets/no_pic.jpg");
    
    function calculateRating() {
        let rider_rating = context.userState.userInfo.rider_information.avg_rating;
        if (isDriver) { 
            let driver_rating = context.userState.userInfo.driver_information.avg_rating;
            if (driver_rating != -1 && rider_rating != -1) {
                return ((driver_rating + rider_rating)/2).toFixed(1);
            }
            if (driver_rating != -1) {
                return driver_rating;
            }
        }
        if (rider_rating != -1) { return rider_rating; }
        return 'No reviews yet';
    }

    return (
        <>
        <SafeAreaView style={style.ProfileView}>
                <View style={style.NameReviewView}>
                    <Text style={style.nameText}>{userState.userInfo.username}</Text>
                    <Drawer.Item style={style.stars} label={rating} icon="star" />
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
            flexDirection: 'row'
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