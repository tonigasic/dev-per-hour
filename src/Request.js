import axios from "./axios";

export const postRequest = (path, body, resolve, reject) => {
    axios.post(path, body)
        .then((response) => {
            resolve(response);
        })
        .catch((err) => {
            if (err.response.data && typeof err.response.data === "string") {
                reject(err.response.data);
            }
            else {
                reject('Internal Server Error');
            }
        })
};

export const deleteRequest = (path, resolve, reject) => {
    axios.delete(path, {})
        .then((response) => {
            resolve(response);
        })
        .catch((err) => {
            if (err.response.data && typeof err.response.data === "string") {
                reject(err.response.data);
            }
            else {
                reject('Internal Server Error');
            }
        })
};

export const putRequest = (path, body, resolve, reject) => {
    axios.put(path, body)
        .then((response) => {
            resolve(response);
        })
        .catch((err) => {
            if (err.response.data && typeof err.response.data === "string") {
                reject(err.response.data);
            }
            else {
                reject('Internal Server Error');
            }
        })
};

export const getRequest = (path, resolve, reject) => {
    axios.get(path)
        .then((response) => {
            resolve(response);
        })
        .catch((err) => {
            if (err.response.data && typeof err.response.data === "string") {
                reject(err.response.data);
            }
            else {
                reject('Could not fetch data');
            }
        })
};