import React from "react";
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { Appbar } from 'react-native-paper';
import UserTypeCheck from "../composed/registerUserView";


export default function RegisterInfoScreen({ navigation }) {
    return (
      <View style={style.registerInfoMainView}>
        
        <View style={style.headerView}>
            <Appbar.Header>
              <Appbar.BackAction onPress={() => {navigation.pop()}} />
            </Appbar.Header>
            <Text style={style.instructionText}>
              {"Great! \nyou're almost done"}
            </Text>
        </View>
        
        <UserTypeCheck navigation={navigation}/>

      </View>
    )
}

const style = StyleSheet.create({
  registerInfoMainView: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: 'center',
  },
  headerView: {
    flex: .95,
    flexDirection: 'row',
  },
  instructionText: {
    color: 'black',
    fontWeight: '500',
    fontSize: 24,
    paddingTop: 60,
  },
})
  