import { combineReducers } from 'redux';


import counterReducer from './Counter/reducer';


const rootReducer = combineReducers({

    counter: counterReducer,

});

export default rootReducer;