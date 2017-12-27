import React from 'react';
import { StyleSheet, Text, View, Platform, StatusBar, AsyncStorage } from 'react-native';
const statusBarHeight = Platform.OS === 'android' ? StatusBar.currentHeight: 20;

class TagScreen extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            tags: [],
        }
    }

    // getTags = (keys)=> {
    //         AsyncStorage.multiGet(keys).then?

    createTags = (key, value)=>{
        AsyncStorage.setItem(key, value)};


    render() {
        return (
            <View style={styles.container}>
                <View style={styles.container}>
                    <Text>
                        {this.state.tags.length !== 0 ? this.state.tags : 'You have no saved tags'}
                    </Text>
                </View>
                {/*<View style={styles.container}>*/}
                {/*<Text>Create Tags</Text>*/}
                {/*</View>*/}

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
