import { React, useState, useEffect, useRef } from 'react';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import Marker, { Polyline } from 'react-native-maps';
import { SafeAreaView, StyleSheet, TouchableNativeFeedback, View, Dimensions, SliderComponent, ScrollView } from "react-native";
import { Text, Appbar, Avatar, Drawer, List, Menu, Surface, TextInput, Button, IconButton, Snackbar, Portal, Dialog, Paragraph, TouchableRipple } from "react-native-paper";
import Geocoder from 'react-native-geocoding';
import { Location } from 'expo';
import { getCurrentLocation } from '../../controler/getCurrentLocation';
import MapViewDirections from 'react-native-maps-directions';
import { UserNavConstants } from '../../config/userNavConstants';
import { useInterval } from '../../hooks/useInterval';
import { useUserContext } from '../components/context';
import { getHeader } from '../../model/status';
import axios from 'axios';


export default function AvailableJobsScreen({navigation}){
    const context = useUserContext();
    const token = getHeader(context);
    const [jobs, setJobs] = useState([]);
    const [delay, setDelay] = useState(5000);   // job list polling delay (in ms)
    const [visibleGeneralSB, setVisibleGeneralSB] = useState(false);

    const onToggleGeneralSnackBar = () => setVisibleGeneralSB(!visibleGeneralSB);

    const onDismissGeneralSnackBar = () => setVisibleGeneralSB(false);

    
    useInterval(() => {
        console.log(jobs);
        // hardcoded list for now
        let listOfJobs = [{
            trip_id: 4443,
            origin: { 
                address: 'Paseo Colon 850',
            },
            destination: {
                address: 'Av. Cabildo 4200',
            },
            rider_username: 'John Doe',
            trip_type: 'regular',
            rider_rating: '4.1',
            distance: '31.42 km',
            estimated_time: '34.7 mins',
            timestamp: "2022-10-31T18:29:34.829Z",
            trip_state: "waiting_for_driver",
            estimated_price: '6,43'
        },
        {
            trip_id: 4444,
            origin: { 
                address: 'Av. Libertador 7000',
            },
            destination: {
                address: 'Av. Cabildo 1400',
            },
            rider_username: 'Mary Sue',
            trip_type: 'regular',
            rider_rating: '3.6',
            distance: '17.63 km',
            estimated_time: '24.3 mins',
            timestamp: "2022-10-31T18:34:33.829Z",
            trip_state: "driver_waiting",
            trip_state: "waiting_for_driver",
            estimated_price: '4,31'
        },
        {
            trip_id: 4445,
            origin: { 
                address: 'Av. Monroe 2000',
            },
            destination: {
                address: 'Paseo Colon 850',
            },
            rider_username: 'Paul Smith',
            trip_type: 'regular',
            rider_rating: '1.8',
            distance: '33.11 km',
            estimated_time: '29.8 mins',
            timestamp: "2022-10-31T18:11:53.829Z",
            trip_state: "waiting_for_driver",
            estimated_price: '3,92'
        },];
        /*
        let url = 'http://g4-fiuber.herokuapp.com/api/v1/trips';
        let username = context.userState.userInfo.username;
        let desired_state = "looking_for_driver";

        let listOfJobs = await axios.get(url, {headers: token.headers, params: {driver_username: username, trip_state: desired_state, offset: 0, limit: 25}});
        */
        setJobs(listOfJobs);
      }, delay);

    // checks if a certain job (by id) is available and attempts to mark is as taken
    async function isJobAvailable(id) {
        let url = `http://g4-fiuber.herokuapp.com/api/v1/trips/${id}`;

        try {
            let trip_info = await axios.patch(url, {trip_state: 'accepted_by_driver'}, token);
            if (trip_info.trip_state == 'looking_for_driver') { return trip_info }
        }
        catch(error) {
            return false
        }
        return false;
    }

      
    function renderJobList() {
        if (jobs.length) {
            return(
                jobs.map(({ origin, destination, rider_username, rider_rating, distance, estimated_time, estimated_price, trip_id }) => (
                    <List.Item
                        style={styles.jobItem}
                        titleStyle={styles.jobItemTitle}
                        descriptionStyle={styles.jobItemDescription}
                        title={`From: ${origin.address} to: ${destination.address}`}
                        titleNumberOfLines={3}
                        description={`(${distance}, ETA: ${estimated_time})\nPassenger: ${rider_username} (${rider_rating} ★)`}
                        descriptionNumberOfLines={3}
                        right={props => <Text style={{alignSelf: 'center', fontWeight: 'bold'}}>{estimated_price} ETH</Text>}
                        onPress={() => {
                            let job = isJobAvailable(trip_id)
                            if (job !== false) {
                                // context.userState.currentState = 'travelling';
                                // navigation.navigate(UserNavConstants.OngoingJobScreen, {trip_info: job})
                            }
                            else {
                                onToggleGeneralSnackBar()
                            }
                        }}
                    />
            )))
    }}


    return(
        <View style={styles.mainView}>
            <View style={styles.headerView}>
                <Appbar.Header style={{backgroundColor: "#fff"}}>
                    <Appbar.BackAction style={{backgroundColor: "#fff"}} onPress={() => {navigation.pop()}} />
                </Appbar.Header>
                <View style={styles.textView}>
                    <Text style={styles.instructionText}>
                        Here's a list of currently available jobs 
                    </Text>
                    <Text style={styles.instructionTextLower}>
                        (Press one that you'd like to take)
                    </Text>
                </View>
            </View>

            <ScrollView style={styles.jobsView}>
                {renderJobList()}
            </ScrollView>
            <Snackbar
                visible={visibleGeneralSB}
                onDismiss={onDismissGeneralSnackBar}
                duration='2500'
                style={styles.snackbar}>
                <Text style={{fontWeight: 'bold', color: '#fff'}}>There was an error while trying to assign you to that job, wait and try later.</Text>
            </Snackbar>
        </View>
    )
}

const styles = StyleSheet.create({
    mainView: {
        flex: 1,        
    },
    headerView: {
        flex: .3,
        flexDirection: 'row',
        backgroundColor: "#fff",
        borderBottomColor: '#000',
        borderBottomWidth: 0.3,
        paddingBottom: 5,
    },
    textView: {
        marginRight: 5,
        flexShrink: 1
    },
    instructionText: {
        color: 'black',
        fontWeight: '500',
        fontSize: 24,
        paddingTop: 75,
        marginBottom: 5
    },
    instructionTextLower: {
        color: 'black',
        fontWeight: '400',
        fontSize: 18,
    },
    jobsView: {
        flex: 10,        
        backgroundColor: '#fff'
    },
    jobItem: {
        borderBottomColor: '#000',
        borderBottomWidth: 0.3,
        backgroundColor: '#efefef'
    },
    jobItemTitle: {
        fontSize: 20,
    },
    jobItemDescription: {
        fontSize: 13,
    },
    snackbar: {
        fontWeight: 'bold',
        backgroundColor: '#D22B2B'
    },
})
