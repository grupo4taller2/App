import { useUserContext } from "./context";
import { Button } from "react-native-paper";

export default function StatusButton(props){
    const context = useUserContext();
    
    return(<Button style={[props.style.button]} contentStyle={props.style.buttonContent} 
                    labelStyle={props.style.buttonText} disabled={props.disabled} uppercase={false} onPress={()=>{ props.load(); props.call(context)}}
                    loading={props.loading}>
        {props.text}
      </Button>)
}