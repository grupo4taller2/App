import { StyleSheet, View } from "react-native"
import { Text } from "react-native-paper"


export default function Greet({mainText, secondaryText}){
    
    return (
        <View style={style.greetView}>
            <Text style={style.mainGreet}>
                {mainText}
            </Text>
            <Text style={style.secondaryGreet}>
                {secondaryText}
            </Text>
        </View>
    )

}

const style = StyleSheet.create({
    greetView: {
        flex: 1,
        paddingTop: 100
      },
      mainGreet: {
        textAlign: 'center',
        color: 'black',
        fontWeight: 'bold',
        fontSize: 34,
    },
    secondaryGreet: {
        textAlign: 'center',
        color: 'black',
        fontWeight: '300',
        fontSize: 24,
      },
})