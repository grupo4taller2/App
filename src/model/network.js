const GET = "GET"

export default class Network{

    constructor(){

    }

    async get(mainRoute, path){
        let response = await fetch(mainRoute + path,
            {
                method: GET
            }
            ).then((response) => response.json()).finally((response) => response);
        
    
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

}