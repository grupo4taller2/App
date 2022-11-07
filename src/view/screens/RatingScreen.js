import * as React from 'react';
import { useEffect, useState, useRef } from 'react';
import MapView from 'react-native-maps';
import { PROVIDER_GOOGLE, Marker, Polyline } from 'react-native-maps';
import { SafeAreaView, StyleSheet, TouchableNativeFeedback, View, Dimensions, SliderComponent, Keyboard, TouchableWithoutFeedback } from "react-native";
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
import StarRating from 'react-native-star-rating-widget';


export default function RatingScreen({route, navigation}) {
    const context = useUserContext();
    const token = getHeader(context);
    const {user, userType, sender} = route.params;
    const [rating, setRating] = useState(-1);
    const [review, setReview] = useState("");
    
    function attemptReviewSubmission() {
        if (userType == 'driver') {
          console.log({passenger_username: sender, qualy: rating, opinion: review, driver_username: user});
          attemptDriverReview();
        }
        if (userType == 'passenger') {
          attemptPassengerReview();
        }
    }
  
    async function attemptDriverReview() {
        let url = 'http://g4-fiuber.herokuapp.com/api/v1/drivers/qualy/create';
        try {
            let validReview = await axios.post(url, {passenger_username: sender, qualy: rating, opinion: review, driver_username: user}, token);
        }
        catch (error) {
            console.warn(error);    // Not showing error to client since it shouldn't be a dealbreaker for them if a review is successfully submitted or not
        }
    }

    async function attemptDriverReview() {
        let url = 'http://g4-fiuber.herokuapp.com/api/v1/passengers/qualy/create';
        try {
            let validReview = await axios.post(url, {passenger_username: user, qualy: rating, opinion: review, driver_username: sender}, token);
        }
        catch (error) {
            console.warn(error);    // Not showing error to client since it shouldn't be a dealbreaker for them if a review is successfully submitted or not
        }
    }

    return(
        <View style={styles.mainView}>
            <View style={styles.headerView}>
                <Text style={{fontWeight: '500', fontSize: 32}}>Tell us about your trip with your {userType}, {user} </Text>
            </View>
            <View style={styles.starsView}>
                <Surface style={styles.starsSurface}>
                    <StarRating style={{alignItems: 'center'}} rating={rating} onChange={setRating}/>
                </Surface>
            </View>
            <View style={styles.reviewView}>
            <TextInput
                style={styles.reviewBox}
                mode="outlined"
                placeholder={`Write something about your ${userType} (optional)`}
                selectionColor={'black'}
                underlineColor={'black'}
                activeUnderlineColor={'black'}
                outlineColor={'black'}
                activeOutlineColor={'black'}
                value={review}
                onChangeText={text => setReview(text)}
                multiline={true}
                blurOnSubmit={true}
            />
            </View>
            <View style={styles.buttonView}>
                <Button style={{width:300}} labelStyle={{fontWeight: 'bold'}} buttonColor='#37a0bd' disabled={rating === -1} icon="home" mode="contained" onPress={() => {
                    attemptReviewSubmission();
                    navigation.navigate(UserNavConstants.HomeScreen)}}>
                    Submit review and go back to Home
                </Button>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        padding: 40,
        backgroundColor: '#fff'
    },
    headerView: {
        marginTop: 30,
        flex: 1,
    },
    starsView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    starsSurface: {
        alignItems: 'center',
        padding: 10,
        borderRadius: 100
    },
    reviewView: {
        flex: 1,
        justifyContent: 'center',
    },
    reviewBox: {
        width: '100%',
        height: '100%',
    },
    buttonView: {
        flex: 1.5,
        justifyContent: 'center',
        alignItems: 'center'
    },
})
