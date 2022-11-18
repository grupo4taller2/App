import { initializeApp } from "firebase/app";
import {APIKEY, AUTHDOMAIN, PROJECTID, BUCKET, MESSSENDER, APPID} from '@env';
import * as Firestore from "firebase/firestore"

// TODO: Add SDKs for Firebase products that you want to use



// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration


const firebaseConfig = {

  apiKey: APIKEY,

  authDomain: AUTHDOMAIN,

  projectId: PROJECTID,

  storageBucket: BUCKET,

  messagingSenderId: MESSSENDER,

  appId: APPID

};



// Initialize Firebase

const app = initializeApp(firebaseConfig);

export const db = Firestore.initializeFirestore(app, {useFetchStreams: false, experimentalForceLongPolling: true});



export default app;

