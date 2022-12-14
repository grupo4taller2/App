import {ROUTE, DRIVERREG, PASSENGERREG, USERS, STATUS} from '@env'
import axios from "axios";
import { logLogin, logSignup } from './login';


console.log(ROUTE, DRIVERREG, PASSENGERREG, USERS, STATUS)

export async function signIn(connection, info, failCall, context){
    
    const credentials = await connection.tryLogin(info.email, info.password);

    if (credentials.result){
        logLogin("Email");
        context.signIn(credentials.credential)
    }else{
        
        failCall(credentials.error);
    }
}

export async function register(connection, info, failCall, context){

    const credentials = await connection.tryRegister(info.info.email, info.info.password);
    
    let result = {};
    
    if (credentials) result = await postNewUser(info, credentials);
    
    if(result && credentials.result){
        credentials.credential.email = info.info.email;
        logSignup("Email");
        await context.register(credentials.credential, result.data);
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
        
        const uri = ROUTE + PASSENGERREG + "/" + email + "/" + STATUS;
        const headers = getHeader(context);
        const response = await axios.patch(uri, newInfo, headers);
        
        await context.update();
}

export async function updateDriverInfo(newInfo, email, context){
    const uri = ROUTE + DRIVERREG + "/" + email + "/" + STATUS;
    
    const headers = getHeader(context);
    console.log("uri: ", uri);
    console.log("Info: ", newInfo);
    const response = await axios.patch(uri, newInfo, headers);
    
    await context.update();

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

export async function getMyInfo(userOrEmail, userState){
    const header = getToken(userState.user.stsTokenManager.accessToken);

    try{
        const uri = ROUTE + USERS + '/' + userOrEmail;
        const result = await axios.get(uri, header);
        if(result) {
            const data = await result.data;

            return data;
        }
    }catch{
        const uri = ROUTE + USERS + '/' + userOrEmail;
        const result = await axios.get(uri, header);
        if(result) {
            return result.data;
        }
    }

}

export async function googleGetUser(userCredential){
    const email = userCredential.user.email;
    let endResult = null;
    const is_new_user = await tryGetUser(email, userCredential);
    if(!is_new_user) logLogin("Federated");
    return is_new_user;
}

export async function postNewUser(info, user){
    
    const uri = ROUTE + (info.isDriver ? DRIVERREG : PASSENGERREG);

    const result = await axios.post(uri, info.info, getToken(user.credential.user.stsTokenManager.accessToken));

    return result;
}

async function tryGetUser(email, info){
    let userInfo = null;
    let number = null;
    let new_user = false;
    
    try{
        userInfo = await getUser(email);
    }catch{
        new_user = true;
    }
    
    return new_user
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
   
   info.preferred_location = "No address";

   
    
}

export function getHeader(context){
    return context.userState.user ? getToken(context.userState.user.stsTokenManager.accessToken) : null;
}

function getToken(accessToken){
    return {headers: {Authorization: `bearer ${accessToken}`}}
}
