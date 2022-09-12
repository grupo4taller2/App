import React, { useState } from "react";
import { Button, TextInput, IconButton } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import FiUberLogo from './resources/images/logo.png';

export default function LoginView() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    return (
      <View style={styles.loginMainView}>
  
        <View style={styles.greetView}>
            <Text style={styles.mainGreet}>
                Hello Again!
            </Text>
            <Text style={styles.secondaryGreet}>
                Need a Lift?
            </Text>
        </View>

        <View style={styles.inputView}>
          <TextInput
            label="Username"
            variant="outlined"
          />
          <TextInput
            label="Password"
            variant="outlined"
            trailing={props => (
              <IconButton icon={props => <Icon name="eye" {...props} />} {...props} />
            )}
          />
        </View>

        <Button style={styles.singInButton} color="#37a0bd" tintColor="white" uppercase={false}
            title={props => (
                <Text style={styles.buttonText}> Sign In </Text>)}
        />
        
        <View style={styles.registerNow}>
            <Text> Don't have an account? Register Now </Text>
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
    greetView: {
      flex: 1,
      paddingTop: 100
    },
    inputView: {
      flex: 2,
      paddingTop: 0,
      width: 300,
      justifyContent: "space-evenly"
    },
    mainGreet: {
        textAlign: "center",
        color: "black",
        fontWeight: "bold",
        fontSize: 34
    },
    secondaryGreet: {
        textAlign: "center",
        color: "black",
        fontWeight: "300",
        fontSize: 24
    },
    singInButton: {
        flex: 1,
        justifyContent: "center"
    },
    registerNow: {
        flex: 1,
        flexDirection: "column-reverse",
        paddingBottom: 25
    },
    buttonText: {
        color: "white",
        fontSize: 30,
        fontWeight: "500"
    }
  });
  