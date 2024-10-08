import axios from 'axios';

axios.defaults.baseURL='http://localhost:8080'
axios.defaults.headers.post["Content-type"] = 'application/json'

export const getAuthToken = () => {
    return window.localStorage.getItem("auth_token");
};

export const setAuthToken = (token) => {
    return window.localStorage.setItem("auth_token",token);
};

export const setBalance = (balance) => {
    return window.localStorage.setItem("balance", balance);
}

export const getBalance = () => {
    return window.localStorage.getItem("balance");
}

export const setLogout = () => {
    return window.localStorage.removeItem("auth_token");    
}

export const cleanBalance = () => {
    return window.localStorage.removeItem("balance");    
}

export const request = (method, url, data) => {
    let headers = {};
    if(getAuthToken() != null && getAuthToken() !== "null") {
        headers= {"Authorization": `Bearer ${getAuthToken()}`}
    }
    return axios({
        method: method,
        headers: headers,
        url: url,
        data: data
    });
};