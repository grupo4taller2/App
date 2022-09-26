import Input from "../model/textInput";
import InfoInput from "./infoInput";

export default class ConfirmableTextInput{

    constructor(isHideable = null, info = {}){
        
        if (!info.label){
            info.label = "";
        }
        
        this.mainText = new InfoInput(isHideable, info);

        let secondaryInfo = {...info};
        secondaryInfo.label = "Confirm " + info.label;

        this.secondaryText = new InfoInput(isHideable, secondaryInfo);
    }

    getInfo(){
        return this.mainText.getInfo();
    }

    getSecondaryInfo(){
        return this.secondaryText.getInfo();
    }

    handleTextChange = (newText) => {
        this.mainText.handleTextChange(newText);
        this.compareTexts();
    }

    handleSecondaryTextChange = (newText) => {
        this.secondaryText.handleTextChange(newText);
        this.compareTexts();
    }

    setNotifyCallback = (callBack) => {
        this.callBack = callBack;
        
        this.mainText.setNotifyCallback(this.childViewCallBack);
        this.secondaryText.setNotifyCallback(this.childViewCallBack);
    }

    childViewCallBack = (someChild) => {
        
        this.callBack(this);
    }


    makeWidget(widgetCreator){
        return this.mainText.makeWidget(widgetCreator);
    }

    makeSecondaryWidget(widgetCreator){
        return this.secondaryText.makeWidget(widgetCreator);
    }

    hasWidget(){
        return this.mainText.hasWidget() && this.secondaryText.hasWidget();
    }

    assUserTo(to){
        if (!this.mainText.getInfo().error){
            to.password = this.mainText.getText();
        }    
    }

    addPaswordTo(to){
        if (!this.mainText.getInfo().error){
            to.password = this.mainText.getText();
        }
    }

    getText(){
        if(!this.mainText.getInfo().error){
            return this.mainText.getText();
        }
        return '';
    }

    fail(){
        this.mainText.fail();
        this.secondaryText.fail();
    }

    compareTexts(){
        let mainText = this.mainText.getText();
        let secondaryText = this.secondaryText.getText();
        if(mainText !== secondaryText){
            this.fail()
        }else{
            this.mainText.unfail();
            this.secondaryText.unfail();
        }

        
    }
}