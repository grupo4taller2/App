import React from "react";
import { StyleSheet } from "react-native";
import { getUser } from "../../model/status";
import TextFieldFunction from "../composed/textfieldFunction";
import ErrorSnackBar from "./ErrorSnackBar";
import StatusButton from "./loginButton";

export default function UserSearch(props){


    const [search, setSearch] = React.useState('');
    const [error, setError] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const load = () => {
        setLoading(true);
    }

    const searchInfo = {
        label: "User",
        mode: "outlined",
        style: [style.inputBox],
        error: error,
      };

    const doSearch = async (context) => {
        //TODO: hace el search aca, si devuelve piola. Llama para arriba con el resultado
        //const searchResult = search(search.getText());
        let searchResult = null;
        try{
            searchResult = await getUser(search);
        }catch{
            setLoading(false);
        }
        
        if (searchResult) {
            setError(false);
            console.log(searchResult);
            props.callback({user: {}, userInfo: searchResult});
        }
        if(!searchResult) {
            setError(true)
        }
        setSearch(search);
    }
    
    return (
    <>
            <TextFieldFunction text={search} setText={setSearch} info={searchInfo}/>
            <ErrorSnackBar error={error} text={"No users found for: " + search}  onDismissSnackBar={() => {setError(false)}} />
            <StatusButton style={style.buttonStyle} text={"Search"} call={doSearch} load={load} loading={loading}/>
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