import React from 'react';
import {connect} from 'react-redux'
import { StyleSheet, View, Platform, StatusBar, Dimensions, Image, BackHandler, TouchableHighlight, Text, TextInput, Keyboard} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
const statusBarHeight = Platform.OS === 'android' ? StatusBar.currentHeight: 20;
const screenWidth = Dimensions.get('window').width;

class ImageScreen extends React.Component {

    state = {
        inTagMode : false,
        tags: ['foo','bar','baz']   ,
        text : ''
    }

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

    toggleTagMode = () => {
        this.setState({inTagMode : !this.state.inTagMode})
    };

    getTags = () => {
        return this.state.tags.map( (tag, index) => {
            return (<View key={index}>
                <Text style={{color: 'whitesmoke'}}>{tag}</Text>
            </View>)
        })

    };

    render(){
        let photo = this.props.selectedPhoto;
        let uri = photo.node.image.uri;
        let alpha = screenWidth / photo.node.image.width;

        return(<View style={styles.container}>
               {this.state.inTagMode &&
               <View style={styles.tagModeModal}>

                   <View style={styles.tagModeHeader}>
                       <TextInput
                          onchangetext={text => this.setState({text})}
                          value={this.state.text}
                          placeholder="add tag"
                          style={{flexGrow: 1, height: 50, borderColor: 'pink', borderWidth: 1, marginRight: 36}}
                       />
                       <TouchableHighlight onPress={this.toggleTagMode} style={{marginRight: 16}}>
                           <Ionicons name="ios-close" size={64} color="red" />
                       </TouchableHighlight>
                   </View>

                   <TouchableHighlight onPress={Keyboard.dismiss}>
                       <View >
                           {this.getTags()}
                       </View>
                   </TouchableHighlight>

               </View>
               }
               <TouchableHighlight onPress={this.toggleTagMode}>
                   <Image style={{
                       width: screenWidth,
                       height: photo.node.image.height * alpha
                   }}
                          source={{uri: uri}}/>

               </TouchableHighlight>
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
        backgroundColor: '#3d3d3d',
        alignItems: 'center',
        justifyContent: 'center'
    },
    tagModeModal: {
        position: 'absolute',
        width: screenWidth,
        height: '100%',
        backgroundColor: '#1d1d1d',
        top: 0,
        left: 0,
        zIndex: 1,
        opacity: 0.9
    },
    tagModeHeader: {
        flexDirection: 'row'
    }
});

export default connect(mapStateToProps)(ImageScreen)