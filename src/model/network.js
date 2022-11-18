import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import app from "../config/firebase";

const GET = "GET"
const CONTENT = 'application/json'


export default class Network{

    constructor(){

    }

    async get(mainRoute, path){
        let response = await fetch(mainRoute + path,
            {
                method: GET
            }
            ).then(async (response) => ({result: response.ok, answer: await response.json()}))
            .finally((response) => response)
            .catch((why) => ({result: false, reason: why}));
        
    
        return response
    }

    async post(mainRoute, path, data){

        let response = await fetch(mainRoute + path,
            {
                method: POST
            }
            ).then((response) => response.json()).finally((response) => response);

        return response

    }

    async tryLogin(credentials){
        const auth = getAuth();
        

        if (credentials.email === '' || credentials.password === '') {
            return {error: 'No password or E-mail provided'}
        }
        
        try {
            let credencial = await signInWithEmailAndPassword(auth, credentials.email, credentials.password);
            return {credential: credencial, result: true};
        } catch (error) {
            let error_message = "";
            
            switch (error.toString()){
                case "FirebaseError: Firebase: Error (auth/invalid-email).":
                case "FirebaseError: Firebase: Error (auth/user-not-found).":
                case "FirebaseError: Firebase: Error (auth/wrong-password).":
                    error_message = "Invalid E-mail or password";
                    break;
                default: 
                    error_message = "Something went wrong";
            }
            return {error: error_message}
        }

    }

    async signOut(context){
        context.signOut();
    }

}