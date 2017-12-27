import React from 'react';
import { StackNavigator} from 'react-navigation';
import HomeScreen from './screens/homeScreen';
import PhotoScreen from './screens/photoScreen';
import TagScreen from './screens/tagScreen';


export default StackNavigator({
        Home: {
            screen: HomeScreen,
        },
        Photos: {
            screen: PhotoScreen,
        },
        Tags: {
            screen: TagScreen
        }
    },
    {
        headerMode: 'none',
        navigationOptions: {
            headerVisible: false,
        }
    }
);

