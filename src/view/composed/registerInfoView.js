import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';
import ConfirmableTextInput from '../../controler/confirmableText';
import InfoInput from '../../controler/infoInput';
import Outward from '../../controler/outward';
import { createStatusChanger, register } from '../../model/status';
import StatusButton from '../components/loginButton';
import RegisterInput from './registerInputView';

export default class RegisterInfo extends Component {

    constructor(props){
        super(props)

        this.state = {};

        this.connection = new Outward();

        this.state.username = new InfoInput(null, {
            label: "Username",
            mode: "outlined",
            style: style.inputBox
        });

        this.state.password = new ConfirmableTextInput(true, {
            label: "Password",
            mode: "outlined",
            style: style.inputBox    
        })

        this.state.email = new InfoInput(null, {
            label: "E-mail",
            mode: "outlined",
            style: style.inputBox
        });
        this.state.wallet = new InfoInput(null, {
            label: "Ethereum Wallet Adress",
            mode: "outlined",
            style: style.inputBox
        });
        this.state.phone = new InfoInput(null, {
            label: "Phone Number",
            mode: "outlined",
            style: style.inputBox
        });

        this.failedRegister = this.failedRegister.bind(this);
        this.handlePassWordChange = this.handlePassWordChange.bind(this);

        this.state.password.setNotifyCallback(this.handlePassWordChange);
    }

    failedRegister(){
        this.state.username.fail();
        this.state.password.fail()
        this.state.email.fail();
        this.state.wallet.fail();
        this.state.phone.fail();
        this.setState(this.state);
    }

    handlePassWordChange(newPassword){
        const password = newPassword;

        this.setState({password})
    }

    render(){
        const callBack = createStatusChanger(register,
                                            this.connection,
                                            {email: this.state.email,
                                            password: this.state.password},
                                            this.failedRegister)

        return (
        <React.Fragment>
            <RegisterInput userText={this.state.username} passwordText={this.state.password} emailText={this.state.email} walletText={this.state.wallet} phoneText={this.state.phone} />
            <StatusButton text={"Sign up"} style={style} call={callBack}/>
        </React.Fragment>);
    }
}

const style = StyleSheet.create({
    button: {
        backgroundColor: '#37a0bd',
        borderRadius: 100,
        marginBottom: 30,
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
      margin: 7,
      paddingLeft: 8,
    },
    })