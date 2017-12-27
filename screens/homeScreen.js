import React from 'react';
import { StyleSheet, Text, View, Platform, StatusBar, TouchableHighlight } from 'react-native';
const statusBarHeight = Platform.OS === 'android' ? StatusBar.currentHeight: 20;

class HomeScreen extends React.Component {

    render() {
        return (
           <View style={styles.container}>
               <View style={[styles.buttons, styles.searchButton]}>
                   <Text style={styles.buttonText}>Search</Text>
               </View>
               <TouchableHighlight style={styles.buttons} onPress={() => this.props.navigation.navigate('Photos')}>
                       <Text style={styles.buttonText}>Photos</Text>
               </TouchableHighlight>
               <TouchableHighlight style={styles.buttons} onPress={() => this.props.navigation.navigate('Tags')}>
                   <Text style={styles.buttonText}>Tags</Text>
               </TouchableHighlight>
           </View>
        );
    }
}

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        marginTop: statusBarHeight,
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    searchButton: {
        flexGrow: 1
    },
    buttons: {
        backgroundColor: '#1a1a1a',
        flexGrow: 4,
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
