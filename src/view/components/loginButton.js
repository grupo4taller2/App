import Outward from "../../controler/outward";
import { useUserContext } from "./context";
import { Button } from "react-native-paper";

export default function LoginButton(props){
    const {signIn} = useUserContext();
    const connection = new Outward();

    const attempLogIn = async () => {
        const credentials = await connection.tryLogin(props.email, props.password);
        if(credentials.result){
            signIn(credentials.credential);
        }else{
            props.failedCallback();
        }

    }

    const attempRegister = async () => {
        const credentials = await connection.tryRegister(props.email, props.password);
        
        if(credentials.result){
            signIn(credentials.credential);
        }else{
            props.failedCallback();
        }
    }

    return(<Button style={[props.style.button]} contentStyle={props.style.buttonContent} 
                    labelStyle={props.style.buttonText} uppercase={false} onPress={props.register ? attempRegister : attempLogIn}>
        {props.text}
      </Button>)
}