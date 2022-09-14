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
    }

    getIcon(){

        return this.hidden ? 'eye-off' : 'eye';
    }

    getHideWidget(callback){
        return hideWidget(this.icon, callback);
    }

    isHideable(){
        return true;
    }

    ishidden(){
        return this.hidden;
    }
}

export class UnhideableText{

    constructor(){

    }

    hide(){
        
    }

    getIcon(){

        return null;
    }

    getHideWidget(callback){
        return null;
    }

    isHideable(){
        return false;
    }

    ishidden(){
        return false;
    }
}