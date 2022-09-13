import { TextInput } from "react-native-paper";

export default function createText(hideable){
    if (hideable){
        return new HideableText();
    }

    return new UnhideableText();
}
export class HideableText{

    constructor(){
        this.hidden = false;
    }

    hide(){
        this.hidden = !this.hidden;

        return this;
    }

    getHideWidget(callback){
        return <TextInput.Icon icon="eye" onPress={callback}/>
    }

    processText(text){
        if (this.hidden){
            return ([...text].map(element => {
                return '*'
            }).join(''))
        }

        return text
    }

}

export class UnhideableText{

    constructor(){

    }

    hide(){
        return this;
    }

    processText(text){
        return text
    }

    getHideWidget(callback){
        return null;
    }
}