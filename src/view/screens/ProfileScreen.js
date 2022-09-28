import { StyleSheet, View } from "react-native";
import { Avatar, Drawer, Surface, Text } from "react-native-paper";
import Constants from 'expo-constants';

export default function Profile(){
    return (
        <View style={style.Mainview}>
            <View style={style.ProfileView}>
                <View style={style.NameReviewView}>
                <Text style={style.nameText}>Francisco Javier Pereira</Text>
                <Drawer.Item style={style.stars} label="4.8" icon="star" />
                </View>
                <View style={style.ProfilePict}>
                    <Avatar.Image style={{backgroundColor: "#f0efc0"}} size={60} source={require('../../../assets/fotoMira.jpg')}/>
                </View>
            </View>
            <View style={style.PrivateView}>
                <View style={style.OptionsView}>
                <Surface style={style.OptionSurface} elevation={5}>
                    <Text>Hello</Text>
                </Surface>
                <Surface style={style.OptionSurface} elevation={5}>
                    <Text>Hello</Text>
                </Surface>
                <Surface style={style.OptionSurface} elevation={5}>
                    <Text>Hello</Text>
                </Surface>
                </View>
            </View>
            <View style={style.privateOptions}>
                <Text>Cabify things</Text>
            </View>
        </View>
    )
}

const style = StyleSheet.create(
    {
        Mainview: {
            flex: 1,
            backgroundColor: "#f0efc0"
            
        },
        ProfileView: {
            flex: 0.1,
            
            justifyContent: "center",
            flexDirection: "row",
            
            paddingTop: Constants.statusBarHeight,
        },
        PrivateView: {
            flex: 0.4,
            borderWidth: 1,
        },
        OptionsView: {
            flexDirection: "row",
            alignItems: "flex-start",
            justifyContent: "flex-start",
            padding: 10
        },
        privateOptions: {
            flex: 0.5,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#9ae3bb"
        },
        NameReviewView: {
            flex: 0.7,
        },
        ProfilePict: {
            flex: 0.3,
            justifyContent: 'center',
            alignItems: 'center'
        },
        nameText: {
            fontSize: 20,
            fontWeight: 'bold',
            alignSelf: 'center'
        },
        stars: {
            
        },
        OptionSurface: {
            padding: 8,
            minHeight: 100,
            minWidth: 100,
            margin: 12,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: "#eaeaba"
          },

    }
)