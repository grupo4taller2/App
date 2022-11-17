import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import { StyleSheet, View } from "react-native";
import { Text, Surface, TextInput, Button } from "react-native-paper";
import { UserNavConstants } from '../../config/userNavConstants';
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
    const isMounted = useRef(false);
    const [snackbar, setSnackbar] = useState(undefined);
    
    function attemptReviewSubmission() {
        if (userType == 'driver') {
          attemptDriverReview();
        }
        if (userType == 'passenger') {
          attemptPassengerReview();
        }
    }
  
    async function attemptDriverReview() {
        let url = `http://g4-fiuber.herokuapp.com/api/v1/drivers/qualy/create`;
        try {
            let validReview = await axios.post(url, {rider_username: sender, qualy: rating, opinion: review, driver_username: user}, token);
            setSnackbar('false');
        }
        catch (error) {
            setSnackbar('rating');
            console.warn(error);
        }
    }

    async function attemptPassengerReview() {
        let url = `http://g4-fiuber.herokuapp.com/api/v1/riders/qualy/create`;
        try {
            let validReview = await axios.post(url, {rider_username: user, qualy: rating, opinion: review, driver_username: sender}, token);
            setSnackbar('false');
        }
        catch (error) {
            setSnackbar('rating');
            console.warn(error);
        }
    }

    useEffect(() => {
        if (isMounted.current) {
            navigation.navigate(UserNavConstants.HomeScreen, {snackbar});
        }
        isMounted.current = true;
    }, [snackbar])

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
                    attemptReviewSubmission();}}>
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
