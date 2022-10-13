import React from "react";
import UserSearch from "../components/SearchInput";
import UserPublicInfo from "../components/userPublicInfo";
import ProfileTopView from "./profileTopView";

export default function ForeignProfile(props){
    const [searchResult, setSearch] = React.useState({userState: {user: {}}});
    

    const getResult = (result) => {
        
        if (!result) return <UserSearch callback={setSearch}/>;

        return (
            <>
            <ProfileTopView isSearch={true} result={searchResult}/>
            <UserPublicInfo edit={false} userTypeEditable={false}/>
            </>
        );
    }

    return (
        getResult()
    )
}


//Devuelve la info de un usuario despues de una busqueda
function lookForUser(username){

    return null

}