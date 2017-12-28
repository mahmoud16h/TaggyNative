import {combineReducers} from 'redux';
import photoReducer from './photoReducer'
import nav from './navReducer'

const allReducers = combineReducers({
    photoReducer : photoReducer,
    nav : nav
});

export default allReducers