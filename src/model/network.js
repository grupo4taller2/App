import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

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
            return 'Invalid log in credentials'
        }

        try {
            let credencial = await signInWithEmailAndPassword(auth, credentials.email, credentials.password);
            return {credencial, result: true};
        } catch (error) {
            console.log(error);
        }

    }

}