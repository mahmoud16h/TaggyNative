import React from 'react';
import { StyleSheet, Text, View, Platform, StatusBar, AsyncStorage, TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native';
const statusBarHeight = Platform.OS === 'android' ? StatusBar.currentHeight: 20;
import {connect} from 'react-redux'

class TagScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = { text: '', filteredTags: this.props.tags};
    }

    getTags = ()=>{
        return this.state.filteredTags.sort().map((tag, i)=>{
                return(
                    <Text key={i} style={styles.tags} >
                        {tag}
                    </Text>
                )
            }
        )
    };

    filterTags = (text)=> {
        let filteredTags = this.props.tags.filter((el) => {
           return el.toLowerCase().indexOf(text.toLowerCase()) > -1
        });
        this.setState({text, filteredTags});
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
