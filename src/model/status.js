import { getAuth } from "firebase/auth";
import { useUserContext } from "../view/components/context";
import {ROUTE, DRIVERREG, PASSENGERREG, USERS, STATUS} from '@env'
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
    console.log(info.info.email, info.info.password);
    if (result) credentials = await connection.tryRegister(info.info.email, info.info.password);
    if(result && credentials.result){
        credentials.credential.email = info.info.email;
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

export function createStatusChangerWithAsyncChecks(call, connection, info, failCall, checkCall){

    const wrapper = async (context) => {
        if (await checkCall()){
            call(connection, info, failCall, context);
        }
    };

    return wrapper
}

export async function updateInfo(newInfo, email, context){
    try{
        const uri = ROUTE + PASSENGERREG + "/" + email + "/" + STATUS;
        console.log(uri);
        const response = await axios.patch(uri, newInfo);
        context.update();

    }catch{
        console.log("Failed to save info")
    }
}

export async function checkUserFree(user){
    
    try{
        const userResult = await getUser(user);
        
        return false;
    }catch{
        return true;
    }
}

export async function getUser(userOrEmail) {
    const uri = ROUTE + USERS + "/" + userOrEmail;
    
    const result = await axios.get(uri);
    
    if(!result) console.log("failed: ", uri);
    if (result) return result.data;
}

export async function googleGetUser(userCredential){
    const email = userCredential.user.email;
    let endResult = null;
    await generateUser(email, userCredential);

}

async function postNewUser(info){
    
    const uri = ROUTE + (info.isDriver ? DRIVERREG : PASSENGERREG);
    
    const result = await axios.post(uri, info.info);

    return result;
}

async function generateUser(email, info){
    let userInfo = null;
    let number = null;
    while (!userInfo){
        try{
            userInfo = await getUser(email);
        }catch{
            await tryGenerate(email, number, info);
        }
    }
    info.userInfo = userInfo;
}

async function tryGenerate(email, number, user){
    const info = {};
   const username = number ? email.match(/\w*/)[0]  + number.toString(): email.match(/\w*/)[0];
   info.username = username;
   info.email = email;
   let splited_name = user.user.displayName.split(' ');
   info.last_name = splited_name.pop();
   info.first_name = splited_name.reduce((first, second) => {
        return first.concat(' ', second);
   });
   info.phone_number = user.user.phoneNumber ? user.user.phoneNumber : "";
   info.wallet = "";
   info.preferred_location = "No address";
   try{
    await postNewUser({info: info, isDriver: false});
   }catch{
    number = number ? number + 1 : 0;
   }
    
}

