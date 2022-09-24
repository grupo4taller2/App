import React, { Component } from 'react';
import {StyleSheet, View} from 'react-native';
import Outward from '../../controler/outward';
import InfoInput from '../../controler/infoInput';


export default function UserDriverBox() {
    const [checked, setChecked] = React.useState(false);

    return(
        <View style={styles.infoView}>
            <Text>
                Hello
            </Text>
            <Checkbox
                status={checked ? 'checked' : 'unchecked'}
                onPress={() => {
                    setChecked(!checked);
                }}
            />
        </View>
    )
}


const styles = StyleSheet.create({
    inputView: {
        flex: 4,
        marginBottom: 100,
        minWidth: 350,
        maxHeight: 550,
        justifyContent: 'flex-start',
        flexDirection: 'row',
    },
    locationInputView: {
        flex: 1,
    },
    infoView: {
        flex: 1,
    },
  })
