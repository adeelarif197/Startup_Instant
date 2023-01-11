import React, {useState} from 'react';
import Router from "./app/Router";

import {Provider} from "react-redux";
import AppLoading from "expo-app-loading";
import axios from "axios";
import {API_BASE_URL} from "./app/api/constants";
import {autoLogin, onLogout} from "./app/store/slices/authSlice";
import store from "./app/store";

const App = () => {

    const [isReady, setIsReady] = useState(false)

    const _startupTasks = async () => {
        store.dispatch(autoLogin());

        axios.defaults.baseURL = API_BASE_URL;
        axios.interceptors.response.use(
            response => response,
            error => {
                console.log(error)
                if (error.response?.status === 401) store.dispatch(onLogout());
                return Promise.reject(error);
            });
        return true;
    }

    if (!isReady) {
        return (
            <AppLoading
                startAsync={_startupTasks}
                onFinish={() => setIsReady(true)}
                onError={console.warn}
            />
        );
    }

    return (
        <Provider store={store}>
            <Router/>
        </Provider>
    );
}

export default App;
