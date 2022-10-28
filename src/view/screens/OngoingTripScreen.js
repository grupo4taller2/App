import { React, useEffect, useState, useRef } from 'react';
import MapView from 'react-native-maps';
import { PROVIDER_GOOGLE, Marker, Polyline } from 'react-native-maps';
import { SafeAreaView, StyleSheet, TouchableNativeFeedback, View, Dimensions, SliderComponent } from "react-native";
import { Text, Appbar, Avatar, Drawer, List, Menu, Surface, TextInput, Button, IconButton, Snackbar, Portal, Dialog, Paragraph } from "react-native-paper";
import Geocoder from 'react-native-geocoding';
import { Location } from 'expo';
import { getCurrentLocation } from '../../controler/getCurrentLocation';
import MapViewDirections from 'react-native-maps-directions';
import { UserNavConstants } from '../../config/userNavConstants';
import { useInterval } from '../../hooks/useInterval';
import BottomDrawer from 'react-native-bottom-drawer-view';


export default function OngoingTripScreen({route, navigation}){
    const {startMarker, destinationMarker, tripCost, distance, duration} = route.params;
    const [region, setRegion] = useState({
        latitude: 0.01,
        longitude: 0.01,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
    });
    const [remainingDistance, setRemainingDistance] = useState(distance);
    const [remainingDuration, setRemainingDuration] = useState(duration);
    const [currentLocation, setCurrentLocation] = useState(startMarker);
    const destination = destinationMarker;
    const [delay, setDelay] = useState(5000);   // gps location polling delay (in ms)
    const [isRunning, setIsRunning] = useState(false);   // if set to false, component will stop polling (will be set to true once a driver has been assigned and the trip marked as started)
    const previousRouteValues = useRef({ remainingDistance, remainingDuration });
    const [visibleGeneralSB, setVisibleGeneralSB] = useState(false);
    const price = tripCost;

    /*useInterval(() => {
        let currentLoc = {latitude: 0, longitude: 0};
        /*
        currentLoc = await axios.get(/locations/self);
        //
        setCurrentLocation(currentLoc);
      }, isRunning ? delay : null);
    */
    /*
    useEffect(() => {
        
    }, [currentLocation]);
    */

    const onToggleGeneralSnackBar = () => setVisibleGeneralSB(!visibleGeneralSB);

    const onDismissGeneralSnackBar = () => setVisibleGeneralSB(false);


    return(
        <View style={styles.mainView}>
            <View style={styles.mapView}>
                <MapView style={styles.map} 
                initialRegion={{
                latitude: currentLocation.lat,
                longitude: currentLocation.lng,
                latitudeDelta: 0.1,
                longitudeDelta: 0.1,
                }}
                showsTraffic={true} showsCompass={true} showsBuildings={true} showsIndoors={true}
                onRegionChangeComplete={(region) => setRegion(region)}>
                    <Marker image={require('../../../resources/images/mapMarkers/tripStart4_256.png')} coordinate={{latitude: currentLocation.lat, longitude: currentLocation.lng}}/>
                    <Marker image={require('../../../resources/images/mapMarkers/tripEnd1_128.png')} coordinate={{latitude: destination.lat, longitude: destination.lng}}/>
                    <MapViewDirections
                        origin={{latitude: currentLocation.lat, longitude: currentLocation.lng}}
                        destination={{latitude: destination.lat, longitude: destination.lng}}
                        apikey={'AIzaSyA3x-jiXBvirmGETpkD4WRXej17TfCqJ7o'}  // directions APIKey
                        strokeWidth={5}
                        strokeColor="red"
                        onReady={result => {
                            setRemainingDistance((result.distance).toFixed(2));
                            setRemainingDuration((result.duration).toFixed(1));
                        }}
                        onError={(errorMessage) => {
                            console.warn('Error while creating route: ' + errorMessage);
                            onToggleGeneralSnackBar();
                        }} />
                </MapView>
                <View style={styles.infoView}>
                    <Snackbar
                        visible={visibleGeneralSB}
                        onDismiss={onDismissGeneralSnackBar}
                        duration='2500'
                        style={styles.snackbar}>
                        <Text style={{fontWeight: 'bold', color: '#fff'}}>There was an error processing the route, try again later.</Text>
                    </Snackbar>
                    <BottomDrawer containerHeight={200}>
                        <View>
                            <Text>Currently waiting on a driver to take your trip</Text>
                        </View>
                    </BottomDrawer>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
    },
    mapView: {
        flex: 1,
    },
    map: {
        width: "100%",
        height: "100%"
    },
    infoView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
    },
    snackbar: {
        backgroundColor: '#D22B2B'
    },
})
