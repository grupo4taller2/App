import React from "react";
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import RegisterInfo from "../composed/registerInfoView";
import { Appbar } from 'react-native-paper';


export default function RegisterScreen({ navigation }) {
  const [headerText, setText] = React.useState('Let\'s start off \nby getting you set up');

    return (
      <View style={style.registerMainView}>
        
        <View style={style.headerView}>
            <Appbar.Header style={{backgroundColor: "#fff"}}>
              <Appbar.BackAction style={{backgroundColor: "#fff"}} onPress={() => {navigation.pop()}} />
            </Appbar.Header>
            <Text style={style.instructionText}>
              {headerText}
            </Text>
        </View>
        
        <View style={style.registerView}>
          <RegisterInfo nav={navigation} textChange={setText}/>
        </View>

      </View>
    );
  }

const style = StyleSheet.create({
  registerMainView: {
    flex: 1,
    backgroundColor: "#fff",
  },
  headerView: {
    flex: 1.55,
    flexDirection: 'row',
    backgroundColor: "#fff"
  },
  instructionText: {
    color: 'black',
    fontWeight: '500',
    fontSize: 24,
    paddingTop: 75,
  },
  registerView: {
    flex: 6,
    alignItems: 'center',
  },
})
  