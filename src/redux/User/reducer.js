import { SET_USER, REMOVE_USER, SET_USER_SAVED_DEVELOPERS } from './types';
var moment = require('moment');

const INITIAL_STATE = {
    user: null,
    isLoggedIn: false,
    expirationDate: null
};

const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_USER:
            return {
                user: action.payload,
                isLoggedIn: true,
                expirationDate: moment().add(1, 'day').toISOString()
            };
        case REMOVE_USER:
            return {
                user: null,
                isLoggedIn: false,
                expirationDate: null
            };

        case SET_USER_SAVED_DEVELOPERS:
            let user = state.user;
            let savedDevelopers = action.payload;
            user.saved_developers = savedDevelopers;
            return {
                user: user,
                isLoggedIn: state.isLoggedIn,
                expirationDate: state.expirationDate
            };

        default: return state;
    }
};

export const selectUser = state => state.user;

export default reducer;