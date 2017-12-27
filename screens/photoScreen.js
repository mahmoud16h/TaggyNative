import React from 'react';
import { StyleSheet, Text, View, Platform, StatusBar, Dimensions, ScrollView, CameraRoll, Image } from 'react-native';
import {Permissions } from 'expo';
const statusBarHeight = Platform.OS === 'android' ? StatusBar.currentHeight: 20;
const screenWidth = Dimensions.get('window').width;

class PhotoScreen extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            hasCameraPermission: false,
            photos : []
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

    render() {

        if (this.state.hasCameraPermission === false) {
            return <Text>No access to camera</Text>;
        } else {
            return (
               <View style={styles.container}>
                   <Text>Photos</Text>
                   <ScrollView>
                       <View style={styles.imageHolder}>
                           {this.state.photos.map((p, i) => {
                               let uri = p.node.image.uri;
                               let imageWidth = screenWidth / 3;
                               return (<Image
                                     key={i}
                                     style={{
                                         width: imageWidth,
                                         height: imageWidth,
                                     }}
                                     source={{uri}}
                                  />
                               );
                           })}
                       </View>
                   </ScrollView>
               </View>
            );
        }
    }
}

export default PhotoScreen;

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
    }
});
