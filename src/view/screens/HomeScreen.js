import React from 'react';
import { SafeAreaView, Image, StyleSheet, TouchableNativeFeedback, View } from "react-native";
import { StatusBar } from 'expo-status-bar';
import StatusButton from '../components/loginButton';
import { Avatar, Button, Drawer, List, Menu, Surface, Text } from "react-native-paper";
import { useUserContext } from '../components/context';
import { createStatusChanger, signOut } from '../../model/status';
import Constants from 'expo-constants';
import { UserNavConstants } from '../../config/userNavConstants';

export default function HomeScreen({navigation}) {
  const context = useUserContext();
  const userFirstName = context.userState.userInfo.first_name;

  return (
    <View style={style.mainView}>
      <StatusBar style="auto" />
      <View style={style.header}>
        <Image style={style.logo} source={require('../../../resources/images/logo.png')}/>
        <View style={style.balanceView}>
          <Button style={style.balanceButton} contentStyle={style.contentStyle} labelStyle={style.balanceButtonText} >
            4.32 ETH
          </Button>
        </View>
      </View>
      <View style={style.greetView}>
        <Text style={style.greeting}>Good to see you, {userFirstName}</Text>
      </View>
      <View style={style.buttonsView}>
        <TouchableNativeFeedback onPress={() => navigation.push(UserNavConstants.TripScreen)}>
            <Surface style={styles.OptionSurface} elevation={5}>
                <Avatar.Icon style={{backgroundColor: "#fff"}} size={40} icon="car" />
                <Text>Ride</Text>
            </Surface>
          </TouchableNativeFeedback>
          <TouchableNativeFeedback onPress={() => navigation.push(UserNavConstants.ProfileScreen)}>
            <Surface style={styles.OptionSurface} elevation={5}>
                <Avatar.Icon style={{backgroundColor: "#fff"}} size={40} icon="account" />
                <Text>Profile</Text>
            </Surface>
          </TouchableNativeFeedback>
        </View>
        <View style={style.buttonsView}>
          <TouchableNativeFeedback>
            <Surface style={styles.OptionSurface} elevation={5}>
                <Avatar.Icon style={{backgroundColor: "#fff"}} size={40} icon="chat" />
                <Text>Messages</Text>
            </Surface>
          </TouchableNativeFeedback>
          <TouchableNativeFeedback onPress={() => navigation.push(UserNavConstants.AvailableJobsScreen)}>
            <Surface style={styles.OptionSurface} elevation={5}>
                <Avatar.Icon style={{backgroundColor: "#fff"}} size={40} icon="car-traction-control" />
                <Text>Drive</Text>
                <Text style={style.driversOnly}>(Drivers only)</Text>
            </Surface>
          </TouchableNativeFeedback>
      </View>
      
    
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

































 <View style={styles.Mainview}>
    <SafeAreaView style={styles.ProfileView}>
        <View style={styles.NameReviewView}>
        <Text style={styles.nameText}>Francisco Javier Pereira</Text>
        <Drawer.Item style={styles.stars} label="4.8" icon="star" />
        </View>
        <View style={styles.ProfilePict}>
            <Avatar.Image style={{backgroundColor: "#f0efc0"}} size={60} source={require('../../../assets/icon.png')}/>
        </View>
    </SafeAreaView>
    <View style={styles.PrivateView}>
        <View style={styles.OptionsView}>
            <TouchableNativeFeedback>
        <Surface style={styles.OptionSurface} elevation={5}>
            <Avatar.Icon style={{backgroundColor: "#fff"}} size={40} icon="import" />
            <Text>Deposit</Text>
        </Surface>
        </TouchableNativeFeedback>
        <TouchableNativeFeedback>
        <Surface style={styles.OptionSurface} elevation={5}>
            <Avatar.Icon style={{backgroundColor: "#fff"}} size={40} icon="export" />
            <Text>Withdraw</Text>
        </Surface>
        </TouchableNativeFeedback>
        </View>
        <View style={styles.creditView}>
            <Surface style={styles.CreditSurface} elevation={5}>
            <View style={{minWidth: 250, flexDirection: 'row', justifyContent: 'center'}}>
                <Text style={{fontSize: 20}}>Total balance</Text>
                <TouchableNativeFeedback>
                <Avatar.Icon style={{backgroundColor: "#fff", marginLeft: 20}}  size={35} icon="eye"/>
                </TouchableNativeFeedback>
            </View>
            <Text style={[styles.nameText, {margin: 10}]}>45.78 USD</Text>
            </Surface>
        </View>
    </View>
    <View style={styles.privateOptions}>
        <TouchableNativeFeedback>
        <Surface style={styles.optionStyle} elevation={4}>
            <Menu.Item leadingIcon="account" title="My account" style={styles.optionItem}></Menu.Item>
            <Avatar.Icon style={styles.optionArrow} icon="chevron-right"/>
        </Surface>
        </TouchableNativeFeedback>
        <TouchableNativeFeedback>
        <Surface style={styles.optionStyle} elevation={4}>
            <Menu.Item leadingIcon="wallet" title="Wallet" style={styles.optionItem}></Menu.Item>
            <Avatar.Icon style={style.optionArrow} icon="chevron-right"/>               
        </Surface>
        </TouchableNativeFeedback>
        <TouchableNativeFeedback>
        <Surface style={styles.optionStyle} elevation={4}>
            <Menu.Item leadingIcon="help" title="Help" style={styles.optionItem}></Menu.Item>
            <Avatar.Icon style={styles.optionArrow} icon="chevron-right"/>
        </Surface>
        </TouchableNativeFeedback>
        <TouchableNativeFeedback>
        <Surface style={styles.optionStyle} elevation={4}>
            <Menu.Item leadingIcon="card-account-details" title="Become a driver" style={styles.optionItem}></Menu.Item>
            <Avatar.Icon style={styles.optionArrow} icon="chevron-right"/>
        </Surface>
        </TouchableNativeFeedback>
    </View>
  </View>
   */

const style = StyleSheet.create({
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
    color: 'white',
    fontSize: 20,
    fontWeight: '500',
    alignSelf: 'center',
  },
  inputBox: {
    maxHeight: 60,
    margin: 10,
    paddingLeft: 8,
  },  
  header: {
    flex: .5,
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
    flexDirection: 'row-reverse',
  },
  balanceButton: {
    backgroundColor: '#37a0bd',
    borderRadius: 100,
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
  greetView: {
    flex: .3,
    justifyContent: 'center',
  },
  greeting: {
    flex: 1,
    marginLeft: 25,
    fontSize: 32,
    fontWeight: '600',
  },
  buttonsView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
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
})

const styles = StyleSheet.create(
{
    Mainview: {
        flex: 1,
        backgroundColor: "#f0efc0"
        
    },
    ProfileView: {
        flex: 0.1,
        
        justifyContent: "center",
        flexDirection: "row",
        
        paddingTop: Constants.statusBarHeight,
        margin: 0
    },
    PrivateView: {
        flex: 0.3
    },
    OptionsView: {
        flex: 1/2,
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "flex-start"
    },
    creditView: {
        flex: 1/3,
        position: 'absolute',
        bottom: 0,
        alignSelf: 'center'
    },
    privateOptions: {
        flex: 0.6,
        alignItems: "center",
        justifyContent: "center"
    },
    NameReviewView: {
        flex: 0.7,
    },
    ProfilePict: {
        flex: 0.3,
        justifyContent: 'center',
        alignItems: 'center'
    },
    nameText: {
        fontSize: 20,
        fontWeight: 'bold',
        alignSelf: 'center'
    },
    stars: {
        
    },
    OptionSurface: {
        padding: 35,
        minHeight: 100,
        margin: 6,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#fff"
      },
    CreditSurface: {
        maxWidth: "80%",
        padding: 8,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: "center",
        backgroundColor: "#fff"
    },
    optionStyle: {
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
    optionItem: {
        
    },
})

