import React from "react";
import UserSearch from "../components/SearchInput";
import UserPublicInfo from "../components/userPublicInfo";
import ProfileTopView from "./profileTopView";

export default function ForeignProfile(props){
    const [searchResult, setSearch] = React.useState();
    

    const getResult = () => {
        
        if (!searchResult) return <UserSearch callback={setSearch}/>;

        return (
            <>
            <ProfileTopView isSearch={true} result={searchResult}/>
            <UserPublicInfo first_name={searchResult.userInfo.first_name} last_name={searchResult.userInfo.last_name}
            edit={false}/>
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