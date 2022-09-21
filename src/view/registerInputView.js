import React, { Component } from 'react';
import {StyleSheet, View} from 'react-native';
import TextField from './textField';


export default class RegisterInput extends Component {

    constructor(props){
        super(props);
    }

    render(){
        return (<View style={inputViewStyle}>
                    <TextField text={this.props.userText} />
                    <TextField text={this.props.passwordText}/>
                    <TextField text={this.props.repeatPasswordText}/>
                    <TextField text={this.props.emailText}/>
                    <TextField text={this.props.walletText}/>
                </View>);
    }
}


const inputViewStyle = StyleSheet.create({
        flex: 4,
        marginBottom: 100,
        minWidth: 350,
        maxHeight: 550,
        justifyContent: 'flex-start',
})
