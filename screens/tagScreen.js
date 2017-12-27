import React from 'react';
import { StyleSheet, Text, View, Platform, StatusBar } from 'react-native';
const statusBarHeight = Platform.OS === 'android' ? StatusBar.currentHeight: 20;

class TagScreen extends React.Component {

    render() {
        return (
            <View style={styles.container}>
                <Text>Tags</Text>
            </View>
        );
    }
}

export default TagScreen;

const styles = StyleSheet.create({
    container: {
        marginTop: statusBarHeight,
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
