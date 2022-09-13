import React, { Component } from 'react';
import createText from './textType';
import { TextInput } from "react-native-paper";

export default class InfoInput extends Component{
    constructor(props){
        super(props);

        this.state = {
            value: ''
        };

        this.state.textType = createText(this.props.hideable);
        this.hideHandler = this.hideHandler.bind(this);
        this.update = this.update.bind(this);

        this.state.textCallback = this.state.textType.getHideWidget(this.hideHandler);

    }

    hideHandler(){
        let textType = this.state.textType.hide();

        this.setState({textType})
    }

    update(text)
    {
        let value = text;
        this.setState({value})
    }



    render(){
        return (<TextInput
            label={this.props.label}
            mode={this.props.mode}
            style={this.props.style}
            right={this.state.textCallback}
            value={this.state.textType.processText(this.state.value)}
            onChangeText={this.update} />);
    }
}