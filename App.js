import React from 'react';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import allReducers from './reducers';
import AppWithNavigationState from './AppNavigator.js'
import { AppRegistry } from 'react-native';

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
