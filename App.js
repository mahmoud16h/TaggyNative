import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.buttons}>
            <Text style={styles.buttonText}>Search</Text>
        </View>
        <View style={styles.buttons}>
            <Text style={styles.buttonText}>Photos</Text>
        </View>
        <View style={styles.buttons}>
            <Text style={styles.buttonText}>Tags</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttons: {
      backgroundColor: '#1a1a1a',
      flexGrow: 1,
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: '#9f9f9f',
  },
  buttonText:{
        color: 'whitesmoke',
        fontSize: 20,
  }
});
