import React, { Component } from 'react';
import {StyleSheet, View} from 'react-native';
import Outward from '../../controler/outward';
import TextField from './textField';
import InfoInput from '../../controler/infoInput';
import UserDriverBox from '../components/userDriverBox';
import { Text } from 'react-native-paper';


export default class UserTypeCheck extends Component {
    constructor(props) {
        super(props);

        this.state = {};

        this.state.location = new InfoInput(null, {
            label: "Default Location",
            mode: "outlined",
            style: styles.inputBox
        });
    }
    
    render() {
        <React.Fragment>
            <View style={styles.infoView}>
                <View style={styles.locationInputView} >
                    <TextField text={this.props.location} />
                </View>

            
                <UserDriverBox/>
            </View>
        </React.Fragment>
    }
}


const styles = StyleSheet.create({
  inputBox: {
      flex: 1,
      marginBottom: 100,
      minWidth: 350,
      maxHeight: 550,
      justifyContent: 'flex-start',
  },
  locationInputView: {
      flex: 1,
  },
  infoView: {
      flex: 1,
      backgroundColor: '#AA44DD',
      justifyContent: 'center',
      alignContent: 'center'
  },
})
