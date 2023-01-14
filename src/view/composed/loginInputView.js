import React from 'react';
import { StyleSheet, View } from 'react-native';
import TextField from './textField';


export default function LoginInfo(props){

        return (<View style={inputViewStyle}>
                    <TextField text={props.emailText} />
                    <TextField text={props.passwordText}/>
                </View>);
                }


const inputViewStyle = StyleSheet.create({
        flex: 2,
        marginBottom: 20,
        minWidth: 350,
        maxHeight: 150,
        justifyContent: 'flex-start',
})
