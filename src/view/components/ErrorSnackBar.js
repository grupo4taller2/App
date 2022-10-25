import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Snackbar, Text } from 'react-native-paper';

export default function ErrorSnackBar(props) {

  return (
      <Snackbar
        visible={props.error}
        onDismiss={props.onDismissSnackBar}
        action={{
          label: 'Ok',
          onPress: () => {
            props.onDismissSnackBar();
          },
        }}
        style={props.success ? [styles.snackbar, styles.success] : styles.snackbar}>
        {props.text}
      </Snackbar>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  snackbar: {
    backgroundColor: '#D22B2B',
    alignSelf: "center"
},
  success: {
    backgroundColor: "#228b22"
  }
});
