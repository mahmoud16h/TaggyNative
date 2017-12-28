import {combineReducers} from 'redux';
import photoReducer from './photoReducer';
import nav from './navReducer';
import tagReducer from './tagReducer'

const allReducers = combineReducers({
    photoReducer : photoReducer,
    nav : nav,
    tags : tagReducer
});

export default allReducers