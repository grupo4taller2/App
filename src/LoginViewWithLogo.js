import React, { useState } from "react";
import { Stack, TextInput, IconButton } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import FiUberLogo from '../resources/images/logo.png';

export default function LoginViewWithLogo() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    return (
      <View style={styles.loginMainView}>
        
        <Image style={styles.logo} source={require('./resources/images/logoWithName.png')} />
  
        <View style={styles.greetView}>
          <Text>Hello Again!</Text>
          <Text>Need a Lift?</Text>
        </View>
        <View style={styles.inputView}>
          <TextInput
            label="Username"
            variant="outlined"
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            label="Password"
            variant="outlined"
            trailing={props => (
              <IconButton icon={props => <Icon name="eye" {...props} />} {...props} />
            )}
          />
        </View>
        
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    loginMainView: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    logo: {
      flex: 1,
      aspectRatio: 0.4,
      paddingTop: 180,
      resizeMode: 'contain',
    },
    greetView: {
      flex: 2,
    },
    inputView: {
      flex: 1,
    }
  });
  