import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    loginMainView: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    greetView: {
      flex: 1,
      paddingTop: 100
    },
    inputView: {
      flex: 2,
      marginBottom: 100,
      minWidth: 350,
      maxHeight: 150,
      justifyContent: "flex-start"
    },
    inputBox: {
      maxHeight: 60,
      margin: 10,
      paddingLeft: 8,
    },  
    mainGreet: {
        textAlign: "center",
        color: "black",
        fontWeight: "bold",
        fontSize: 34
    },
    secondaryGreet: {
        textAlign: "center",
        color: "black",
        fontWeight: "300",
        fontSize: 24
    },
    singInButton: {
        flex: 1,
        justifyContent: "center",
        width: 350,
        maxHeight: 70,
        backgroundColor: "#37a0bd",
        borderRadius: 100,
    },
    registerNow: {
        flex: 1,
        flexDirection: "row",
        paddingBottom: 25,
        alignItems: 'flex-end'
        
    },
    buttonText: {
        color: "white",
        fontSize: 20,
        fontWeight: "500",
        alignSelf: 'center'
    },
    higlightText: {
      fontSize: 15,
      fontWeight: 'bold'
    }
  });