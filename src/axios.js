import axios from "axios";

const instance = axios.create({
    baseURL: 'https://dev-per-hour-api.herokuapp.com' //the production api (cloud function) url
})

export default instance;