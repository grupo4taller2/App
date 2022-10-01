import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import InfoInput from '../../controler/infoInput';
import Outward from '../../controler/outward';
import { createStatusChanger, signIn } from '../../model/status';
import { UserContext } from '../components/context';
import GoogleLogin from '../components/googleSignin';
import StatusButton from '../components/loginButton';
import LoginInfo from './loginInputView';


export default class Login extends Component{

    constructor(props){
        super(props)

        this.state = {};
        this.connection = new Outward();
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

        
        this.handleFailedLogin = this.handleFailedLogin.bind(this);
    }

    handleFailedLogin(){
        this.state.email.fail();
        this.state.password.fail();
        this.setState(this.state);
    }

    render(){

        const call = createStatusChanger(signIn,
                                        this.connection,
                                        {
                                          email: this.state.email,
                                          password: this.state.password
                                        },
                                        this.handleFailedLogin)

        return (
        <React.Fragment>
          <LoginInfo emailText={this.state.email} passwordText={this.state.password}/>
          <StatusButton text={"Sign in"} style={style} call={call}/>
        </React.Fragment>);
    }
}

const style = StyleSheet.create({
  button: {
    backgroundColor: '#37a0bd',
    borderRadius: 100,
},
buttonContent: {
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