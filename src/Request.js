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