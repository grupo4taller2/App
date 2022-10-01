import { SafeAreaView, StyleSheet, TouchableNativeFeedback, View } from 'react-native'
import { Avatar, Drawer, Text } from 'react-native-paper'
import Constants  from 'expo-constants'

export default function ProfileTopView({navigation}){


    return (
        <>
        <SafeAreaView style={style.ProfileView}>
                <View style={style.NameReviewView}>
                <Text style={style.nameText}>Francisco Javier Pereira</Text>
                <Drawer.Item style={style.stars} label="4.8" icon="star" />
                </View>
                <View style={style.ProfilePict}>
                    <Avatar.Image style={{backgroundColor: "#f0efc0"}} size={60} source={require('../../../assets/fotoMira.jpg')}/>
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
            alignSelf: 'center'
        },
        backArrow: {
            backgroundColor: "#f0efc0",
            marginTop: Constants.statusBarHeight
        }
    }
)