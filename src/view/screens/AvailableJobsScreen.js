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


export default function AvailableJobsScreen({navigation}){
    const [jobs, setJobs] = useState([]);
    const [delay, setDelay] = useState(5000);   // gps location polling delay (in ms)
    const [visibleGeneralSB, setVisibleGeneralSB] = useState(false);

    const onToggleGeneralSnackBar = () => setVisibleGeneralSB(!visibleGeneralSB);

    const onDismissGeneralSnackBar = () => setVisibleGeneralSB(false);

    
    useInterval(() => {
        // hardcoded list for now
        let listOfJobs = [{
            id: 4443,
            start: 'Paseo Colon 850',
            end: 'Av. Cabildo 4200',
            passenger: 'John Doe',
            passenger_rating: '4.1',
            distance: '31.42',
            duration: '34.7',
            pay: '6,43 ETH'
        },
        {
            id: 4444,
            start: 'Av. Libertador 7000',
            end: 'Av. Cabildo 1400',
            passenger: 'Mary Sue',
            passenger_rating: '3.6',
            distance: '17.63',
            duration: '24.3',
            pay: '4,31 ETH'
        },
        {
            id: 4445,
            start: 'Av. Monroe 2000',
            end: 'Paseo Colon 850',
            passenger: 'Paul Smith',
            passenger_rating: '1.8',
            distance: '33.11',
            duration: '29.8',
            pay: '3,92 ETH'
        },];
        /*
        listOfJobs = await axios.get(/locations/self);
        */
        setJobs(listOfJobs);
      }, delay);

    function isJobAvailable(id) {
        /*
        let trip_info = await axios.get(/trips/${id});
        if (trip_info.state == 'available') { return true }
        */
        return false;
    }

    async function markAsStarted(id) {
        /*
        axios.push(/trips/${id}/start);
        */
        return true;
    }
      
    function renderJobList() {
        if (jobs.length) {
            return(
                jobs.map(({ start, end, passenger, passenger_rating, distance, duration, pay, id }) => (
                    <List.Item
                        style={styles.jobItem}
                        titleStyle={styles.jobItemTitle}
                        descriptionStyle={styles.jobItemDescription}
                        title={`From: ${start} to: ${end}`}
                        titleNumberOfLines={3}
                        description={`(${distance} km, ETA: ${duration} min)\nPassenger: ${passenger} (${passenger_rating} ★)`}
                        descriptionNumberOfLines={3}
                        right={props => <Text style={{alignSelf: 'center', fontWeight: 'bold'}}>{pay}</Text>}
                        onPress={() => {
                            if (isJobAvailable(id)) {
                                // let marked = await markAsStarted(id);
                                // context.user.state = 'travelling';
                                // navigation.push(UserNavConstants.OngoingJobScreen)
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
