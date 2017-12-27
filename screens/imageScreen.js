import React from 'react';
import { StyleSheet, Text, View, Platform, StatusBar, Dimensions, ScrollView, CameraRoll, Image, TouchableHighlight, Modal } from 'react-native';
const statusBarHeight = Platform.OS === 'android' ? StatusBar.currentHeight: 20;
const screenWidth = Dimensions.get('window').width;

class ImageScreen extends React.Component {

    getImage = () => {
        let photo = this.props.selectedPhoto;
        let uri = photo.node.image.uri;
        let alpha = screenWidth / photo.node.image.width;
        return (<View style={styles.modal}>
            <Image
                style={{
                   width: screenWidth,
                   height: photo.node.image.height * alpha
               }}
                source={{uri}}/>
        </View>)
    };

    render(){
        return(<View>
                <Image/>
            </View>
        )
    }
}

export default ImageScreen