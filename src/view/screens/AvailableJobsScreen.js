import { React, useState} from 'react';
import { StyleSheet, View, ScrollView } from "react-native";
import { Text, Appbar, List, Snackbar, Dialog, Paragraph, Button } from "react-native-paper";
import { UserNavConstants } from '../../config/userNavConstants';
import { useInterval } from '../../hooks/useInterval';
import { useUserContext } from '../components/context';
import { getHeader } from '../../model/status';
import * as Location from 'expo-location';
import axios from 'axios';


export default function AvailableJobsScreen({navigation}){
    const context = useUserContext();
    const token = getHeader(context);
    const [jobs, setJobs] = useState([]);
    const [delay, setDelay] = useState(2500);   // job list polling delay (in ms)
    const [visibleGeneralSB, setVisibleGeneralSB] = useState(false);
    const [visiblePermissionsSB, setVisiblePermissionsSB] = useState(false);
    const [confirmationDialog, setConfirmationDialog] = useState(false);
    const [selectedStart, setSelectedStart] = useState("");
    const [selecteDestination, setSelectedDestination] = useState("");
    const [selectedDistance, setSelectedDistance] = useState("");
    const [selectedDuration, setSelectedDuration] = useState("");
    const [selectedTripCost, setSelectedTripCost] = useState("");
    const [selectedTripID, setSelectedTripID] = useState("");
    const [isButtonPressed, setIsButtonPressed] = useState(false);
    let jobsAmount = 15;    // amount of jobs to display

    const onToggleGeneralSnackBar = () => setVisibleGeneralSB(!visibleGeneralSB);

    const onDismissGeneralSnackBar = () => setVisibleGeneralSB(false);

    const onTogglePermissionsSnackBar = () => setVisiblePermissionsSB(!visiblePermissionsSB);

    const onDismissPermissionsSnackBar = () => setVisiblePermissionsSB(false);

    const showConfirmationDialog = () => setConfirmationDialog(!confirmationDialog);

    const hideConfirmationDialog = () => setConfirmationDialog(false);


    useInterval(async () => {
        let url = 'http://g4-fiuber.herokuapp.com/api/v1/trips';
        let username = context.userState.userInfo.username;
        let desired_state = "looking_for_driver";
        
        try {
            let listOfJobs = await axios.get(url, {headers: token.headers, params: {driver_username: username, trip_state: desired_state, offset: 0, limit: jobsAmount}});
            setJobs(listOfJobs.data);
        }
        catch (error) {
            console.warn(error);
        }
      }, delay);

    // checks if a certain job (by trip_id) is available and attempts to mark is as taken
    async function isJobAvailable(trip_id) {
        let url = `http://g4-fiuber.herokuapp.com/api/v1/trips/${trip_id}`;
        let username = context.userState.userInfo.username;

        try {
            let trip_info = await axios.patch(url, {id: trip_id, trip_state: 'accepted_by_driver', driver_username: username, driver_current_latitude: 0,
            driver_current_longitude: 0}, token);
            if (JSON.parse(trip_info.config.data).trip_state == 'accepted_by_driver') { return trip_id }  // if statement may be unnecessary
        }
        catch(error) {
            console.warn(error);
            return false
        }
        return false;
    }

    async function getGPSPermissions() {
        let permissions = await Location.requestForegroundPermissionsAsync();

        if (!permissions.granted) {
            onTogglePermissionsSnackBar();
            return;
        }
        showConfirmationDialog();
    }

    async function getGPSLocation() {
        try {
          let currentLoc = await Location.getCurrentPositionAsync({accuracy: Location.Accuracy.BestForNavigation});
          return({latitude: currentLoc.coords.latitude, longitude: currentLoc.coords.longitude});
        }
        catch (error) {
            console.warn("Couldn't poll for gps location");
        }
        return({latitude: origin.latitude, longitude: origin.longitude});
    }
    
    function convertRating(rating) {
        if (rating == -1) { return 'No reviews'; }  // -1 in backend simbolizes no reviews have been made
        return (rating + " ★");
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
                        description={`(${distance}, ETA: ${estimated_time})\nPassenger: ${rider_username} (${convertRating(rider_rating)})`}
                        descriptionNumberOfLines={3}
                        right={props => <Text style={{alignSelf: 'center', fontWeight: 'bold'}}>{Number(estimated_price).toFixed(3)} ETH</Text>}
                        onPress={() => {
                            setSelectedStart(origin.address);
                            setSelectedDestination(destination.address);
                            setSelectedDuration(estimated_time);
                            setSelectedDistance(distance);
                            setSelectedTripCost(Number(estimated_price).toFixed(3));
                            setSelectedTripID(trip_id);
                            getGPSPermissions();
                        }}
                    />
            )))
        }
        else {
            return(
                <View style={{marginTop: '10%', alignItems: 'center'}}>
                    <Text  style={{textAlignVertical: "center",textAlign: "center",}}>We're looking for jobs that are available at the moment, you'll see them pop up here as soon as we find any</Text>
                </View>
            )
        }
    }


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
            <Dialog style={styles.dialogBox} visible={confirmationDialog} onDismiss={hideConfirmationDialog}>
                <Dialog.Title>Job Start Confirmation</Dialog.Title>
                <Dialog.Content>
                    <Paragraph>Are you sure you want to take this job from {selectedStart} to {selecteDestination} ({selectedDistance}, ETA:{selectedDuration}) for {selectedTripCost} ETH</Paragraph>
                </Dialog.Content>
                <Dialog.Actions>
                    <View style={styles.confirmationButtonsView}>
                        <Button loading={isButtonPressed} buttonColor='#32a852' mode='outlined' style={styles.confirmButton} contentStyle={styles.confirmButtonContent} labelStyle={styles.confirmButtonLabel}
                        onPress={
                            async () => {
                                setIsButtonPressed(true);
                                let job_id = await isJobAvailable(selectedTripID);
                                if (job_id !== false) {
                                    // context.userState.currentState = 'travelling';
                                    let url = `http://g4-fiuber.herokuapp.com/api/v1/trips/${job_id}`;
                                    let trip_info = await axios.get(url, {headers: token.headers, params: {id: job_id}});
                                    let gpsLoc = await getGPSLocation();
                                    setIsButtonPressed(false);
                                    navigation.navigate(UserNavConstants.OngoingJobScreen, {trip_info: trip_info.data, location: gpsLoc});
                                }
                                else {
                                    setIsButtonPressed(false);
                                    onToggleGeneralSnackBar();
                                }
                            }}>
                                Yes, let's start my job
                            </Button>
                        <Button buttonColor='#cc3d55' mode='outlined' style={styles.denyButton} contentStyle={styles.denyButtonContent} labelStyle={styles.denyButtonLabel}
                        onPress={hideConfirmationDialog}>No, take me back</Button>
                    </View>
                </Dialog.Actions>
            </Dialog>
            <Snackbar
                visible={visibleGeneralSB}
                onDismiss={onDismissGeneralSnackBar}
                duration={2000}
                style={styles.snackbar}>
                <Text style={{fontWeight: 'bold', color: '#fff'}}>There was an error while trying to assign you to that job, wait and try later.</Text>
            </Snackbar>
            <Snackbar
                visible={visiblePermissionsSB}
                onDismiss={onDismissPermissionsSnackBar}
                duration={2500}
                style={styles.snackbar}>
                <Text style={{fontWeight: 'bold', color: '#fff'}}>GPS permissions were denied, make sure to enable them to proceed with this job.</Text>
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
