import * as React from 'react';
import { useEffect, useState, useRef } from 'react';
import MapView from 'react-native-maps';
import { PROVIDER_GOOGLE, Marker, Polyline } from 'react-native-maps';
import { SafeAreaView, StyleSheet, TouchableNativeFeedback, View, Dimensions, SliderComponent } from "react-native";
import { Text, Appbar, Avatar, Drawer, List, Menu, Surface, TextInput, Button, IconButton, Snackbar, Portal, Dialog, Paragraph } from "react-native-paper";
import Geocoder from 'react-native-geocoding';
import { getCurrentLocation } from '../../controler/getCurrentLocation';
import MapViewDirections from 'react-native-maps-directions';
import { UserNavConstants } from '../../config/userNavConstants';
import { useInterval } from '../../hooks/useInterval';
import BottomDrawer from 'react-native-bottom-drawer-view';
import * as Location from 'expo-location';
import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';
import { getHeader } from '../../model/status'
import { useUserContext } from '../components/context';
import axios from 'axios';


export default function OngoingJobScreen({route, navigation}) {
    const context = useUserContext();
    const token = getHeader(context);
    const {trip_info} = route.params;
    const [region, setRegion] = useState({
        latitude: 0.01,
        longitude: 0.01,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
    });
    const [remainingDistance, setRemainingDistance] = useState(trip_info.distance);
    const [remainingDuration, setRemainingDuration] = useState(trip_info.estimated_duration);
    const [currentLocation, setCurrentLocation] = useState({ latitude: trip_info.origin.latitude, longitude: trip_info.origin.longitude});
    const destination = { latitude: trip_info.destination.latitude, longitude: trip_info.destination.longitude};
    const [gpsDelay, setgpsDelay] = useState(5000);   // gps location polling delay (in ms)
    const [isRunning, setIsRunning] = useState(true);   // if set to false, component will stop polling (will be set to true once a driver has been assigned and the trip marked as started)
    const [driver, setDriver] = useState('driver_name');  // should start as undefined as soon as im done testing
    const [driverCar, setDriverCar] = useState('Corolla');  // should start as undefined as soon as im done testing
    const previousRouteValues = useRef({ remainingDistance, remainingDuration });
    const [visibleGeneralSB, setVisibleGeneralSB] = useState(false);
    const price = tripCost;
    const notRunning = 999999999999999;

    const TripState = {
        // NoDriverAssigned: "looking_for_driver", This state will never happen since once a job is taken it's state is set to "accepted_by_driver"
        WaitingOnDriver: "accepted_by_driver",
        DriverArrived: "driver_arrived",
        TripOngoing: "start_confirmed_by_driver",
        TripFinished: "finished"
    }
    

    const [tripState, setTripState] = useState(TripState.WaitingOnDriver);

    useEffect(() => {
      if (previousRouteValues.current.distance !== distance && previousRouteValues.current.duration !== duration)
        {
          previousRouteValues.current = { distance, duration };
        }
    });

    useInterval(async () => {
        try {
            let currentLoc = await Location.getCurrentPositionAsync({accuracy: Location.Accuracy.BestForNavigation});
            setCurrentLocation({latitude: currentLoc.coords.latitude, longitude: currentLoc.coords.longitude});
        }
        catch (error) {
            console.warn("Couldn't poll for gps location"); // may need to do a snackbar for this
        }
      }, tripState == TripState.TripOngoing ? gpsDelay : notRunning);
    

    const onToggleSnackBar = () => setVisibleGeneralSB(!visibleGeneralSB);

    const onDismissGeneralSnackBar = () => setVisibleGeneralSB(false);


    function renderContent() {
      switch (tripState) {
        case TripState.NoDriverAssigned:
          return (
            <View style={styles.bottomView}>
              <Text style={styles.bottomHeader}>Waiting on a driver to take your trip</Text>
              <Text>Make sure you don't move too far from your trip's starting area!</Text>
            </View>)
        case TripState.WaitingOnDriver:
          return (
            <View style={styles.bottomView}>
              <Text style={styles.bottomHeader}>A driver took your trip and is on the way</Text>
              <Text>Make sure you don't move too far from your trip's starting area!</Text>
              <Text>Your driver is {driver}!{'\n'}</Text>
              <Text>Trip's total distance: {remainingDistance}km</Text>
              <Text>Trip's estimated duration: {remainingDuration}mins</Text>
            </View>)
        case TripState.DriverArrived:
          return (
            <View style={styles.bottomView}>
              <Text style={styles.bottomHeader}>Your driver has arrived{'\n'}</Text>
              <Text>{driver} arrived at your starting location and is waiting on you.</Text>
              <Text>Their car is a {driverCar}{/*driverCar.color driverCar.manufacturer driverCar.model with plate driverCar.plate*/}.</Text> 
            </View>)
        case TripState.TripOngoing: 
          return (
            <View style={styles.bottomView}>
              <Text style={styles.bottomHeader}>Trip is on the way!</Text>
              <Text>Relax and enjoy your trip.{'\n'}</Text>
              <Text>Your driver is {driver}!</Text>
              <Text>Trip's remaining distance: {remainingDistance}km</Text>
              <Text>Trip's estimated remaining duration: {remainingDuration}mins</Text>
            </View>)
        case TripState.TripFinished:
          return (
            <View style={styles.bottomView}>
              <Text style={styles.bottomHeader}>Your trip's over!</Text>
              <Text>We hope you had a great trip.{'\n'}</Text>
              <Text>{tripCost} has been substracted from your wallet.{'\n'}</Text>
              <View style={styles.buttonsChoiceView}>
                <Button style={{width:220, marginBottom: 13}} labelStyle={{fontWeight: 'bold'}} buttonColor='#FFB22E' mode='contained' icon={'account-star'} onPress={() => {navigation.push(UserNavConstants.RatingScreen, {user: driver, userType: 'driver', sender: context.userState.userInfo.username})}}>Rate your driver</Button>
                <Button style={{width:220}} labelStyle={{fontWeight: 'bold'}} buttonColor='#37a0bd' mode='contained' icon={'home'} onPress={() => {navigation.push(UserNavConstants.HomeScreen)}}>Back to Home</Button>
              </View>
            </View>)
      }
    };
  
    const sheetRef = React.useRef(null);

    function debugState() {
      if (tripState == TripState.NoDriverAssigned) {setTripState(TripState.WaitingOnDriver)}
      if (tripState == TripState.WaitingOnDriver) {setTripState(TripState.DriverArrived)}
      if (tripState == TripState.DriverArrived) {setTripState(TripState.TripOngoing)}
      if (tripState == TripState.TripOngoing) {setTripState(TripState.TripFinished)}
      if (tripState == TripState.TripFinished) {setTripState(TripState.NoDriverAssigned)}
    }
  
    return (
      <>
        <MapView style={styles.map} 
        initialRegion={{
        latitude: currentLocation.latitude,
        longitude: currentLocation.longitude,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
        }}
        showsTraffic={true} showsCompass={true} showsBuildings={true} showsIndoors={true}
        onRegionChangeComplete={(region) => setRegion(region)}>
            <Button style={{width:150, position: 'absolute'}} buttonColor='white' mode='outlined' icon={'arrow-right-thick'} onPress={debugState}>Next State</Button>
            <Marker image={require('../../../resources/images/mapMarkers/tripStart4_256.png')} coordinate={currentLocation}/>
            <Marker image={require('../../../resources/images/mapMarkers/tripEnd1_128.png')} coordinate={destination}/>
            <MapViewDirections
                origin={currentLocation}
                destination={destination}
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
                <Text style={{fontWeight: 'bold', color: '#fff'}}>There was an error processing the route, we're sorry for the inconvenience.</Text>
            </Snackbar>
        </View>
        <BottomSheet
          ref={sheetRef}
          snapPoints={[250, 75]}
          borderRadius={30}
          renderContent={renderContent}
        />
      </>
    );
}


const styles = StyleSheet.create({
  mapView: {
      flex: 1,
  },
  map: {
      width: "100%",
      height: "100%"
  },
  infoView: {
      flex: 1,
      justifyContent: 'center',
      alignContent: 'center',
      position: 'absolute',
  },
  snackbar: {
      backgroundColor: '#D22B2B'
  },
  bottomView: {
    backgroundColor: 'white',
    padding: 16,
    height: 450
  },
  bottomHeader: {
    fontWeight: 'bold',
    fontSize: 22,
    marginBottom: 30,
  },
  buttonsChoiceView: {
    alignItems: 'center',
    justifyContent: 'space-evenly'
  }
})
