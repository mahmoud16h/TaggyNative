import React from 'react';
import { StyleSheet, Text, View, Platform, StatusBar } from 'react-native';
const statusBarHeight = Platform.OS === 'android' ? StatusBar.currentHeight: 20;

class PhotoScreen extends React.Component {

    render() {
        return (
            <View style={styles.container}>
                    <Text>Photos</Text>
            </View>
        );
    }
}

export default PhotoScreen;

const styles = StyleSheet.create({
    container: {
        marginTop: statusBarHeight,
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
