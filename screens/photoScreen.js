import React from 'react';
import {connect} from 'react-redux';
import { StyleSheet, Text, View, Platform, StatusBar, Dimensions, ScrollView, CameraRoll, Image, TouchableHighlight, Modal } from 'react-native';
import {Permissions } from 'expo';
import {testAlert} from '../actions/actions'

const statusBarHeight = Platform.OS === 'android' ? StatusBar.currentHeight: 20;
const screenWidth = Dimensions.get('window').width;

class PhotoScreen extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            hasCameraPermission: false,
            photos : [],
            selectedPhoto: null
        }
    }

    async componentWillMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        this.setState({ hasCameraPermission: status === 'granted' });

        CameraRoll.getPhotos({
            first: 20,
            assetType: 'All'
        })
           .then(response => {
               console.log(response);
               this.setState({ text: "done", photos: response.edges });

           })
           .catch((err) => {
               console.log(err);
           });
    }

    handleImageClick = (photo) => {
        console.log(photo);
        this.props.testAlert()
        this.setState({selectedPhoto : photo, showModal: true});
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
        testAlert : () => dispatch(testAlert()),
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
    modal : {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});
