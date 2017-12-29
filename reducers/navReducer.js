import {AppNavigator} from '../AppNavigator.js'
import { NavigationActions } from 'react-navigation';

const initialNavState = AppNavigator.router.getStateForAction(NavigationActions.init());

const nav = (state = initialNavState, action) => {
    const nextState = AppNavigator.router.getStateForAction(action, state);
    return nextState || state
};

export default nav;
