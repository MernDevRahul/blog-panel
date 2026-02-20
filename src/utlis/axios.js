import axios from 'axios';

const instance = axios.create({
    baseURL: "http://localhost:9206/",
    withCredentials: true,
})

export default instance;