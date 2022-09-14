import React, {Component} from 'react';
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

        return (<TextInput
            {...info}
            selectionColor="#000000"
            activeOutlineColor="#37a0bd"
            theme={{ roundness: 30 }} 
            right={this.getHideWidget()}
            onChangeText={this.state.text.handleTextChange} />)
    }

}