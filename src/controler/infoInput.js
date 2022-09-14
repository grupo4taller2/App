import createText from '../model/textType';
import Input from '../model/textInput';


export default class InfoInput{
    constructor(isHideable = null, info = {}){
        this.text = new Input();
        this.info = info;

        this.hide = createText(isHideable);
    }

    getText(){
        return this.text.getText();
    }

    fail(){
        this.text.fail();
        this.viewCallback(this);
    }

    setNotifyCallback = (callback) => {
        this.viewCallback = callback;
    }

    handleTextChange = (newText) => {
        this.text.setText(newText);
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

        this.text.addInfo(this.info);
        this.info.secureTextEntry = this.hide.ishidden();

        return this.info;

    }

    addUserTo(credentials){
        credentials.username = this.getText();
    }

    addPasswordTo(credentials){
        credentials.password = this.getText();
    }

}