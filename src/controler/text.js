import createText from '../model/textType';

export default class InfoInput{
    constructor(isHideable = null, info = {}){
        this.text = '';
        this.info = info;

        this.hide = createText(isHideable);
    }

    setNotifyCallback = (callback) => {
        this.viewCallback = callback;
    }

    handleTextChange = (newText) => {
        this.text = newText;
        this.viewCallback(this);
    }

    makeWidget(widgetCreator){
        return widgetCreator(this.hide.getIcon(), this.hideHandler);
    }

    hideHandler = () => {
        this.hide.hide();
        
        this.viewCallback(this);
    }

    hasWidget(){

        return this.hide.isHideable();
    }

    getInfo(){

        this.info.value = this.text;
        this.info.secureTextEntry = this.hide.ishidden();

        return this.info;

    }

}