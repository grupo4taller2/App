import axios from "axios";
import { getHeader } from "./status"
import {ROUTE} from "@env";

export async function getWallet(isDriver, context){

    return isDriver ? await getDriverWallet(context) : await getUserWallet(context)

}


async function getUserWallet(context){
    const path = 'riders/' + retrieveUserName(context) + '/wallet';

    return retrieveWallet(context, path);
}

async function getDriverWallet(context){

    const path = 'drivers/' + retrieveUserName(context) + '/wallet';

    return retrieveWallet(context, path);

}


async function retrieveWallet(context, path){

    const token = getHeader(context);


    return (await axios.get(ROUTE + path, token)).data

}

function retrieveUserName(context){
    return context.userState.userInfo.username;
}