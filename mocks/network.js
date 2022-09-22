export default class NetworkMock{
    constructor(object){
        this.callGet = object.callGet;

        this.callPost = object.callPost;

        this.callLogIn = object.callLogIn;
    }


    get(someRoute, somePath){
        return this.callGet(someRoute, somePath);
    }


    post(mainRoute, path, data){

        return this.callPost(mainRoute, path, data);

    }

    tryLogin(credentials){
        return this.callLogIn(credentials)
    }
}

