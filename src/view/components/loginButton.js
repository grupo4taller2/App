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

    return(<Button style={[props.style.singInButton]} contentStyle={props.style.signInButtonContent} labelStyle={props.style.buttonText} uppercase={false} onPress={attempLogIn}>
        "Sign in"
      </Button>)
}