import { SET_USER, REMOVE_USER, SET_USER_SAVED_DEVELOPERS, SET_USER_SAVED_JOBS } from './types';


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

export const setUserSavedDevelopers = (payload) => {
    return {
        type: SET_USER_SAVED_DEVELOPERS,
        payload
    };
};

export const setUserSavedJobs = (payload) => {
    return {
        type: SET_USER_SAVED_JOBS,
        payload
    };
};