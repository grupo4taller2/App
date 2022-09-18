import fetch from 'node-fetch';
import Network from '../model/network';

import {ROUTE} from '@env';

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

        return this.network.tryLogin(ROUTE, LOGINROUTE + "/", credentials);
    }

}