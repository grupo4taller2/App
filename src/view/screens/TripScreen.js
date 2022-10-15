import { React, useState } from 'react';
import MapView from 'react-native-maps';
import Marker from 'react-native-maps';
import { SafeAreaView, StyleSheet, TouchableNativeFeedback, View, Dimensions, SliderComponent } from "react-native";
import { Text, Appbar, Avatar, Drawer, List, Menu, Surface, TextInput, PROVIDER_GOOGLE, Button, IconButton, Snackbar } from "react-native-paper";
import Geocoder from 'react-native-geocoding';
import { Location } from 'expo';
import { getCurrentLocation } from '../../controler/getCurrentLocation';


//In your code, import { PROVIDER_GOOGLE } from react-native-maps and add the property provider=PROVIDER_GOOGLE to your <MapView>. This property works on both iOS and Android.

async function checkLocationValidity(location) {
    let geocodingAPIKey = "AIzaSyArMKi-b4wEAblYqFMF0B3XEc8nW9mZ9uE";
    Geocoder.init(geocodingAPIKey);
    try {
        let response = await Geocoder.from(location);
        var location_json = response.results[0].geometry.location;
        console.log(location_json);
        return true;
    } catch (error) {   // will enter here if location is invalid
        console.warn(error);
        return false;
    }
}


export default function TripScreen({navigation}){
    const [start, setStart] = useState(''); // Aca se puede poner la locacion default del usuario si se la accede desde el contexto y tambien ponerla en el defaultValue del TextInput
    const [destination, setDestination] = useState('');
    const [region, setRegion] = useState({
        latitude: 0.01,
        longitude: 0.01,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
    });
    const [validTrip, setValidTrip] = useState(undefined);
    const [tripCost, setTripCost] = useState("0 ETH");
    const [visibleSB, setVisibleSB] = useState(false);
    const [confirmedRoute, setConfirmedRoute] = useState(false);


    const onToggleSnackBar = () => {setVisibleSB(!visibleSB); console.log("holis")}

    const onDismissSnackBar = () => setVisibleSB(false);

    async function checkTripValidity(start_location, destination_location) {
        let validity1 = await checkLocationValidity(start_location);
        let validity2 = await checkLocationValidity(destination_location);
        
        if (validity1 && validity2) {
            console.log("Valid trip from: " + start_location + " to " + destination_location + ".");
            setValidTrip(true);
            // tripPrice = getPriceFromBack();
            // setTripCost(tripPrice);
        }
        else {
            setValidTrip(false);
            console.log(visibleSB);
            onToggleSnackBar();
        }
    }

    
    return (
        <View style={styles.mainView}>
            <View style={styles.mapView}>
                <MapView style={styles.map} 
                initialRegion={{
                latitude: -34.556,      // Estaria bueno que tanto la latitud como la longitud empiezen en la
                longitude: -58.449,     // locacion default de la persona, si se trae en el contexto solo habria que meterla en el Geocoder y parsear la latitud y longitud de la response 
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
                }}
                showsTraffic={true} showsCompass={true} showsBuildings={true} showsIndoors={true}
                onRegionChangeComplete={(region) => setRegion(region)}>
                </MapView>
                {/*[DEBUG] Display user's current region:*/}
                <View style={styles.debugInfoView}>
                    <Text style={styles.text}>Current latitude: {region.latitude}</Text>
                    <Text style={styles.text}>Current longitude: {region.longitude}</Text>
                    <Button buttonColor='#50C878' mode='contained' style={styles.checkLocationButton} labelStyle={styles.checkLocationButtonLabel} contentStyle={styles.checkLocationButtonContent}
                        icon="navigation-variant"  onPress={() => {console.log('Pressed'), checkTripValidity(start, destination)}}>
                        Set Route
                    </Button>
                    <Button buttonColor='#000' mode='contained' style={styles.startTripButton} labelStyle={styles.startTripButtonLabel} contentStyle={styles.startTripButtonContent}
                        icon="car" disabled={!validTrip} onPress={() => {/*//startTrip();  aca returnear el componente OngoingTripScreen, va realmente habria que hacer una
                        checkbox para que el usuario vea el costo y valide el viaje*/}}>
                        Start Trip for {tripCost}
                    </Button>
                    <Snackbar
                        visible={visibleSB}
                        onDismiss={onDismissSnackBar}
                        duration='2000'
                        style={styles.snackbar}>
                        Invalid route. Check start and destination!
                    </Snackbar>
                </View>
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
        flexDirection: 'column-reverse',
        alignItems: 'center',
        marginBottom: 10
    },
    text: {
        color: "#000",
        fontWeight: 'bold',
        alignSelf: 'center'
    },
    checkLocationButton: {
        marginBottom: 5
    },
    checkLocationButtonContent: {
    },
    checkLocationButtonLabel: {
        color: '#fff'
    },
    startTripButton: {
    },
    startTripButtonContent: {
    },
    startTripButtonLabel: {
        color: '#fff'
    },
    debugInfoView: {
        alignItems: 'center',
        position: 'absolute'
    },
    snackbar: {
        backgroundColor: '#D22B2B'
    },
})