import React from 'react';
import { StyleSheet, Text, View, Platform, StatusBar, AsyncStorage, Button,TextInput, TouchableOpacity,TouchableWithoutFeedback, Keyboard} from 'react-native';
const statusBarHeight = Platform.OS === 'android' ? StatusBar.currentHeight: 20;

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
        return  this.state.filteredTags.sort().map((tag, i) => {
            return (
                <View key={i} style={styles.tagsContainer}>
                    <Text style={styles.tags}>
                        {tag}
                    </Text>
                    <Button title='x' onPress={() => {this.deleteTag(tag)}}/>
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
        Keyboard.dismiss();
        let tagToSave = this.state.text;
        let array = this.state.storedTags;
        array.push(tagToSave);
        this.setState({text: '', filteredTags: array});
        AsyncStorage.setItem(tagToSave, tagToSave);
    };

    deleteTag = (remove) =>{
        AsyncStorage.removeItem(remove);
        //need to also delete tag from state so page updates
    };

    clearSearch = ()=>{
        this.setState({text: '', filteredTags: this.state.storedTags})
    };

    clearButton = () =>{
        if(this.state.text !== '')
            return (<Button title='Clear' onPress={this.clearSearch}/>)
    };

    saveButton = () =>{
        if(this.state.text !== '')
            return (<Button title='Save' onPress={this.saveTag}/>)
    };

    render() {
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.container}>
                    <View style={styles.container}>
                        <View>
                            {this.clearButton()}
                            <TextInput
                                style={styles.inputStyle}
                                onChangeText={(text) => this.filterTags(text)}
                                placeholder='Search...'
                                value={this.state.text}
                            />
                            {this.saveButton()}
                        </View>
                        {this.getTags()}
                    </View>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

export default TagScreen;

const styles = StyleSheet.create({
        container: {
            marginTop: statusBarHeight,
            flex: 1,
            backgroundColor: '#1a1a1a',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%'
        },
        tags: {
            color: 'black',
            fontSize: 30,
        },
        tagsContainer: {
            flexDirection: 'row',
            height: 40,
            justifyContent: 'center',
            margin: 4,
            padding: 3,
            borderRadius: 4,
            borderWidth: 1,
            backgroundColor: 'whitesmoke',
            borderColor: 'black',
            alignItems: 'center',
        },
        inputStyle: {
            height: 40,
            width: 100,
            borderColor: 'black',
            borderWidth: 1,
            backgroundColor: 'whitesmoke',
            padding: '2%',
            borderRadius: 40,
            margin: 10
        }
    }
);
