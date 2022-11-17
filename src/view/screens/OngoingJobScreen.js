import * as React from 'react';
import { useEffect, useState, useRef } from 'react';
import MapView from 'react-native-maps';
import { PROVIDER_GOOGLE, Marker, Polyline } from 'react-native-maps';
import { SafeAreaView, StyleSheet, TouchableNativeFeedback, View, Dimensions, SliderComponent } from "react-native";
import { Text, Appbar, Avatar, Drawer, List, Menu, Surface, TextInput, Button, IconButton, Snackbar, Portal, Dialog, Paragraph } from "react-native-paper";
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


function inProximity(firstCoords, secondCoords, allowedError) {
  let latitudeDelta;
  let longitudeDelta;
  if ((firstCoords.latitude > 0 && secondCoords.latitude < 0) || (firstCoords.latitude < 0 && secondCoords.latitude > 0)) {
    latitudeDelta = firstCoords.latitude + secondCoords.latitude;
  }
  else {  // if both latitudes have the same sign
    latitudeDelta = firstCoords.latitude - secondCoords.latitude;
  }
  if ((firstCoords.longitude > 0 && secondCoords.longitude < 0) || (firstCoords.longitude < 0 && secondCoords.longitude > 0)) {
    longitudeDelta = firstCoords.longitude + secondCoords.longitude;
  }
  else {  // if both longitudes have the same sign
    longitudeDelta = firstCoords.longitude - secondCoords.longitude;
  
  }
  let latitudeResult = latitudeDelta <= allowedError;
  let longitudeResult = longitudeDelta <= allowedError;
  return (latitudeResult && longitudeResult)
}


