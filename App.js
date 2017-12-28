import React from 'react';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import allReducers from './reducers';
import { AppRegistry } from 'react-native';
import AppWithNavigationState from './AppNavigator.js'

class App extends React.Component {

    store = createStore(allReducers);

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
