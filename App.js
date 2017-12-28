import React from 'react';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import allReducers from './reducers';
import { AppRegistry } from 'react-native';
import AppWithNavigationState from './AppNavigator.js'
import logger from 'redux-logger'

class App extends React.Component {

    store = createStore(
        allReducers,
        applyMiddleware(logger));

    render() {
        return (
            <Provider store={this.store}>
                <AppWithNavigationState />
            </Provider>
        );
    }
}


AppRegistry.registerComponent('TaggyNative', () => App);

export default App;
