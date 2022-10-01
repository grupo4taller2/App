import { useState } from "react"
import { TextInput } from "react-native-paper";
import { hideWidget } from "./textField";

export default function ConfirmableTextField(props){
    
    const info = props.text.getInfo();
    const secondaryInfo = props.text.getSecondaryInfo();

    const widgets = {
        main: props.text.hasWidget() ? props.text.makeWidget(hideWidget) : null,
        secondary: props.text.hasWidget() ? props.text.makeSecondaryWidget(hideWidget) : null,
        
    };

    return (<>
                <TextInput
                {...info} 
                {...style.textField}
                right={widgets.main}
                onChangeText={props.text.handleTextChange} />
                <TextInput
                {...secondaryInfo} 
                {...style.textField}
                right={widgets.secondary}
                onChangeText={props.text.handleSecondaryTextChange} />
            </>)
}

const style = {
    textField: {
        selectionColor: '#000000',
        activeOutlineColor: '#37a0bd',
        theme: {roundness: 30}
    }
}