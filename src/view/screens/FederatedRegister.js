import React from 'react';
import { StyleSheet, View } from 'react-native';
import UserDriverBox from '../components/userDriverBox';
import { Appbar, Text } from 'react-native-paper';
import TextFieldFunction from '../composed/textfieldFunction';
import { useUserContext } from '../components/context';


export default function FederatedRegister(props) {

    const {federated} = useUserContext();
    const [info, setInfo] = React.useState({});
    const [username, setUserName] = React.useState('');
    const [usernameError, setUsernameError] = React.useState(false);

    const UsernameInfo = {
        label: usernameError ? "Invalid username" : "Username",
        mode: "outlined",
        style: styles.inputBox,
        error: usernameError
    };

    const [preferedAddress, setPreferredAddress] = React.useState('');
    const [preferedAddressError, setPreferredAddressError] = React.useState(false);

    const PreferredAddressInfo = {
        label: preferedAddressError ? "Must have an Address" : "Prefered location",
        mode: "outlined",
        style: styles.inputBox,
        error: preferedAddressError
    };
    
    const bundleInfo = () => {
        const bundled = {
            firstName: federated.value._tokenResponse.firstName,
            lastName: federated.value._tokenResponse.fullName.split(' ').pop(),
            email: federated.value._tokenResponse.email,
            phone: federated.value.user.phoneNumber
        };
        setInfo(bundled);
    }

    React.useEffect(() => {
        bundleInfo();
    }, [])

    return(
        <View style={styles.registerInfoMainView}>
            <View style={styles.headerView}>
            <Appbar.Header>
              <Appbar.BackAction onPress={() => {props.navigation.pop()}} />
            </Appbar.Header>
            <Text style={styles.instructionText}>
              {"Great! \nyou're almost done"}
            </Text>
            </View>

            <View style={styles.infoView}>

                <View style={styles.locationInputView} >
                    <TextFieldFunction text={username} info={UsernameInfo} setText={setUserName}/>
                    <TextFieldFunction text={preferedAddress} info={PreferredAddressInfo} setText={setPreferredAddress}/>
                </View>

                <UserDriverBox username={username} location={preferedAddress} email={info.email}
                                usernameError={setUsernameError} locationError={setPreferredAddressError} 
                                firstName={info.firstName} lastName={info.lastName} phone={info.phone}
                                isFederated={true} federatedValue={federated.value}
                                navigation={props.navigation}/>
                
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    registerInfoMainView: {
        flex: 1,
        backgroundColor: "#fff",
        justifyContent: 'center',
      },
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
  headerView: {
    flex: .95,
    flexDirection: 'row',
    backgroundColor: "#fff"
  },
  instructionText: {
    color: 'black',
    fontWeight: '500',
    fontSize: 24,
    paddingTop: 60,
  },
})
