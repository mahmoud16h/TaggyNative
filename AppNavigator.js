import React from 'react';
import {connect} from 'react-redux';
import { StackNavigator, addNavigationHelpers } from 'react-navigation';
import HomeScreen from './screens/homeScreen';
import PhotoScreen from './screens/photoScreen';
import TagScreen from './screens/tagScreen';
import ImageScreen from './screens/imageScreen';


const AppWithNavigationState = ({ dispatch, nav }) => (
    <AppNavigator navigation={addNavigationHelpers({ dispatch, state: nav})} />
);


export const AppNavigator = StackNavigator({
        Home: {screen: HomeScreen},
        Photos: {screen: PhotoScreen},
        Tags: {screen: TagScreen},
        Image: {screen: ImageScreen}
    },
    {
        headerMode: 'none',
        navigationOptions: {
            headerVisible: false,
        }
    }
);


const mapStateToProps = (state) => ({
    nav: state.nav
});


export default connect(mapStateToProps)(AppWithNavigationState);
