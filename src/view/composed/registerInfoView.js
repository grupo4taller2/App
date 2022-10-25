import React, { Component } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import ConfirmableTextInput from '../../controler/confirmableText';
import InfoInput from '../../controler/infoInput';
import Outward from '../../controler/outward';
import { callCallback, checkUserFree, createStatusChanger, createStatusChangerWithAsyncChecks, createStatusChangerWithChecks, register } from '../../model/status';
import { EMAILCHECK, NUMBERCHECK, USERCHECK } from '../../model/textInput';
import ErrorSnackBar from '../components/ErrorSnackBar';
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

        this.state.location = new InfoInput(null, {
            label: "Default Location",
            mode: "outlined",
            style: style.inputBox
        });

        this.state.error = null;

        this.state.stage = 0;
        this.state.loading = false;
        this.failedRegister = this.failedRegister.bind(this);
        this.handlePassWordChange = this.handlePassWordChange.bind(this);



        this.state.password.setNotifyCallback(this.handlePassWordChange);
    }

    handleErrorDismiss = () => {
        this.state.error = null;
        this.setState(this.state);
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
            async () => {
                let error = null;
                let user = userCheck();
                if (!user) this.state.username.changeLabel("Invalid username");
                let email = emailCheck();
                if(!email) this.state.email.changeLabel("Invalid E-mail");
                const phone = phoneCheck();
                if(!phone) this.state.phone.changeLabel("Invalid phone");
                const password = passwordCheck();
                if(!password) this.state.password.changeLabel("Is not between 8 and 16 characters");
                const freeUser = await checkUserFree(this.state.username.getText());
                if(!freeUser) {
                    error="User already exists";
                    user = false;
                    this.state.username.fail();
                }
                const freeEmail = await checkUserFree(this.state.email.getText());
                if(!freeEmail){
                    error="Mail already registered";
                    email = false;
                    this.state.email.fail();
                }

                const loading = false;

                if(error) this.setState({error, loading});
                return (user && email && phone && password)
            }
        )
    }
    
    load = () => {
        const loading = true;
        this.setState({loading})
    }

    load = () => {
        const loading = true;
        this.setState({loading})
    }

    stage = (callBack) => {
        return this.state.stage === 0 ? (
            <React.Fragment>
                <ScrollView>
                <RegisterInput userText={this.state.username} passwordText={this.state.password} emailText={this.state.email} walletText={this.state.wallet} phoneText={this.state.phone} location={this.state.location}/>
                </ScrollView>
                <StatusButton text={"Sign up"} style={style} call={callBack} load={this.load} loading={this.state.loading}/>
                <ErrorSnackBar onDismissSnackBar={this.handleErrorDismiss} error={this.state.error !== null} text={this.state.error} />
            </React.Fragment>) :
            <UserTypeCheck username={this.state.username} email={this.state.email}
                            phone={this.state.phone} wallet={this.state.wallet} password={this.state.password} location={this.state.location}/>
    }

    stageChangeForward = () => {
        this.state.stage += 1;
        this.props.textChange("Great! \nyou're almost done");
        this.setState(this.state);
    }

    stateChangeBackwards = () => {
        this.state.stage -= 1;
        this.setState(this.state);
    }

    render(){
        const callBack = createStatusChangerWithAsyncChecks(callCallback,
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