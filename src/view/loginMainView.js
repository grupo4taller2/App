import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import InfoInput from '../controler/infoInput';
import Outward from '../controler/outward';
import LoginInfo from './loginInputView';




export default class Login extends Component{

    constructor(props){
        super(props)

        this.state = {};

        this.state.connection = new Outward();

        this.state.username = new InfoInput(null, {
            label: "Username",
            mode: "outlined",
            style: style.inputBox
          });
        this.state.password = new InfoInput(true, {
            label: "Password",
            mode: "outlined",
            style: style.inputBox
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

        <Button style={[style.singInButton, backgroundColorChange]} contentStyle={style.signInButtonContent} labelStyle={style.buttonText} uppercase={false} onPress={this.handleLoginAttemp}>
          {this.state.signInText}
        </Button>
        </React.Fragment>);
    }
}

const style = StyleSheet.create({
  singInButton: {
    backgroundColor: '#37a0bd',
    borderRadius: 100,
},
signInButtonContent: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width: 320,
    height: 70,
},
buttonText: {
  color: 'white',
  fontSize: 20,
  fontWeight: '500',
  alignSelf: 'center',
},
inputBox: {
  maxHeight: 60,
  margin: 10,
  paddingLeft: 8,
},  
})