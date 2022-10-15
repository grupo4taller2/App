import React from "react"
import { StyleSheet, View } from "react-native"
import { Button } from "react-native-paper"

export default function EditButton(props){


    return (<View style={style.editOptionWrapper}>
        <Button labelStyle={style.buttonLabel} onPress={props.callback} loading={props.loading}>
            {props.edit ? "Save" : "Edit profile"}
        </Button>
    </View>)
}

const style = StyleSheet.create({
    editOptionWrapper: {
        flex: 0.15,
        flexDirection: 'row-reverse'
    },
    buttonLabel: {
        color: '#37a0bd',
        fontSize: 20,
        fontWeight: '500',
        alignSelf: 'center',
        }
})