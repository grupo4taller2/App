import React, { Component } from 'react';
import {StyleSheet, View} from 'react-native';
import TextField from './textField';


export default class LoginInfo extends Component{

    constructor(props){
        super(props);
    }


    render(){

        return (<View style={inputViewStyle}>
                    <TextField text={this.props.userText} />
                    <TextField text={this.props.passwordText}/>
                </View>);
    }
}


const inputViewStyle = StyleSheet.create({
        flex: 2,
        marginBottom: 100,
        minWidth: 350,
        maxHeight: 150,
        justifyContent: 'flex-start',
})