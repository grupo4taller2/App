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
import OngoingTripScreen from './OngoingTripScreen';


//In your code, import { PROVIDER_GOOGLE } from react-native-maps and add the property provider=PROVIDER_GOOGLE to your <MapView>. This property works on both iOS and Android.

// NOTAS REUNION: COMO HACER FUNCIONAR <MapView.Marker> PARA QUE FUNCIONE LA APP EN ANDROID --- IN APP NOTIFICATIONS Y PUSH NOTIFS O SOLO PUSH NOTIFS? --- HACER
// navigation.navigate() EN VEZ DE navigation.push() PARA VENTANAS DE VIAJE EN CURSO DE PASAJERO Y CONDUCTOR PARA QUE NO PUEDAN SALIR DE ELLAS HASTA QUE TERMINE EL VIAJE Y
// QUE LA APP CHECKEE EL ESTADO context.user.state Y SI ES == travelling ENTONCES LA APP SE ABRE AUTOMATICAMENTE EN LAS RESPECTIVAS VENTANAS DE VIAJE --- COMO VERIFICAR SI
// UN VIAJE ESTA AVAILABLE (el back le attachea una trip_id? pero como hago el put inicial entonces?) --- CONDICIONES DE CARRERA PARA EL MARCADO DE TRIPS COMO 'available' --
// PUSH Y PUT DE AXIOS ESPERAN RESPONSE?
async function checkLocationValidity(location) {
    let geocodingAPIKey = "AIzaSyArMKi-b4wEAblYqFMF0B3XEc8nW9mZ9uE";    // geocoding APIKey
    Geocoder.init(geocodingAPIKey);
    try {
        let response = await Geocoder.from(location);
        var location_json = response.results[0].geometry.location;
        // console.log(response);
        // console.log(location_json);
        return location_json;
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
    const [visibleGeneralSB, setVisibleGeneralSB] = useState(false);
    const [visiblePaymentSB, setVisiblePaymentSB] = useState(false);
    const [confirmationDialog, setConfirmedDialog] = useState(false);
    const [startMarker, setStartMarker] = useState('');
    const [destinationMarker, setDestinationMarker] = useState('');
    const [distance, setDistance] = useState(undefined);    // measured in km
    const [duration, setDuration] = useState(undefined);    // measured in min
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

    const showConfirmationDialog = () => setConfirmedDialog(!confirmationDialog);

    const hideConfirmationDialog = () => setConfirmedDialog(false);

    async function checkTripValidity(start_location, destination_location) {
        let validityStart = await checkLocationValidity(start_location);
        let validityDest = await checkLocationValidity(destination_location);
        
        if (validityStart && validityDest) {
            console.log("Valid trip from: " + start_location + " to " + destination_location + ".");
            setStartMarker(validityStart);
            setDestinationMarker(validityDest);
            setValidTrip(true);
        }
        else {
            setValidTrip(false);
            onToggleSnackBar();
        }
    }

    async function updatePrice() {
        let tripPrice = distance * 0.2 + duration * 0.1;
        tripPrice = tripPrice.toFixed(3);
        tripPrice = tripPrice.toString() + " ETH";
        setTripCost(tripPrice);
    }

    async function executePayment(start, end, passenger, passenger_rating, totalDistance, totalDuration, cost) {
        /* 
        let payment = axios.put(/trips/newtrip?=${start},${end},${passenger},${passenger_rating},${totalDistance},${totalDuration},${cost})
        if (mandarPaymentABack) {
            let newTrip = {
            start: start,
            end: destination,
            passenger: context.user.name,
            passenger_rating: context.user.rating}
        */    return true
        /*
        }
        else return false
        */
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
                showsTraffic={true} showsCompass={true} showsBuildings={true} showsIndoors={true}
                onRegionChangeComplete={(region) => setRegion(region)}>
                    {validTrip == true &&
                        <Marker image={require('../../../resources/images/mapMarkers/tripStart4_256.png')} coordinate={{latitude: startMarker.lat, longitude: startMarker.lng}}/>
                    }
                    {validTrip == true &&
                        <Marker image={require('../../../resources/images/mapMarkers/tripEnd1_128.png')} coordinate={{latitude: destinationMarker.lat, longitude: destinationMarker.lng}}/>
                    }
                    {validTrip == true &&
                    <MapViewDirections
                        origin={{latitude: startMarker.lat, longitude: startMarker.lng}}
                        destination={{latitude: destinationMarker.lat, longitude: destinationMarker.lng}}
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
                                    () => {
                                        // let validPayment = executePayment(startMarker, destinationMarker, context.user.fullname, context.user.rating, distance, duration, tripCost);
                                        let validPayment = true;
                                        if (validPayment) {
                                            // context.user.state = travelling  // hay que hacer esto para que luego el stack, si el estado del user es travelling una vez se logee lo mande a esta pagina directo y una vez que termina el viaje debe cambiarse a {state = idle}
                                            navigation.push(UserNavConstants.OngoingTripScreen, {startMarker, destinationMarker, tripCost, distance, duration})}
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
                    {/*[DEBUG] Display user's current region:*/}
                    <Text style={styles.text}>Current latitude: {region.latitude}</Text>
                    <Text style={styles.text}>Current longitude: {region.longitude}</Text>
                    <Button buttonColor='#50C878' mode='contained' style={styles.checkLocationButton} labelStyle={styles.checkLocationButtonLabel} contentStyle={styles.checkLocationButtonContent}
                        icon="navigation-variant"  onPress={() => {checkTripValidity(start, destination)}}>
                        Set Route
                    </Button>
                    <Button buttonColor='#000' mode='contained' style={styles.startTripButton} labelStyle={styles.startTripButtonLabel} contentStyle={styles.startTripButtonContent}
                        icon="car" disabled={!validTrip} onPress={() => {showConfirmationDialog()}}>
                        Start Trip for {tripCost}
                    </Button>
                    <Snackbar
                        visible={visibleSB}
                        onDismiss={onDismissSnackBar}
                        duration='2500'
                        style={styles.snackbar}>
                        <Text style={{fontWeight: 'bold', color: '#fff'}}>Invalid route. Check start and destination!</Text>
                    </Snackbar>
                    <Snackbar
                        visible={visibleGeneralSB}
                        onDismiss={onDismissGeneralSnackBar}
                        duration='2500'
                        style={styles.snackbar}>
                        <Text style={{fontWeight: 'bold', color: '#fff'}}>There was an error processing the route, try again later.</Text>
                    </Snackbar>
                    <Snackbar
                        visible={visiblePaymentSB}
                        onDismiss={onDismissPaymentSnackBar}
                        duration='2500'
                        style={styles.snackbar}>
                        <Text style={{fontWeight: 'bold', color: '#fff'}}>There was an error processing your payment, make sure your wallet address is valid and try again.</Text>
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
        marginBottom: 550,                             
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


