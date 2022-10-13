import { StyleSheet, View } from "react-native";
import { Appbar } from "react-native-paper";
import ForeignProfile from "../composed/ForeignProfile";

export default function UserSearchView({navigation}){
    return (
        <View style={style.mainView}>
        <Appbar.Header style={{backgroundColor: "#eaeaba"}}>
              <Appbar.BackAction style={{backgroundColor: "#eaeaba"}} onPress={() => {navigation.pop()}} />
            </Appbar.Header>
        
        <ForeignProfile />
        </View>
    );
}


const style = StyleSheet.create({
    mainView: {
        flex: 1,
        backgroundColor: '#eaeaba',
    }
})