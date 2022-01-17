// importing axios
import axios from 'axios';
//importing variables from type file
import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER,
    LOGOUT_USER,
} from './types';
//import USER_SERVER from Config file
import { USER_SERVER } from '../../App/Config/Config.js';

// So whenever the user will register on the UI, from here the request will be send to the backend part
// dataToSubmit will have all the data of the user 
export function registerUser(dataToSubmit){
    const request = axios.post(`${USER_SERVER}/register`,dataToSubmit)
        .then(response => response.data);
    
    return {
        type: REGISTER_USER,
        payload: request
    }
}

// whenever the user will loginUser on the UI, from here the request will be send to the backend part
// dataToSubmit will have all the data entered by the user
export function loginUser(dataToSubmit){
    const request = axios.post(`${USER_SERVER}/login`,dataToSubmit)
                .then(response => response.data);

    return {
        type: LOGIN_USER,
        payload: request
    }
}

// THis is the authentication part
export function auth(){
    const request = axios.get(`${USER_SERVER}/auth`)
    .then(response => response.data);

    return {
        type: AUTH_USER,
        payload: request
    }
}

// Whenever user will hit the logout button logoutUser will send the request to the backend part
export function logoutUser(){
    const request = axios.get(`${USER_SERVER}/logout`)
    .then(response => response.data);

    return {
        type: LOGOUT_USER,
        payload: request
    }
}