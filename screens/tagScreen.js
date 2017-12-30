import React from 'react';
import { StyleSheet, Text, View, Platform, StatusBar, AsyncStorage, Button,TextInput, TouchableWithoutFeedback, Keyboard} from 'react-native';
const statusBarHeight = Platform.OS === 'android' ? StatusBar.currentHeight: 20;
import {connect} from 'react-redux'

class TagScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = { text: '', storedTags: [], filteredTags: []};
    }

    async componentWillMount() {
        let array = [];
        Promise.all(AsyncStorage.getAllKeys().then(tagsArray => {
                return tagsArray.map(tag => {
                    array.push(tag);
                    this.setState({storedTags: array, filteredTags: array});
                });
                }
            )
        );
    }

    getTags = ()=>{
        return  this.state.filteredTags.map((tag, i) => {
            return (
                <View key={i}>
                    <Text style={styles.tags}>
                        {tag}
                    </Text>
                    <Button title='X' onPress={() => {this.deleteTag(tag)}}/>
                </View>
            )
        })
    };

    filterTags = (text)=> {
        let filteredTags = this.state.storedTags.filter((tags) => {
            return tags.toLowerCase().indexOf(text.toLowerCase()) > -1
        });
        this.setState({text, filteredTags});
    };

    saveTag = () =>{
        let tagToSave = this.state.text;
        this.state.storedTags.push(tagToSave);
        AsyncStorage.setItem(tagToSave, tagToSave);
    };

    deleteTag = (remove) =>{
        AsyncStorage.removeItem(remove);
    };

    render() {
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.container}>
                    <View style={styles.container}>
                        <View>
                            <TextInput
                                style={styles.inputStyle}
                                onChangeText={(text) => this.filterTags(text)}
                                placeholder="Search tags"
                                value={this.state.text}
                            />
                            <Button title='Save tag' onPress={this.saveTag}/>
                            <Text>{this.state.text}</Text>
                        </View>
                        {this.getTags()}
                    </View>
                </View>
            </TouchableWithoutFeedback>
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
        tags: {
            backgroundColor: "black",
            color: 'whitesmoke',
            fontSize: 30,
        },
        inputStyle: {
            height: 40,
            width:'100%',
            borderColor: 'black',
            borderWidth: 1,
            backgroundColor: 'red'}
    }
);
