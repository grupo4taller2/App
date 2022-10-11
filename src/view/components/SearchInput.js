import React from "react";
import { StyleSheet } from "react-native";
import { Button, TextInput } from "react-native-paper";
import InfoInput from "../../controler/infoInput";
import TextField from "../composed/textField";
import StatusButton from "./loginButton";

export default function UserSearch(props){

    const search = new InfoInput(null, {
        label: "User",
        mode: "outlined",
        style: [style.inputBox]
      });
    

    const doSearch = (context) => {
        console.log(search.getText());
        //TODO: hace el search aca, si devuelve piola. Llama para arriba con el resultado
    }

    return (
    <>
            <TextField text={search}/>
            <StatusButton style={style.buttonStyle} text={"Search"} call={doSearch}/>
    </>
    )
}

const style = StyleSheet.create({
    textStyle: {
    selectionColor: '#000',
    activeOutlineColor: '#37a0bd',

    theme: {roundness: 30}
},
    textField: {
        flex: 0.5,
        maxHeight: 50,
        marginBottom: 5,
        fontWeight: "bold",
        backgroundColor: "#eaeaba",
        alignSelf: 'center'
    },
    buttonStyle: {
        button: {
            backgroundColor: '#37a0bd',
            borderRadius: 100,
            maxWidth: 200,
            maxHeight: 100,
            alignSelf: 'center',
            margin: 15
        },
        buttonContent: {
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
            width: 200,
            height: 50,
        },
        buttonText: {
          color: 'white',
          fontSize: 16,
          fontWeight: '500',
          alignSelf: 'center',
        },
    }
})