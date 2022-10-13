import { getAuth } from "firebase/auth";
import { useUserContext } from "../view/components/context";
import {ROUTE, DRIVERREG, PASSENGERREG} from '@env'
import axios from "axios";
import { USERCHECK } from "./textInput";

export async function signIn(connection, info, failCall, context){
    
    const credentials = await connection.tryLogin(info.email, info.password);
    if (credentials.result){
        
        context.signIn(credentials.credential)
    }else{
        
        failCall(credentials.error);
    }
}

export async function register(connection, info, failCall, context){
    const result = await postNewUser(info);
    let credentials = {};
    if (result) credentials = await connection.tryRegister(info.email, info.password);
    if(result && credentials.credential){
        console.log(credentials);
        context.register(credentials.credential, result.data);
    }else{
        failCall();
    }
}

export async function callCallback(callback, info=null, failCall=null, context=null){
    callback()
}

export async function signOut(connection, info, failCall, context){
    try{
        context.signOut();
    }catch{
        console.log("Failed to signOut");
    }

}

export function createStatusChanger(call, connection, info, failCall){

    const wrapper = (context) => {
        call(connection, info, failCall, context);
    };

    return wrapper
}

export function createStatusChangerWithChecks(call, connection, info, failCall, checkCall){

    const wrapper = (context) => {
        if (checkCall()){
            call(connection, info, failCall, context);
        }
    };

    return wrapper
}

export function updateInfo(newInfo, context){
    context.update(newInfo);
}

async function postNewUser(info){
    
    const uri = ROUTE + (info.isDriver ? DRIVERREG : PASSENGERREG);
    console.log(DRIVERREG);
    console.log(PASSENGERREG);
    const result = await axios.post(uri, info.info);

    return result;
}