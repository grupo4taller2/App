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

          this.state.signInText = "Sign In";

        this.handleLoginAttemp = this.handleLoginAttemp.bind(this);
    }

    handleFailedLogin(){
        this.state.username.fail();
        this.state.password.fail();
    }

    handleAcceptedLogin(){
        let signInText = "Succesful";

        this.setState({signInText})
    }

    async handleLoginAttemp(){
        let response = await this.state.connection.tryLogin(this.state.username, this.state.password)

        if (response.result){
          this.handleAcceptedLogin();
        }else{
          this.handleFailedLogin();   
        }
    }

    render(){

        let backgroundColorChange = this.state.signInText === 'Succesful' ? {backgroundColor: "#90ee90"} : null

        return (
        <React.Fragment>
        <LoginInfo userText={this.state.username} passwordText={this.state.password}/>

        <Button style={[styles.singInButton, backgroundColorChange]} contentStyle={styles.signInButtonContent} labelStyle={styles.buttonText} uppercase={false} onPress={this.handleLoginAttemp}>
          {this.state.signInText}
        </Button>
        </React.Fragment>);
    }
}