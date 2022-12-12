import { SafeAreaView, StyleSheet, TouchableNativeFeedback, View } from 'react-native'
import { Avatar, Drawer, Text } from 'react-native-paper'
import Constants  from 'expo-constants'
import { useUserContext } from '../components/context'

export default function ProfileTopView(props){
    const context = useUserContext();
    const userState = props.isSearch ? props.result : context.userState;
    const isSearch = props.isSearch ? true : false;
    const isDriver = context.userState.userInfo.driver_information? true : false;
    const rider_rating = context.userState.userInfo.rider_information.avg_rating;  
    const driver_rating = isDriver ? context.userState.userInfo.driver_information.avg_rating : 0;
    const photo = userState.user.photoURL ? {uri: userState.user.photoURL} : require("../../../assets/no_pic.jpg");
    
    function calculateRating(rating) {
        if (rating != -1) { return rating; }    // -1 symbolizes 'no reviews' in backend
        return 'No reviews yet';
    }

    return (
        <>
        {isSearch && <Text style={style.nameText}>{userState.userInfo.username}</Text>}
        <SafeAreaView style={style.ProfileView}>
                <View style={style.NameReviewView}>
                    <View style={style.reviewStars}>
                        {<Text style={style.ratingText}>Passenger: ★ {calculateRating(rider_rating)}</Text>}
                        {isDriver && <Text>Driver: ★ {calculateRating(driver_rating)}</Text>}
                    </View>
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
            margin: 0,
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
            fontSize: 26,
            fontWeight: 'bold',
            marginLeft: '20%',
            marginTop: '10%',
            position: 'absolute',
        },
        backArrow: {
            backgroundColor: "#f0efc0",
            marginTop: Constants.statusBarHeight
        },
        reviewStars: {
            flex: 1,
            justifyContent: 'center',
            marginLeft: '10%',
            justifyContent: 'space-evenly'
        },
        ratingText: {

        }
    }
)
