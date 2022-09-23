import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import InfoInput from '../controler/infoInput';
import Outward from '../controler/outward';
import { useAuthentication } from '../utils/hooks/useAuthentication';
import GoogleLogin from './components/googleSignin';
import LoginInfo from './loginInputView';



export default class Login extends Component{

    constructor(props){
        super(props)

        this.state = {};

        this.state.connection = new Outward();

        this.state.email = new InfoInput(null, {
            label: "E-mail",
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
        this.handleFailedLogin = this.handleFailedLogin.bind(this);
        this.handleAcceptedLogin = this.handleAcceptedLogin.bind(this);
    }

    handleFailedLogin(){
        this.state.email.fail();
        this.state.password.fail();
    }

    handleAcceptedLogin(){
        let signInText = "Succesful";

        this.setState({signInText})
    }

    async handleLoginAttemp(){
        let response = await this.state.connection.tryLogin(this.state.email, this.state.password)

        if (response.result) {
          console.log(response);
          this.handleAcceptedLogin();
        }else{
          this.handleFailedLogin();   
        }
    }

    render(){

        let backgroundColorChange = this.state.signInText === 'Succesful' ? {backgroundColor: "#90ee90"} : null

        return (
        <React.Fragment>
          <LoginInfo emailText={this.state.email} passwordText={this.state.password}/>

          <Button style={[style.singInButton, backgroundColorChange]} contentStyle={style.signInButtonContent} labelStyle={style.buttonText} uppercase={false} onPress={this.handleLoginAttemp}>
            {this.state.signInText}
          </Button>
          <GoogleLogin style={style}/>
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