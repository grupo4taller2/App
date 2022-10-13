import React from "react";
import { StyleSheet } from "react-native";
import { Button, TextInput } from "react-native-paper";
import InfoInput from "../../controler/infoInput";
import { getUser } from "../../model/status";
import TextField from "../composed/textField";
import StatusButton from "./loginButton";

export default function UserSearch(props){

    const search = new InfoInput(null, {
        label: "User",
        mode: "outlined",
        style: [style.inputBox]
      });
    

    const doSearch = async (context) => {
        console.log(search.getText());
        //TODO: hace el search aca, si devuelve piola. Llama para arriba con el resultado
        //const searchResult = search(search.getText());
        let searchResult = null;
        try{
            searchResult = await getUser(search.getText());
        }catch{
            
        }
        if (searchResult) props.callback({user: {}, userInfo: searchResult});
        if(!searchResult) search.fail();
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
        backgroundColor: "#fff",
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