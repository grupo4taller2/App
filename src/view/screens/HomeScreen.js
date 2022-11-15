import React from 'react';
import { useState, useEffect } from 'react';
import { SafeAreaView, Image, StyleSheet, TouchableNativeFeedback, View } from "react-native";
import { StatusBar } from 'expo-status-bar';
import StatusButton from '../components/loginButton';
import { Avatar, Button, Drawer, List, Menu, Surface, Text, Snackbar} from "react-native-paper";
import { useUserContext } from '../components/context';
import { createStatusChanger, signOut } from '../../model/status';
import Constants from 'expo-constants';
import { UserNavConstants } from '../../config/userNavConstants';

export default function HomeScreen({route, navigation}) {
  const context = useUserContext();
  const userFirstName = context.userState.userInfo.first_name;
  const isDriver = context.userState.userInfo.driver_information ? true : false;
  const [visibleRatingSB, setVisibleRatingSB] = useState(false);

  const onToggleRatingSnackBar = () => setVisibleRatingSB(!visibleRatingSB);

  const onDismissRatingSnackBar = () => setVisibleRatingSB(false);

  useEffect(() => { // checks for any snackbar that may need rendering on initial render
    if (route.params) {
      const {snackbar} = route.params;
      switch (snackbar) {
        case 'rating': { onToggleRatingSnackBar(); }
      }
  }}, [route])


  return (
    <View style={styles.mainView}>
      <StatusBar style="auto" />
      <View style={styles.header}>
        <Image style={styles.logo} source={require('../../../resources/images/logo.png')}/>
        <View style={styles.balanceView}>
          <Text style={styles.creditText}>Credit left: </Text>
          <Button style={styles.balanceButton} contentStyle={styles.contentStyle} labelStyle={styles.balanceButtonText} 
            onPress={() => {navigation.push(UserNavConstants.WalletView)}}>
            45.78 ETH
          </Button>
        </View>
      </View>
      <View style={styles.greetView}>
        <Text style={styles.greeting}>Good to see you, {userFirstName}</Text>
      </View>
      <View style={styles.buttonsView}>
        <TouchableNativeFeedback onPress={() => navigation.push(UserNavConstants.TripScreen)}>
            <Surface style={styles.OptionSurface} elevation={5}>
                <Avatar.Icon style={{backgroundColor: "#fff"}} size={50} icon="car" />
                <Text style={styles.buttonText}>Ride</Text>
            </Surface>
          </TouchableNativeFeedback>
          <TouchableNativeFeedback disabled={!isDriver} onPress={() => navigation.push(UserNavConstants.AvailableJobsScreen)}>
            <Surface style={styles.OptionSurface} elevation={5}>
                <Avatar.Icon style={{backgroundColor: "#fff"}} size={50} icon="car-traction-control" />
                <Text style={styles.buttonText}>Drive</Text>
                <Text style={styles.driversOnly}>(Drivers only)</Text>
            </Surface>
          </TouchableNativeFeedback>
        </View>
        <View style={styles.buttonsView}>
          <TouchableNativeFeedback onPress={() => navigation.push(UserNavConstants.ProfileScreen)}>
            <Surface style={styles.OptionSurface} elevation={5}>
                <Avatar.Icon style={{backgroundColor: "#fff"}} size={50} icon="account" />
                <Text style={styles.buttonText}>Profile</Text>
            </Surface>
          </TouchableNativeFeedback>
      </View>
      <Snackbar
          visible={visibleRatingSB}
          onDismiss={onDismissRatingSnackBar}
          duration='2500'
          style={styles.snackbar}>
          <Text style={{fontWeight: 'bold', color: '#fff'}}>There was an error submitting your review, we're sorry for the inconvenience.</Text>
      </Snackbar>
    </View>
    )
}

/*
Go again component:
      <View style={style.goAgainView}>
        <Text style={style.goAgainText} >Go Again</Text>
      </View>  
      <View style={style.goAgainButtonsView}>
      <TouchableNativeFeedback>
        <Surface style={style.goAgainSurface} elevation={4}>
            <Menu.Item leadingIcon="wallet" title="Destination 1" style={styles.optionItem}></Menu.Item>
            <Avatar.Icon style={style.optionArrow} icon="chevron-right"/>               
        </Surface>
        </TouchableNativeFeedback>
        <TouchableNativeFeedback>
        <Surface style={style.goAgainSurface} elevation={4}>
            <Menu.Item leadingIcon="wallet" title="Destination 2" style={styles.optionItem}></Menu.Item>
            <Avatar.Icon style={style.optionArrow} icon="chevron-right"/>               
        </Surface>
        </TouchableNativeFeedback>
        <TouchableNativeFeedback>
        <Surface style={style.goAgainSurface} elevation={4}>
            <Menu.Item leadingIcon="wallet" title="Destination 3" style={styles.optionItem}></Menu.Item>
            <Avatar.Icon style={style.optionArrow} icon="chevron-right"/>               
        </Surface>
        </TouchableNativeFeedback>
        <TouchableNativeFeedback>
        <Surface style={style.goAgainSurface} elevation={4}>
            <Menu.Item leadingIcon="wallet" title="Destination 4" style={styles.optionItem}></Menu.Item>
            <Avatar.Icon style={style.optionArrow} icon="chevron-right"/>               
        </Surface>
        </TouchableNativeFeedback>
      </View>
*/

const styles = StyleSheet.create(
{
  mainView: {
    flex: 1,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#37a0bd',
    borderRadius: 100,
  },
  buttonContent: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width: 320,
    height: 70,
  },
  buttonText: {
    fontSize: 20,    
  },
  inputBox: {
    maxHeight: 60,
    margin: 10,
    paddingLeft: 8,
  },  
  header: {
    flex: .3,
    flexDirection: 'row',
    marginLeft: 40,
    marginTop: 40,
  },
  logo: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    backgroundColor: "#fff"
  },
  balanceView: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-end',
    alignContent: 'flex-end'
  },
  balanceButton: {
    backgroundColor: '#3e9c35',
    borderRadius: 10,
    marginRight: 40,
    marginTop: 10,
  },
  balanceButtonContent: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width: 320,
    height: 70,
  },
  balanceButtonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '500',
    alignSelf: 'center',
  },
  creditText:{
    marginHorizontal: 50,
    fontSize: 18,
    fontWeight: 'bold'
  },  
  greetView: {
    flex: .2,
    justifyContent: 'center',
  },
  greeting: {
    flex: 1,
    marginLeft: 25,
    fontSize: 32,
    fontWeight: '600',
  },
  buttonsView: {
    flex: .7,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center'
  },
  driversOnly: {
    fontSize: 10
  },
  goAgainView: {
    flex: 1,
  },
  goAgainText: {
    marginLeft: 25,
    fontSize: 18,
    fontWeight: '300',
  },
  goAgainButtonsView: {
    flex: 4,
    minWidth: 350,
    margin: 5,
    backgroundColor: "#fff"
  },
  goAgainSurface: {
    flex: 0.1,
    minWidth: 350,
    margin: 5,
    backgroundColor: "#fff"
  },
  optionArrow: {
    backgroundColor: '#fff',
    position: 'absolute',
    right: 0
  },
  snackbar: {
    backgroundColor: '#D22B2B'
  },
  creditView: {
      flex: 1/3,
      position: 'absolute',
      bottom: 0,
      alignSelf: 'center'
  },
  OptionSurface: {
      padding: 35,
      margin: 6,
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: "#fff"
  },
  optionItem: {
      
  },
})
