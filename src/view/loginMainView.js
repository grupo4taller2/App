import React, { Component } from 'react';
import { Button } from 'react-native-paper';
import InfoInput from '../controler/infoInput';
import Outward from '../controler/outward';
import { styles } from '../styles/styles';
import LoginInfo from './loginInputView';




export default class Login extends Component{

    constructor(props){
        super(props)

        this.state = {};

        this.state.connection = new Outward();

        this.state.username = new InfoInput(null, {
            label: "Username",
            mode: "outlined",
            style: styles.inputBox
          });
        this.state.password = new InfoInput(true, {
            label: "Password",
            mode: "outlined",
            style: styles.inputBox
          });

        this.handleLoginAttemp = this.handleLoginAttemp.bind(this);
    }

    handleFailedLogin(){
        this.state.username.fail();
        this.state.password.fail();
    }

    async handleLoginAttemp(){
        console.log("Username: ", this.state.username.getText());
        console.log("Password: ", this.state.password.getText());
        this.handleFailedLogin();   
    }

    render(){

        return (
        <React.Fragment>
        <LoginInfo userText={this.state.username} passwordText={this.state.password}/>

        <Button style={styles.singInButton} labelStyle={styles.buttonText} uppercase={false} onPress={this.handleLoginAttemp}>
          Sign In
        </Button>
        </React.Fragment>);
    }
}