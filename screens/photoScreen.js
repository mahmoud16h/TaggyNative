import React from 'react';
import {connect} from 'react-redux';
import { StyleSheet, Text, View, Platform, StatusBar, Dimensions, ScrollView, CameraRoll, Image, TouchableHighlight, BackHandler } from 'react-native';
import {Permissions } from 'expo';
import {grabPhoto} from '../actions/actions';
import { NavigationActions } from 'react-navigation';

const statusBarHeight = Platform.OS === 'android' ? StatusBar.currentHeight: 20;
const screenWidth = Dimensions.get('window').width;

class PhotoScreen extends React.Component {

    state = {
        hasCameraPermission: false,
        photos: [],
        selectedPhoto: null
    };

    componentDidMount(){
        BackHandler.addEventListener('hardwareBackPress', this.onBackPress)
    }

    componentWillUnmount(){
        BackHandler.removeEventListener('hardwareBackPress', this.onBackPress)
    }

    onBackPress = () => {
        console.log(this.props);
        this.props.navigation.goBack();
        return true;
    };

    async componentWillMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        this.setState({ hasCameraPermission: status === 'granted' });

        CameraRoll.getPhotos({
            first: 20,
            assetType: 'All'
        })
           .then(response => {
               this.setState({ text: "done", photos: response.edges });

           })
           .catch((err) => {
               console.log(err);
           });
    }

    handleImageClick = (photo) => {
        this.props.grabPhoto(photo);
        this.props.navigation.navigate('Image')
    };

    render() {
        if (this.state.hasCameraPermission === false) {
            return <Text>No access to camera</Text>;
        } else {
            return (
               <View style={styles.container}>
                   <Text>Photos</Text>
                   <ScrollView>
                       <View style={styles.imageHolder}>
                           {this.state.photos.map((photo, i) => {
                               let uri = photo.node.image.uri;
                               let imageWidth = screenWidth / 3;
                               return (<TouchableHighlight
                                     key={i}
                                     onPress={() => this.handleImageClick(photo)}>
                                      <Image
                                         style={{
                                             width: imageWidth,
                                             height: imageWidth,
                                         }}
                                         source={{uri}}
                                      />
                                  </TouchableHighlight>
                               );
                           })}
                       </View>
                   </ScrollView>
               </View>
            );
        }
    }
}

const mapDispatchToProps = (dispatch) =>{
    return {
        grabPhoto : (selectedPhoto) => dispatch(grabPhoto(selectedPhoto)),
    }
};

export default connect(null, mapDispatchToProps)(PhotoScreen);

const styles = StyleSheet.create({
    container: {
        marginTop: statusBarHeight,
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    imageHolder: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
});
