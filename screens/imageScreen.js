import React from 'react';
import {connect} from 'react-redux'
import { StyleSheet, View, Platform, StatusBar, Dimensions, Image, BackHandler} from 'react-native';
import { NavigationActions } from 'react-navigation';
const statusBarHeight = Platform.OS === 'android' ? StatusBar.currentHeight: 20;
const screenWidth = Dimensions.get('window').width;

class ImageScreen extends React.Component {

    componentDidMount(){
        BackHandler.addEventListener('hardwareBackPress', this.onBackPress)
    }

    componentWillUnmount(){
        BackHandler.removeEventListener('hardwareBackPress', this.onBackPress)
    }

    onBackPress = () => {
        this.props.navigation.goBack();
        return true;
    };

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