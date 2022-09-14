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

    getText(){
        return this.text;
    }

    addInfo(object){
        object.value = this.getText();

        object.error = this.error;
    }
}