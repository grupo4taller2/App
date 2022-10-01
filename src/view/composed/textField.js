import React, {Component} from 'react';
import { StyleSheet } from 'react-native';
import { TextInput } from "react-native-paper";

export function hideWidget(icon, callback) {
    return <TextInput.Icon icon={icon} onPress={callback} />
}

export default class TextField extends Component{

    constructor(props){
        super(props);

        this.state = {};

        this.state.text = props.text;

        this.handleChange = this.handleChange.bind(this);

        this.state.text.setNotifyCallback(this.handleChange);
    }

    handleChange(newState){
        let text = newState;

        this.setState({text});
    }

    getHideWidget = () => {
        if(this.state.text.hasWidget()){
            return this.state.text.makeWidget(hideWidget);
        }   

        return null;
    }

    render(){

        let info = this.state.text.getInfo();

        if (this.props.disabled) {
            return (<TextInput
                {...info} 
                {...style.textField}
                disabled={true}
                right={this.getHideWidget()}
                onChangeText={this.state.text.handleTextChange} />)
        }

        return (<TextInput
            {...info} 
            {...style.textField}
            right={this.getHideWidget()}
            onChangeText={this.state.text.handleTextChange} />)
    }

}

const style = {
    textField: {
        selectionColor: '#000000',
        activeOutlineColor: '#37a0bd',
        
        theme: {roundness: 30, colors: {background: "#eaeaba"}},
    }
}