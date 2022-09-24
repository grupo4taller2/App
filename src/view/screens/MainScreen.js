import React from "react";
import { UserContext, useUserContext } from "../components/context";
import HomeScreen from "./HomeScreen";
import LoginScreen from "./LoginScreen";

export default function MainScreen({navigation}){
    const context = useUserContext();

    return (
        
        context.userState.user ? <HomeScreen navigation={navigation} /> : <LoginScreen navigation={navigation} />
    )
}