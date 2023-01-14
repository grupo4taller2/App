import React from 'react';
import {StyleSheet, View} from 'react-native';
import UserDriverBox from '../components/userDriverBox';
import TextFieldFunction from './textfieldFunction';


export default function UserTypeCheck(props) {

    const [firstName, setFirstName] = React.useState();
    const [firstNameError, setFirstNameError] = React.useState(false);

    const firstNameInfo = {
        label: firstNameError ? "Must have first name" : "First name",
        mode: "outlined",
        style: styles.inputBox,
        error: firstNameError
    };

    const [lastName, setlastName] = React.useState();
    const [lastNameError, setLasNameError] = React.useState(false);

    const lastNameInfo = {
        label: lastNameError ? "Must have last name" : "Last name",
        mode: "outlined",
        style: styles.inputBox,
        error: lastNameError
    };
    return(
        <React.Fragment>
            <View style={styles.infoView}>

                <View style={styles.locationInputView} >
                    <TextFieldFunction text={firstName} info={firstNameInfo} setText={setFirstName}/>
                    <TextFieldFunction text={lastName} info={lastNameInfo} setText={setlastName}/>
                </View>

                <UserDriverBox all={props} firstName={{value: firstName, errorSet: setFirstNameError}} 
                                        lastName={{value: lastName, errorSet: setLasNameError}}
                                        navigation={props.navigation}/>
                
            </View>
        </React.Fragment>
    )
}


const styles = StyleSheet.create({
  inputBox: {
    maxHeight: 60,
    margin: 10,
    paddingLeft: 8,
  },  
  locationInputView: {
      flex: 1,
      marginBottom: 10,
      justifyContent: 'center',
      minWidth: 350,
      maxHeight: 150,
      paddingLeft: 30,
      paddingRight: 30,
  },
  infoView: {
      flex: 4,      
  },
})
