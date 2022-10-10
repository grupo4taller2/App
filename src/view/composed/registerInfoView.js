import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import ConfirmableTextInput from '../../controler/confirmableText';
import InfoInput from '../../controler/infoInput';
import Outward from '../../controler/outward';
import { callCallback, createStatusChanger, createStatusChangerWithChecks, register } from '../../model/status';
import { EMAILCHECK, NUMBERCHECK, USERCHECK } from '../../model/textInput';
import StatusButton from '../components/loginButton';
import RegisterInput from './registerInputView';
import UserTypeCheck from './registerUserView';

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

        this.state.error = null;

        this.state.stage = 0;

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

    failedUsername = () => {
        this.setState(this.state);
    }

    failedEmail = () => {
        this.setState(this.state);
    }

    failedPhone = () => {
        this.setState(this.state);
    }

    handlePassWordChange(newPassword){
        const password = newPassword;

        this.setState({password})
    }

    bundleChecks(){
        const userCheck = this.state.username.createCheck(USERCHECK, this.failedUsername);
        const emailCheck = this.state.email.createCheck(EMAILCHECK, this.failedEmail);
        const phoneCheck = this.state.phone.createCheck(NUMBERCHECK, this.failedPhone);

        const passwordCheck = this.state.password.getCheck();

        return (
            () => {
                let error = null;
                const user = userCheck();
                if (!user) error="Invalid username";
                const email = emailCheck();
                if(!email) error="Invalid E-mail";
                const phone = phoneCheck();
                if(!phone) error="Invalid phone";
                const password = passwordCheck();
                if(!password) error="Password should be between 8 and 16 characters";

                if(error) this.setState({error});
                return (user && email && phone && password)
            }
        )
    }

    stage = (callBack) => {
        
        return this.state.stage === 0 ? (
            <React.Fragment>
                <RegisterInput userText={this.state.username} passwordText={this.state.password} emailText={this.state.email} walletText={this.state.wallet} phoneText={this.state.phone} />
                <Text style={style.errorText}>{this.state.error}</Text>
                <StatusButton text={"Sign up"} style={style} call={callBack}/>
            </React.Fragment>) :
            <UserTypeCheck username={this.state.username} email={this.state.email}
                            phone={this.state.phone} wallet={this.state.wallet} password={this.state.password}/>
    }

    stageChangeForward = () => {
        this.state.stage += 1;
        this.setState(this.state);
    }

    stateChangeBackwards = () => {
        this.state.stage -= 1;
        this.setState(this.state);
    }

    render(){
        const callBack = createStatusChangerWithChecks(callCallback,
                                            this.stageChangeForward,
                                            {email: this.state.email,
                                            password: this.state.password},
                                            this.failedRegister,
                                            this.bundleChecks())
        
        return (
        this.stage(callBack));
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
    errorText: {
        fontWeight: "bold",
        color: "#aa0000"
      }
    })