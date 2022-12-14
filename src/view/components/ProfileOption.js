import { StyleSheet, TouchableNativeFeedback } from "react-native"
import { Avatar, Menu, Surface } from "react-native-paper"

export function ProfileOption(props){
    return (
        <TouchableNativeFeedback onPress={props.callback}>
                <Surface style={style.optionStyle} elevation={4}>
                    <Menu.Item leadingIcon={props.icon} title={props.text} style={style.optionItem}></Menu.Item>
                    <Avatar.Icon style={style.optionArrow} icon="chevron-right"/>
                </Surface>
        </TouchableNativeFeedback>
    )
}

const style = StyleSheet.create({
    optionStyle: {
        minWidth: '85%',        
        backgroundColor: "#fff"
    },
    optionArrow: {
        backgroundColor: '#fff',
        position: 'absolute',
        right: 0,
        maxWidth: 45,
        maxHeight: 45
    },
    optionItem: {
        
    },
})
