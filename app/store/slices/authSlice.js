import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {API_BASE_URL} from "../../api/constants";
import {setSession, showFlashMessage} from "../../api/helper";
import {getFileFromURI} from "../../api/utilities";


export const sendOtp = createAsyncThunk(
    'auth/sendOtp',
    ({mobile}) => axios.post(API_BASE_URL + 'auth/send-otp/', {mobile})
)
export const verifyOtp = createAsyncThunk(
    'auth/verifyOtp',
    ({mobile, otp}, thunkAPI) => axios.post(API_BASE_URL + 'auth/verify-otp/', {mobile, otp})
        .then(async res => {
            const {user, token} = res.data;
            await setSession(token)
            thunkAPI.dispatch(setUser(user))
        })
)

export const updateUser = createAsyncThunk(
    'auth/updateUser',
    (data, thunkAPI) => {
        const formData = new FormData();
        for (let key in data) {
            if (key === 'pic') {
                console.log(getFileFromURI(data.pic))
                formData.append("pic", getFileFromURI(data.pic));
            } else {
                formData.append(key, data[key])
            }
        }

        console.log(formData)
        axios.post(API_BASE_URL + 'auth/update/', formData)
            .then(async res => {
                const {user, token} = res.data;
                await setSession(token)
                showFlashMessage({message: 'Profile updated successfully'})
                thunkAPI.dispatch(setUser(user))
            }).catch(err => {
            showFlashMessage({message: err?.response?.data?.message ?? 'Something went wrong', type: 'error'})
        })
    }
)

export const autoLogin = createAsyncThunk(
    'auth/autoLogin',
    async (_, thunkAPI) => {
        console.log('Trying to do AUTO-LOGIN')
        await setSession()
        axios.get(API_BASE_URL + 'auth/get-user/')
            .then(async res => {
                const {user, token} = res.data;
                await setSession(token)
                thunkAPI.dispatch(setUser(user))
            })
    }
)

export const onLogout = createAsyncThunk(
    'auth/onLogout',
    async (_, thunkAPI) => {
        console.log('TRING TO LOGOUT')
        await setSession(null)
        thunkAPI.dispatch(setUser(null))
    }
)

const initialState = {
    user: null,
    mobile: undefined
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
        },
    },
    extraReducers: {
        [sendOtp.fulfilled]: (state, action) => {
            state.mobile = action.meta.arg.mobile
        },
    }
})

export const {setUser} = authSlice.actions;

export default authSlice.reducer;