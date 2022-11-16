import axios from "axios";
import { getHeader } from "./status"
import {ROUTE} from "@env";

export async function getWallet(isDriver, context){
    const path = 'payments/' + retrieveUserName(context) + '/wallet';

    const unclaimed = await getUnclaimed(context);
    const data = await retrieveData(context, path);
    data.unclaimed = unclaimed.amount;
    
    return data;
    
}

async function getUnclaimed(context){
    try{
        const path = ROUTE + 'payments/' + retrieveUserName(context) + '/unclaimed/money';
        const token = getHeader(context);

        const data = (await axios.get(path, token)).data;
        
        return data;
    }catch (error){
        
        return {amount: 0}
    }

}

export async function extract(context, amount, destination){
    
    const path = ROUTE + 'payments/create/withdraw';

    const token = getHeader(context);

    await axios.post(path, {username: retrieveUserName(context), amount: amount, walletAddress: destination})

}

async function retrieveData(context, path){

    const token = getHeader(context);


    return (await axios.get(ROUTE + path, token)).data

}

function retrieveUserName(context){
    return context.userState.userInfo.username;
}