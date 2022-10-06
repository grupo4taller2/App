import * as React from 'react';
import MapView from 'react-native-maps';
import { SafeAreaView, StyleSheet, TouchableNativeFeedback, View, Dimensions } from "react-native";
import { Text, Appbar, Avatar, Drawer, List, Menu, Surface, TextInput, PROVIDER_GOOGLE } from "react-native-paper";

//In your code, import { PROVIDER_GOOGLE } from react-native-maps and add the property provider=PROVIDER_GOOGLE to your <MapView>. This property works on both iOS and Android.

export default function TripScreen({navigation}){
    return (
        <View style={styles.mainView}>
            <MapView style={styles.map} />
            <TextInput>
                Enter Location
            </TextInput>
        </View>
    )
}


const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        backgroundColor: '#fff',
        flexDirection: "column-reverse"
    },
    map: {
        width: "100%",
        height: "90%"
    },
})