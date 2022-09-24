// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import {APIKEY, AUTHDOMAIN, PROJECTID, BUCKET, MESSSENDER, APPID} from '@env';
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

export default app;
