import React, {Component} from 'react';
import { StyleSheet } from 'react-native';
import { TextInput } from "react-native-paper";

export function hideWidget(icon, callback) {
    return <TextInput.Icon icon={icon} onPress={callback} />
}

export default function TextFieldFunction(props){


        let info = props.info;
        console.log(props);
        if (props.disabled) {
            return (<TextInput
                value={props.text}
                {...info} 
                {...style.textField}
                disabled={true}
                onChangeText={props.setText} />)
        }

        return (<TextInput
            value={props.text}
            {...info} 
            {...props.style ? props.style: style.textField}
            onChangeText={props.setText} />)

}

const style = {
    textField: {
        selectionColor: '#000',
        activeOutlineColor: '#37a0bd',

        theme: {roundness: 30, colors: {background: "#fff"}},
    }

}

