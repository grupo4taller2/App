export const EMAILCHECK = /^\w{1,25}@\w{1,10}\.\w{3,3}(\.?\w{1,3}){0,1}/;
export const USERCHECK = /^\w{8,16}/;
export const NUMBERCHECK = /^[0-9]{5,10}/

export default class Input{
    constructor(){
        this.text = '';

        this.error = false;
    }

    setText(newText = ''){
        this.text = newText;
    }

    fail(){
        this.error = true;
    }

    unfail(){
        this.error = false;
    }

    createCheck(check, failCall){

        return (() =>{
            const result = this.check(check);

            if (!result) {
                this.fail();
                failCall();
            }else{
                this.unfail();
            }
            return result;
        })

    }   

    check(check){

        const match = this.text.match(check);

        if(!match){
            return false;
        }

        return this.text === match[0];
    }

    getText(){
        return this.text;
    }

    addInfo(object){
        object.value = this.getText();

        object.error = this.error;
    }
}