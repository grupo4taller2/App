import { StyleSheet, TouchableNativeFeedback } from "react-native"
import { Avatar, Menu, Surface } from "react-native-paper"

export function ProfileOption(props){
    return (
        <TouchableNativeFeedback>
                <Surface style={style.optionStyle} elevation={4}>
                    <Menu.Item leadingIcon={props.icon} title={props.text} style={style.optionItem}></Menu.Item>
                    <Avatar.Icon style={style.optionArrow} icon="chevron-right"/>
                </Surface>
        </TouchableNativeFeedback>
    )
}

const style = StyleSheet.create({
    optionStyle: {
        flex: 0.2,
        minWidth: 350,
        margin: 5,
        backgroundColor: "#eaeaba"
    },
    optionArrow: {
        backgroundColor: '#eaeaba',
        position: 'absolute',
        right: 0
    },
    optionItem: {
        
    }
})