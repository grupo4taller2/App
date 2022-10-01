import { getAuth } from "firebase/auth";
import { useUserContext } from "../view/components/context";

export async function signIn(connection, info, failCall, context){
    
    const credentials = await connection.tryLogin(info.email, info.password);
    if (credentials.result){
        
        context.signIn(credentials.credential)
    }else{
        failCall();
    }
}

export async function register(connection, info, failCall, context){
    const credentials = await connection.tryRegister(info.email, info.password);

    if(credentials.result){
        context.signIn(credentials.credential);
    }else{
        failCall();
    }
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