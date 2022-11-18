import React, { Component } from 'react';
import {StyleSheet, View} from 'react-native';
import Outward from '../../controler/outward';
import ConfirmableTextField from './confirmableTextField';
import TextField from './textField';


export default class RegisterInput extends Component {

    constructor(props){
        super(props);
    }

    

    render(){
        return (<View style={inputViewStyle}>
                    <TextField text={this.props.userText} />
                    <ConfirmableTextField text={this.props.passwordText} />
                    <TextField text={this.props.emailText}/>
                    <TextField text={this.props.phoneText}/>
                    <TextField text={this.props.location} />
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
