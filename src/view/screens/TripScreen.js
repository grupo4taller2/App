import { React, useEffect, useState, useRef } from 'react';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import { StyleSheet, View, Platform } from "react-native";
import { Text, TextInput, Button, Snackbar, Dialog, Paragraph } from "react-native-paper";
import MapViewDirections from 'react-native-maps-directions';
import { UserNavConstants } from '../../config/userNavConstants';
import axios from 'axios';
import { useUserContext } from '../components/context';
import * as Location from 'expo-location';
import { getHeader } from "../../model/status";
import { max } from 'react-native-reanimated';
import { PROVIDER_GOOGLE } from 'react-native-maps';


//In your code, import { PROVIDER_GOOGLE } from react-native-maps and add the property provider=PROVIDER_GOOGLE to your <MapView>. This property works on both iOS and Android.


export default function TripScreen({navigation}){
    const context = useUserContext();
    const token = getHeader(context);
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
    const [clickedRoute, setClickedRoute] = useState(false);
    const [fetchingPrice, setFetchingPrice] = useState(false);
    const [visibleSB, setVisibleSB] = useState(false);
    const [visibleGeneralSB, setVisibleGeneralSB] = useState(false);
    const [visiblePaymentSB, setVisiblePaymentSB] = useState(false);
    const [visiblePriceSB, setVisiblePriceSB] = useState(false);
    const [visiblePermissionsSB, setVisiblePermissionsSB] = useState(false);
    const [confirmationDialog, setConfirmationDialog] = useState(false);
    const [startMarker, setStartMarker] = useState('');
    const [destinationMarker, setDestinationMarker] = useState('');
    const [distance, setDistance] = useState(undefined);    // measured in km
    const [duration, setDuration] = useState(undefined);    // measured in min
    const [tripType, setTripType] = useState("regular");
    const previousRouteValues = useRef({ distance, duration });

    useEffect(() => {
        if (previousRouteValues.current.distance !== distance && previousRouteValues.current.duration !== duration)
          {
            updatePrice();
            previousRouteValues.current = { distance, duration };
          }
    });

    const onToggleSnackBar = () => setVisibleSB(!visibleSB);

    const onDismissSnackBar = () => setVisibleSB(false);

    const onToggleGeneralSnackBar = () => setVisibleGeneralSB(!visibleGeneralSB);

    const onDismissGeneralSnackBar = () => setVisibleGeneralSB(false);

    const onTogglePaymentSnackBar = () => setVisiblePaymentSB(!visiblePaymentSB);

    const onDismissPaymentSnackBar = () => setVisiblePaymentSB(false);

    const onTogglePriceSnackBar = () => setVisiblePriceSB(!visiblePriceSB);

    const onDismissPriceSnackBar = () => setVisiblePriceSB(false);

    const onTogglePermissionsSnackBar = () => setVisiblePermissionsSB(!visiblePermissionsSB);

    const onDismissPermissionsSnackBar = () => setVisiblePermissionsSB(false);

    const showConfirmationDialog = () => setConfirmationDialog(!confirmationDialog);

    const hideConfirmationDialog = () => setConfirmationDialog(false);

    async function checkLocationValidity(location) {
        let url = 'http://g4-fiuber.herokuapp.com/api/v1/locations/search/';
        try {
            let response = await axios.get(url, {headers: token.headers, params: {address: location}});
            return response.data;
        }
        catch(error) {
            console.warn(error.response);
            return false;
        }
    }

    async function checkTripValidity(start_location, destination_location) {
        setClickedRoute(true);
        let validityStart = await checkLocationValidity(start_location);
        let validityDest = await checkLocationValidity(destination_location);
        
        if (validityStart != false && validityDest != false) {
            let newStart = {latitude: validityStart.latitude, longitude: validityStart.longitude};
            let newDest = {latitude: validityDest.latitude, longitude: validityDest.longitude};
            setStartMarker(newStart);
            setDestinationMarker(newDest);
            setValidTrip(true);
        }
        else {
            setValidTrip(false);
            onToggleSnackBar();
        }
        setClickedRoute(false);
    }

    async function updatePrice() {
        setFetchingPrice(true);
        let url = 'http://g4-fiuber.herokuapp.com/api/v1/trips/price';
        try {
            let newPrice = await axios.get(url, {headers: token.headers, params: {origin_address: start, destination_address: destination, trip_type: tripType}});
            newPrice = Number(newPrice.data.estimated_price);
            newPrice = newPrice.toFixed(3);
            newPrice = newPrice.toString() + " ETH";
            setTripCost(newPrice);
            setFetchingPrice(false);
        }
        catch(error) {
            console.warn(error);
            onTogglePriceSnackBar();
            setFetchingPrice(false);
        }
    }

    async function startTrip(passenger) {
        let url = 'http://g4-fiuber.herokuapp.com/api/v1/trips';
        try {
            let validStart = await axios.post(url, {rider_username: passenger, rider_origin_address: start, rider_destination_address: destination, trip_type: tripType}, token);
            return validStart;
        }
        catch (error) {
            console.warn(error);
            return false;
        }
    }

    async function getGPSPermissions() {
        let permissions = await Location.requestForegroundPermissionsAsync();

        if (!permissions.granted) {
            onTogglePermissionsSnackBar();
            return;
        }
        showConfirmationDialog();
    }

    async function enoughWalletBalance(tripCost) {
        let username = context.userState.userInfo.username;
        let url = `http://g4-fiuber.herokuapp.com/api/v1/payments/${username}/wallet`;
        let max_transaction_cost = 0.0002;

        try {
            let hasEnough = await axios.get(url, {headers: token.headers});
            let tripValue = tripCost.substring(0, tripCost.indexOf(' '));
            
            hasEnough = hasEnough.data.balance >= (Number(tripValue) + max_transaction_cost);
            if (hasEnough == true) { return hasEnough }
        }
        catch (error) {
            console.warn(error);
        }
        onTogglePaymentSnackBar();
        return false;
    }

    return (
        <View style={styles.mainView}>
            <View style={styles.mapView}>
                <MapView style={styles.map} 
                initialRegion={{
                latitude: -34.6363,      // Estaria bueno que tanto la latitud como la longitud empiezen en la
                longitude: -58.4322,     // locacion default de la persona, si se trae en el contexto solo habria que meterla en el Geocoder y parsear la latitud y longitud de la response 
                latitudeDelta: 0.3,
                longitudeDelta: 0.3,
                }}
                showsCompass={true} showsBuildings={true} showsIndoors={true}
                onRegionChangeComplete={(region) => setRegion(region)}
                >
                    {validTrip == true && 
                        <Marker image={require('../../../resources/images/mapMarkers/tripStart4_256.png')} coordinate={startMarker}/>
                    }
                    {validTrip == true && 
                        <Marker image={require('../../../resources/images/mapMarkers/tripEnd1_128.png')} coordinate={destinationMarker}/>
                    }
                    {validTrip == true &&
                    <MapViewDirections
                        origin={startMarker}
                        destination={destinationMarker}
                        apikey={'AIzaSyA3x-jiXBvirmGETpkD4WRXej17TfCqJ7o'}  // directions APIKey
                        strokeWidth={5}
                        strokeColor="red"
                        onReady={result => {
                            setDistance((result.distance).toFixed(2));
                            setDuration((result.duration).toFixed(1));
                        }}
                        onError={(errorMessage) => {
                            console.warn('Error while creating route: ' + errorMessage);
                            onToggleGeneralSnackBar();
                        }} />
                    }
                </MapView>
                <View style={styles.buttonView}>
                    <Button style={styles.backButton} contentStyle={styles.backButtonContent} labelStyle={styles.backButtonLabel} buttonColor='white' mode='outlined' icon={'arrow-left-thick'} onPress={() => {navigation.pop()}}>
                        Go Back
                    </Button>
                </View>
                <Dialog style={styles.dialogBox} visible={confirmationDialog} onDismiss={hideConfirmationDialog}>
                        <Dialog.Title>Trip Start Confirmation</Dialog.Title>
                        <Dialog.Content>
                            <Paragraph>Are you sure you want to confirm your trip from {start} to {destination} ({distance} km, ETA: {duration} min) for {tripCost}</Paragraph>
                        </Dialog.Content>
                        <Dialog.Actions>
                            <View style={styles.confirmationButtonsView}>
                                <Button buttonColor='#32a852' mode='outlined' style={styles.confirmButton} contentStyle={styles.confirmButtonContent} labelStyle={styles.confirmButtonLabel}
                                onPress={
                                    async () => {
                                        let enoughBalance = await enoughWalletBalance(tripCost);
                                        if (enoughBalance) {
                                            let validStart = await startTrip(context.userState.userInfo.username);
                                            if (validStart != false) {
                                                let trip_id = validStart.data.trip_id;
                                                // context.user.state = travelling  // hay que hacer esto para que luego el stack, si el estado del user es travelling una vez se logee lo mande a esta pagina directo y una vez que termina el viaje debe cambiarse a {state = idle}
                                                navigation.navigate(UserNavConstants.OngoingTripScreen, {startMarker, destinationMarker, tripCost, distance, duration, trip_id});
                                            }
                                        }
                                        else {onTogglePaymentSnackBar()}
                                    }}>
                                        Yes, let's start my trip
                                    </Button>
                                <Button buttonColor='#cc3d55' mode='outlined' style={styles.denyButton} contentStyle={styles.denyButtonContent} labelStyle={styles.denyButtonLabel}
                                onPress={hideConfirmationDialog}>No, take me back</Button>
                            </View>
                        </Dialog.Actions>
                    </Dialog>
                <View style={styles.infoView}>
                    {/*[DEBUG] Display user's current region:
                    <Text style={styles.text}>Current latitude: {region.latitude}</Text>
                    <Text style={styles.text}>Current longitude: {region.longitude}</Text>
                    */}
                    <Button buttonColor='#50C878' mode='contained' loading={clickedRoute} style={styles.checkLocationButton} labelStyle={styles.checkLocationButtonLabel} contentStyle={styles.checkLocationButtonContent}
                        icon="navigation-variant"  onPress={() => {checkTripValidity(start, destination)}}>
                        Set Route
                    </Button>
                    <Button buttonColor='#000' mode='contained' loading={fetchingPrice} style={styles.startTripButton} labelStyle={styles.startTripButtonLabel} contentStyle={styles.startTripButtonContent}
                        icon="car" disabled={!validTrip} onPress={async () => { if (await enoughWalletBalance(tripCost)) { getGPSPermissions() }}}>
                        Start Trip for {tripCost}
                    </Button>
                    <Snackbar
                        visible={visibleSB}
                        onDismiss={onDismissSnackBar}
                        duration={2500}
                        style={styles.snackbar}>
                        <Text style={{fontWeight: 'bold', color: '#fff'}}>Invalid route. Check start and destination!</Text>
                    </Snackbar>
                    <Snackbar
                        visible={visiblePriceSB}
                        onDismiss={onDismissPriceSnackBar}
                        duration={2500}
                        style={styles.snackbar}>
                        <Text style={{fontWeight: 'bold', color: '#fff'}}>There was an error processing the price of your trip, try again later.</Text>
                    </Snackbar>
                    <Snackbar
                        visible={visibleGeneralSB}
                        onDismiss={onDismissGeneralSnackBar}
                        duration={2500}
                        style={styles.snackbar}>
                        <Text style={{fontWeight: 'bold', color: '#fff'}}>There was an error processing the route, try again later.</Text>
                    </Snackbar>
                    <Snackbar
                        visible={visiblePaymentSB}
                        onDismiss={onDismissPaymentSnackBar}
                        duration={2500}
                        style={styles.snackbar}>
                        <Text style={{fontWeight: 'bold', color: '#fff'}}>It seems your wallet doesn't have enough ETH to make pay for this trip, make sure to charge some more money into it and try again.</Text>
                    </Snackbar>
                    <Snackbar
                        visible={visiblePermissionsSB}
                        onDismiss={onDismissPermissionsSnackBar}
                        duration={2500}
                        style={styles.snackbar}>
                        <Text style={{fontWeight: 'bold', color: '#fff'}}>GPS permissions were denied, make sure to enable them to proceed with your trip.</Text>
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
        flex: 9.5,
        alignItems: 'center',
        flexDirection: "column-reverse",
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
    infoView: {
        flex: 1,
        width: '90%',
        alignItems: 'center',
        position: 'absolute',
        marginBottom: 10
    },
    snackbar: {
        backgroundColor: '#D22B2B'
    },
    buttonView: {
        flex: 1,
        alignSelf: 'flex-start',
        position: 'absolute',
    },
    backButton: {     
        marginLeft: 15,
        marginBottom: '140%',                             
    },
    backButtonContent: {
    },
    backButtonLabel: {
        color: '#888888'
    },
    dialogBox: {
        
    },
    confirmButton: {
        borderColor: 'black'
    },
    confirmButtonContent: {

    },
    confirmButtonLabel: {
        color: '#fff',
        fontWeight: 'bold'
    },
    denyButton: {
        borderColor: 'black',
        marginTop: 5
    },
    denyButtonContent: {

    },
    denyButtonLabel: {
        color: '#fff',
        fontWeight: 'bold'
    },
    confirmationButtonsView: {
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        justifyContent: 'space-evenly'
    }
})




    /*
    
    NOTA: Este codigo sirve para hacer la parte de armado de rutas de una manera mas cruda, haciendo la request HTTP directo a la API y desmenuzando la respuesta para conseguir
    el polyline que haga display a la ruta requerida, lo mantengo aca por las dudas ya que por ahora lo hacemos con MapViewDirections.

    import {Polyline as Poli} from '@mapbox/polyline';

    async function getDirections(startLoc, destinationLoc) {
        console.log(startLoc);
        console.log(destinationLoc);
        //console.log(coords);
        try {
            var polyline = require('@mapbox/polyline');
            let resp = await fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${ startLoc }&destination=${ destinationLoc }&key=AIzaSyA3x-jiXBvirmGETpkD4WRXej17TfCqJ7o`)
            let respJson = await resp.json();
            let encoded_polyline = respJson.routes[0].overview_polyline.points.toString();
            let points = polyline.decode(encoded_polyline, 5);
            let coordis = points.map((point, index) => {
                return  {
                    latitude : point[0],
                    longitude : point[1]
                }
            })
            this.setCoords(coordis);
            console.log("Post fetch:");
            //console.log(resp);
            //console.log(respJson);
            //console.log(points);
            console.log(coordis);
            return coordis
        } catch(error) {
            alert(error)
            return error
        }
    }
    

    useEffect(() => {
        //getDirections((startMarker.latitude).toString() + ', ' (startMarker.longitude).toString() , (destinationMarker.latitude).toString() + ', ' (destinationMarker.longitude).toString());
        getDirections("-34.5523782, -58.45627210000001", "-34.5482229, -58.4558864");
    }, [])
    */


