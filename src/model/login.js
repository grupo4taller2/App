/*
    Toda la funcionalidad de logueo esta aca. 

    Se loguea asi: 
        /login
            /dia
                /hora -> Federated: Valor
                         Email: Valor
        /signup
            /dia
                /hora -> Federated: valor
                         Email: Valor

*/
import { db } from "../config/firebase";

import * as Firestore from "firebase/firestore"

const loginCollection = Firestore.collection(db, "/logins");

const signUpCollection = Firestore.collection(db, "/signup");

const activeCollection = Firestore.collection(db, '/active');

export async function logLogin(loginType){
    pipe(loginCollection, loginType);
}

export function logSignup(signupType){
    pipe(signUpCollection, signupType);
}

export function logUser(userType){
    active(userType);
}

export async function active(userType){
    const path = getDocument();

    const doc =  await getActiveDoc(path);
    const data = await doc.data();

    data[userType] += 1;

    Firestore.setDoc(doc.ref, data);

}

export async function pipe(collection, type){
    const path = getDocument();

    const doc = await getDoc(collection, path);
    const data = await doc.data();
    
    data[type] += 1;

    Firestore.setDoc(doc.ref, data);
}

async function getDoc(store, path){
    let doc = null;
    try{
        doc = await retrieveDocOrCreate(Firestore.doc(store, path));
    
        return doc;
        
    }catch (error){
        console.log(error);
    }
}

async function getActiveDoc(path){
    let doc = null;
    try{
        doc = await retrieveDocOrCreateActive(Firestore.doc(activeCollection, path));
    
        return doc;
        
    }catch (error){
        console.log(error);
    }
}


async function retrieveDocOrCreate(document, path){
    const reference = await document;
    
    let doc = await Firestore.getDoc(reference);

    if(doc.exists()){
        return doc;
    }
    
    await Firestore.setDoc(reference, {
        "Federated": 0,
        "Email": 0,
    })
    

    return await Firestore.getDoc(reference);
}

async function retrieveDocOrCreateActive(document, path){
    const reference = await document;
    
    let doc = await Firestore.getDoc(reference);

    if(doc.exists()){
        return doc;
    }
    
    await Firestore.setDoc(reference, {
        "Driver": 0,
        "Rider": 0,
    })
    

    return await Firestore.getDoc(reference);
}

function getDocument(){
    let now = new Date().toUTCString().split(' ');
    
    return getPath(now);
}

function getPath(array){
    const hour = getHour(array[4]);
    const id = getTime(array.slice(0, 4));

    return id + '-' + hour + 'hr';
}

function getTime(time){
    const [day, number, month, year] = time;

    return getId(day, number, month, year);
}

function getHour(time){
    return time.split(':')[0];
}

function getId(day, number, month, year){
    return day.slice(0, 3) + '-' + number + '-' + month + '-' + year
}