import { SET_USER, REMOVE_USER } from './types';


export const setUser = (payload) => {
    return {
        type: SET_USER,
        payload
    };
};

export const removeUser = (payload) => {
    return {
        type: REMOVE_USER
    };
};