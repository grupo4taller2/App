import Network from '../model/network';

import { ROUTE } from '@env';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';

const LOGINROUTE = '/users'


export default class Outward{

    constructor(route = null){
        
        this.route = route ? route : ROUTE
        this.network = new Network();

    }

    setNetwork(newCom){
        this.network = newCom;
    }

    get(route = "/"){
        
        return this.network.get(ROUTE, route);
    }

    tryLogin(usuario, contrasenia){
        let credentials = {};
        usuario.addUserTo(credentials);
        contrasenia.addPasswordTo(credentials);

        return this.network.tryLogin(credentials);
    }

    async tryRegister(usuario, contrasenia){
        let user = usuario;
        let password = contrasenia;
        const auth = getAuth();

        if (user === '' || password === ''){
            return {};
        }

        try {
            
            let result = await createUserWithEmailAndPassword(auth, user, password);
            
            return {credential: result, result: true};
          } catch (error) {
            
            return {}
        }
    }
    

}