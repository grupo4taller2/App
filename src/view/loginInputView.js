import React, { Component } from 'react';
import InfoInput from '../controler/infoInput';
import { styles } from '../styles/styles';
import {View} from 'react-native';
import TextField from './textField';


export default class LoginInfo extends Component{

    constructor(props){
        super(props);
    }


    render(){

        return (<View style={styles.inputView}>
                    <TextField text={this.props.userText} />
                    <TextField text={this.props.passwordText}/>
                </View>);
    }
}