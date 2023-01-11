import React from "react";
import {showMessage} from "react-native-flash-message";
import * as SecureStore from "expo-secure-store";
import axios from "axios";

export const navigationRef = React.createRef();

export const navigate = (name, params) => {
    navigationRef.current?.navigate(name, params);
}

export const showFlashMessage = ({message, type, position}) => showMessage({
    message: message,
    type: type || "info",
    position: position || "bottom",
    backgroundColor: type === "error" ? '#ff4f89' : '#19d0b4'
});

export const setSession = async (token) => {
    console.log(token, 1)
    if (token) {
        await SecureStore.setItemAsync('si_access_token', token);
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
        console.log(token, 2)

    } else if(token === undefined) {
        const token = await SecureStore.getItemAsync('si_access_token');
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
        console.log(token, 3)

    } else {
        await SecureStore.deleteItemAsync('si_access_token');
        delete axios.defaults.headers.common["Authorization"];
        console.log(token, 4)

    }
}
