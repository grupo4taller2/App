import { React, useState } from 'react';
import MapView from 'react-native-maps';
import Marker from 'react-native-maps';
import { SafeAreaView, StyleSheet, TouchableNativeFeedback, View, Dimensions } from "react-native";
import { Text, Appbar, Avatar, Drawer, List, Menu, Surface, TextInput, PROVIDER_GOOGLE, Button, IconButton } from "react-native-paper";
import Geocoder from 'react-native-geocoding';
import { Location } from 'expo';


//In your code, import { PROVIDER_GOOGLE } from react-native-maps and add the property provider=PROVIDER_GOOGLE to your <MapView>. This property works on both iOS and Android.

async function checkLocationValidity(location1, location2) {
    let geocodingAPIKey = "AIzaSyArMKi-b4wEAblYqFMF0B3XEc8nW9mZ9uE";
    Geocoder.init(geocodingAPIKey);
    Geocoder.from("Colosseum")
    .then(json => {
        var location = json.results[0].geometry.location;
        console.log(location);
    })
    .catch(error => console.warn(error));
}

export default function TripScreen({navigation}){
    const [start, setStart] = useState(''); // Aca se puede poner la locacion default del usuario si se la accede desde el contexto y tambien ponerla en el defaultValue del TextInput
    const [destination, setDestination] = useState('');
    const [region, setRegion] = useState({
        latitude: 51.5079145,
        longitude: -0.0899163,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
    });

    return (
        <View style={styles.mainView}>
            <View style={styles.mapView}>
                <MapView style={styles.map} 
                initialRegion={{
                latitude: -34.556,
                longitude: -58.449,
                latitudeDelta: 0.04,
                longitudeDelta: 0.04,
                }}
                showsTraffic={true} showsCompass={true} showsBuildings={true} showsIndoors={true}
                onRegionChangeComplete={(region) => setRegion(region)}>
                    {/*[DEBUG] Display user's current region:*/}
                    <View style={styles.debugInfoView}>
                        <Text style={styles.text}>Current latitude: {region.latitude}</Text>
                        <Text style={styles.text}>Current longitude: {region.longitude}</Text>
                        <Button buttonColor='#fff' style={styles.checkLocationButton} labelStyle={styles.checkLocationButtonLabel} contentStyle={styles.checkLocationButtonContent} icon="car"  onPress={() => {console.log('Pressed'), checkLocationValidity(start, destination).catch().then()}}>
                            Start Trip
                        </Button>
                    </View>
                </MapView>
            </View>
            <View style={styles.locationView}>
                <TextInput placeholder="Where are you?" onChangeText={newStart => setStart(newStart)} defaultValue={start}/>
                <TextInput placeholder="Where to?" onChangeText={newDestination => setDestination(newDestination)} defaultValue={destination}/>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        flexDirection: "column-reverse"
    },
    map: {
        width: "100%",
        height: "100%"
    },
    locationView: {
        flex: 1.5,
        height: "50%",
    },
    mapView: {
        flex: 8.5,
    },
    text: {
        color: "#000",
        fontWeight: 'bold',
        alignSelf: 'center'
    },
    checkLocationButton: {
    },
    checkLocationButtonContent: {
    },
    checkLocationButtonLabel: {
        color: '#000'
    },
    debugInfoView: {
        marginTop: 500,
        alignItems: 'center'
    },
})