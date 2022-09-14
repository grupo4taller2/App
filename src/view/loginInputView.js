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
        let userText = new InfoInput(null, {
            label: "Username",
            mode: "outlined",
            style: styles.inputBox
          });

          let passwordText = new InfoInput(true, {
            label: "Password",
            mode: "outlined",
            style: styles.inputBox
          });

        return (<View style={styles.inputView}>
                    <TextField text={userText} />
                    <TextField text={passwordText}/>
                </View>);
    }
}