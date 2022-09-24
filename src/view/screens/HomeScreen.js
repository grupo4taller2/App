import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStatusChanger, signOut } from '../../model/status';
import { useUserContext } from '../components/context';
import StatusButton from '../components/loginButton';

export default function HomeScreen() {
  const context = useUserContext();

  const failedLogOut = () => {
    console.log("Failed to log out")
  };

  const callBack = createStatusChanger(
    signOut, 
    null,
    null,
    failedLogOut
  )


  return (
    <View style={styles.container}>
      <Text>Home screen!</Text>
      <StatusBar style="auto" />
      <StatusButton text={"Sign out"} style={style} call={callBack}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const style = StyleSheet.create({
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
})