export default function OngoingJobScreen({route, navigation}) {
    const context = useUserContext();
    const token = getHeader(context);
    const {trip_info, location} = route.params;
    const [region, setRegion] = useState({
        latitude: 0.01,
        longitude: 0.01,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
    });
    const [remainingDistance, setRemainingDistance] = useState(trip_info.distance);
    const [remainingDuration, setRemainingDuration] = useState(trip_info.estimated_duration);
    const [currentLocation, setCurrentLocation] = useState(location);
    const origin = trip_info.origin;
    const destination = trip_info.destination;
    const [gpsDelay, setgpsDelay] = useState(5000);   // gps location polling delay (in ms)
    const passenger = trip_info.rider_username;
    const driver = trip_info.driver.username;
    const trip_id = trip_info.trip_id;
    const previousRouteValues = useRef({ remainingDistance, remainingDuration });
    const [visibleGeneralSB, setVisibleGeneralSB] = useState(false);
    const [visiblePassengerProximitySB, setVisiblePassengerProximitySB] = useState(false);
    const [visibleDestinationProximitySB, setVisibleDestinationProximitySB] = useState(false);
    const [visibleUnexpectedSB, setVisibleUnexpectedSB] = useState(false);
    const pay = Number(trip_info.estimated_price).toFixed(3);
    const notRunning = 999999999999999;
    const allowedProximityError = 0.5;   // 0.0005 ~= 55.5 m

    const TripState = {
        // NoDriverAssigned: "looking_for_driver", This state will never happen since once a job is taken it's state is set to "accepted_by_driver"
        WaitingOnDriver: "accepted_by_driver",
        DriverArrived: "driver_arrived",
        TripOngoing: "start_confirmed_by_driver",
        TripFinished: "finished_confirmed_by_driver"
    }
    

    const [tripState, setTripState] = useState(TripState.WaitingOnDriver);

    useEffect(() => {
      if (previousRouteValues.current.remainingDistance !== remainingDistance && previousRouteValues.current.remainingremainingDurationDistance !== remainingDuration)
        {
          previousRouteValues.current = { remainingDistance, remainingDuration };
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
      }, tripState !== TripState.TripFinished ? gpsDelay : notRunning);
    

    const onToggleGeneralSnackBar = () => setVisibleGeneralSB(!visibleGeneralSB);

    const onDismissGeneralSnackBar = () => setVisibleGeneralSB(false);

    const onTogglePassengerProximitySnackBar = () => setVisiblePassengerProximitySB(!visiblePassengerProximitySB);

    const onDismissPassengerProximitySnackBar = () => setVisiblePassengerProximitySB(false);

    const onToggleDestinationProximitySnackBar = () => setVisibleDestinationProximitySB(!visibleDestinationProximitySB);

    const onDismissDestinationProximitySnackBar = () => setVisibleDestinationProximitySB(false);

    const onToggleUnexpectedSnackBar = () => setVisibleUnexpectedSB(!visibleUnexpectedSB);

    const onDismissUnexpectedSnackBar = () => setVisibleUnexpectedSB(false);


    async function notifyArrival() {
      let newState = TripState.DriverArrived;
      if (!inProximity(currentLocation, origin, allowedProximityError)) {onTogglePassengerProximitySnackBar()}
      else {
        try {
          let url = `http://g4-fiuber.herokuapp.com/api/v1/trips/${trip_id}`;

          let trip_information = await axios.patch(url, {id: trip_id, trip_state: newState, driver_username: driver, driver_current_latitude: currentLocation.latitude,
          driver_current_longitude: currentLocation.longitude}, token);
          if (JSON.parse(trip_information.config.data).trip_state == newState) { setTripState(newState) }  // if statement may be unnecessary
        }
        catch(error) {
          console.warn(error);
          onToggleUnexpectedSnackBar();
        }
      }
    }

    async function startTrip() {
      let newState = TripState.TripOngoing;
      try {
        let url = `http://g4-fiuber.herokuapp.com/api/v1/trips/${trip_id}`;

        let trip_information = await axios.patch(url, {id: trip_id, trip_state: newState, driver_username: driver, driver_current_latitude: currentLocation.latitude,
        driver_current_longitude: currentLocation.longitude}, token);
        if (JSON.parse(trip_information.config.data).trip_state == newState) { setTripState(newState) }  // if statement may be unnecessary
      }
      catch(error) {
        console.warn(error);
        onToggleUnexpectedSnackBar();
      }
    }

    async function finishTrip() {
      let newState = TripState.TripFinished;
      if (!inProximity(currentLocation, destination, allowedProximityError)) {onToggleDestinationProximitySnackBar()}
      else {
        try {
          let payment_url = `http://g4-fiuber.herokuapp.com/api/v1/payments/create/payment`;
          let string_pay = String(pay);
          console.log(string_pay);
          console.log({tripID: trip_id, amount: string_pay, driver_username: driver, rider_username: passenger});
          let trip_payment = await axios.post(payment_url, {tripID: trip_id, amount: string_pay, driver_username: driver, rider_username: passenger}, token);

          let url = `http://g4-fiuber.herokuapp.com/api/v1/trips/${trip_id}`;
          let trip_information = await axios.patch(url, {id: trip_id, trip_state: newState, driver_username: driver, driver_current_latitude: currentLocation.latitude,
          driver_current_longitude: currentLocation.longitude}, token);

          if (JSON.parse(trip_information.config.data).trip_state == newState) { setTripState(newState) }  // if statement may be unnecessary
        }
        catch(error) {
          console.warn(error);
          onToggleUnexpectedSnackBar();
        }
      }
    }

    function renderSnackbar() {
      return(
        <View style={styles.infoView}>
            <Snackbar
                visible={visibleGeneralSB}
                onDismiss={onDismissGeneralSnackBar}
                duration='2500'
                style={styles.snackbar}>
                <Text style={{fontWeight: 'bold', color: '#fff'}}>There was an error processing the route, {'\n'}we're sorry for the inconvenience.</Text>
            </Snackbar>
            <Snackbar
                visible={visiblePassengerProximitySB}
                onDismiss={onDismissPassengerProximitySnackBar}
                duration='2500'
                style={styles.snackbar}>
                <Text style={{fontWeight: 'bold', color: '#fff'}}>You're not close enough to the passenger, {'\n'}get closer to their map marker.</Text>
            </Snackbar>
            <Snackbar
                visible={visibleDestinationProximitySB}
                onDismiss={onDismissDestinationProximitySnackBar}
                duration='2500'
                style={styles.snackbar}>
                <Text style={{fontWeight: 'bold', color: '#fff'}}>You're not close enough to the destination, {'\n'}get closer to it's map marker.</Text>
            </Snackbar>
            <Snackbar
                visible={visibleUnexpectedSB}
                onDismiss={onDismissUnexpectedSnackBar}
                duration='2500'
                style={styles.snackbar}>
                <Text style={{fontWeight: 'bold', color: '#fff'}}>Unexpected error ocurred, please try again.</Text>
            </Snackbar>
        </View>
      );
    }

    function renderContent() {
      switch (tripState) {
        case TripState.WaitingOnDriver:
          return (
            <View style={styles.bottomView}>
              <Text style={styles.bottomHeader}>Your passenger is waiting on you!</Text>
              <Text>Drive towards the starting marker (stickman) on your map.</Text>
              <Text>Your passenger is '{passenger}'.</Text>
              <Text>They're waiting at {origin.address}.{'\n'}</Text>
              <Text>Distance to passenger: {remainingDistance} km</Text>
              <Text>ETA to passenger:: {remainingDuration} mins</Text>
              <Text>Trip's pay: {pay} ETH{'\n'}</Text>
              <View style={styles.buttonStateView}>
                <Button style={{width:220}} labelStyle={{fontWeight: 'bold'}} buttonColor='#37a0bd' mode='contained' icon={'account-alert'} onPress={async () => {await notifyArrival()}}>Notify arrival</Button>
              </View>
              {renderSnackbar()}
            </View>)
        case TripState.DriverArrived:
          return (
            <View style={styles.bottomView}>
              <Text style={styles.bottomHeader}>Wait on {passenger} to get in</Text>
              <Text>{'\n'}{passenger} has been notified about your arrival.</Text>
              <Text>Once they're in your car and ready to go you can start the trip.{'\n'}</Text>
              <View style={styles.buttonStateView}>
                <Button style={{width:220}} labelStyle={{fontWeight: 'bold'}} buttonColor='#37a0bd' mode='contained' icon={'car-traction-control'} onPress={() => {startTrip()}}>Start Trip</Button>
              </View>
              {renderSnackbar()}
            </View>)
        case TripState.TripOngoing: 
          return (
            <View style={styles.bottomView}>
              <Text style={styles.bottomHeader}>Trip is on the way!</Text>
              <Text>We hope you enjoy your trip.{'\n'}</Text>
              <Text>Your passenger is {passenger}!</Text>
              <Text>Trip's remaining distance: {remainingDistance}km</Text>
              <Text>Trip's estimated remaining duration: {remainingDuration}mins</Text>
              <Text>Trip's pay: {pay} ETH{'\n'}</Text>
              <View style={styles.buttonStateView}>
                <Button style={{width:220}} labelStyle={{fontWeight: 'bold'}} buttonColor='#37a0bd' mode='contained' icon={'flag-checkered'} onPress={() => {finishTrip()}}>Finish Trip</Button>
              </View>
              {renderSnackbar()}
            </View>)
        case TripState.TripFinished:
          return (
            <View style={styles.bottomView}>
              <Text style={styles.bottomHeader}>Your job's over!</Text>
              <Text>We hope you had a great trip.{'\n'}</Text>
              <Text>{pay} ETH (minus a small transaction fee) has been added to your wallet.{'\n'}</Text>
              <View style={styles.buttonsChoiceView}>
                <Button style={{width:220, marginBottom: 13}} labelStyle={{fontWeight: 'bold'}} buttonColor='#FFB22E' mode='contained' icon={'account-star'} onPress={() => {navigation.navigate(UserNavConstants.RatingScreen, {user: passenger, userType: 'passenger', sender: context.userState.userInfo.username})}}>Rate your passenger</Button>
                <Button style={{width:220}} labelStyle={{fontWeight: 'bold'}} buttonColor='#37a0bd' mode='contained' icon={'home'} onPress={() => {navigation.navigate(UserNavConstants.HomeScreen)}}>Back to Home</Button>
              </View>
              {renderSnackbar()}
            </View>)
      }
    };

    function renderRoute() {
      if (tripState == TripState.WaitingOnDriver) {
        return(
          <MapViewDirections
              origin={currentLocation}
              destination={origin}
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
        )
      }
      if (tripState == TripState.TripOngoing) {
        return(
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
        )
      }
    }
  
    const sheetRef = React.useRef(null);

    function debugState() {
      if (tripState == TripState.WaitingOnDriver) {setTripState(TripState.DriverArrived)}
      if (tripState == TripState.DriverArrived) {setTripState(TripState.TripOngoing)}
      if (tripState == TripState.TripOngoing) {setTripState(TripState.TripFinished)}
      if (tripState == TripState.TripFinished) {setTripState(TripState.WaitingOnDriver)}
    }
  
    return (
      <>
        <MapView style={styles.map} 
        initialRegion={{
        latitude: origin.latitude,
        longitude: origin.longitude,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
        }}
        showsTraffic={true} showsCompass={true} showsBuildings={true} showsIndoors={true}
        onRegionChangeComplete={(region) => setRegion(region)}>
            <Button style={{width:150}} buttonColor='white' mode='outlined' icon={'arrow-right-thick'} onPress={debugState}>Next State</Button>
            <Marker image={require('../../../resources/images/mapMarkers/driver_128.png')} coordinate={currentLocation}/>
            {((tripState == TripState.WaitingOnDriver) || (tripState == TripState.DriverArrived)) && <Marker image={require('../../../resources/images/mapMarkers/tripStart4_256.png')} coordinate={origin}/>}
            <Marker image={require('../../../resources/images/mapMarkers/tripEnd1_128.png')} coordinate={destination}/>
            {renderRoute()}
        </MapView>
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
      backgroundColor: '#D22B2B',
      position: 'absolute'
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
  buttonStateView: {
    alignItems: 'center',
    justifyContent: 'space-evenly'
  },
  buttonsChoiceView: {
    alignItems: 'center',
    justifyContent: 'space-evenly'
  }
})
