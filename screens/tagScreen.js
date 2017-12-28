import React from 'react';
import { StyleSheet, Text, View, Platform, StatusBar, AsyncStorage } from 'react-native';
const statusBarHeight = Platform.OS === 'android' ? StatusBar.currentHeight: 20;
import {connect} from 'react-redux'

class TagScreen extends React.Component {

    // getTags = (keys)=> {
    //         AsyncStorage.multiGet(keys).then?

    createTags = (key, value)=>{
        AsyncStorage.setItem(key, value)};


    render() {
        return (
            <View style={styles.container}>
                <View style={styles.container}>
                    <Text>
                        {this.props.tags.length !== 0 ? this.props.tags : 'You have no saved tags'}
                    </Text>
                </View>
                {/*<View style={styles.container}>*/}
                {/*<Text>Create Tags</Text>*/}
                {/*</View>*/}

            </View>
        );
    }
}

const mapStateToProps = (state) =>{
    return{
        tags : state.tags
    }
};

export default connect(mapStateToProps)(TagScreen);

const styles = StyleSheet.create({
    container: {
        marginTop: statusBarHeight,
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
