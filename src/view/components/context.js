import { getAuth } from "firebase/auth";
import React from "react";



export const UserContext = React.createContext();


export function useUserContext(){
    const context = React.useContext(UserContext);

    if(! context){
        throw new Error("Error: Debe estar dentro del proveedor");
    }

    return context
}