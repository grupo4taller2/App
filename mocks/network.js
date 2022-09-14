export default class NetworkMock{
    constructor(object){
        this.callGet = object.callGet;

        this.callPost = object.callPost;
    }


    get(someRoute, somePath){
        return this.callGet(someRoute, somePath);
    }


    post(mainRoute, path, data){

        return this.callPost(mainRoute, path, data);

    }

}

