import React from 'react';
import {connect} from 'react-redux'
import { StyleSheet, Text, View, Platform, StatusBar, Dimensions, ScrollView, CameraRoll, Image, TouchableHighlight, Modal } from 'react-native';
const statusBarHeight = Platform.OS === 'android' ? StatusBar.currentHeight: 20;
const screenWidth = Dimensions.get('window').width;

class ImageScreen extends React.Component {
    render(){
        let photo = this.props.selectedPhoto;
        let uri = photo.node.image.uri;
        let alpha = screenWidth / photo.node.image.width;


        return(<View style={styles.container}>
                <Image style={{
                    width: screenWidth,
                    height: photo.node.image.height * alpha
                }}
                       source={{uri: uri}}/>
            </View>
        )
    }
}

const mapStateToProps = (state) =>{
    return{
        selectedPhoto : state.photoReducer.selectedPhoto
    }
};

const styles = StyleSheet.create({
    container: {
        marginTop: statusBarHeight,
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    }});

export default connect(mapStateToProps)(ImageScreen)