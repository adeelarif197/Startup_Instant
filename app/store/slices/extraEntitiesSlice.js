import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

export const getPostCategories = createAsyncThunk(
    'extraEntities/getPostCategories',
    (_, thunkAPI) => axios.get('entities/post-categories')
        .then(res => thunkAPI.fulfillWithValue(res.data.results))
)

export const getCommunityCategories = createAsyncThunk(
    'extraEntities/getCommunityCategories',
    (_, thunkAPI) => axios.get('entities/community-categories')
        .then(res => thunkAPI.fulfillWithValue(res.data.results))
)

export const getCompanyCategories = createAsyncThunk(
    'extraEntities/getCompanyCategories',
    (_, thunkAPI) => axios.get('entities/company-categories')
        .then(res => thunkAPI.fulfillWithValue(res.data.results))
)

export const getRoles = createAsyncThunk(
    'extraEntities/getRoles',
    (_, thunkAPI) => axios.get('entities/roles/')
        .then(res => thunkAPI.fulfillWithValue(res.data.results))
)
export const getInterests = createAsyncThunk(
    'extraEntities/getInterests',
    (_, thunkAPI) => axios.get('entities/interests/')
        .then(res => thunkAPI.fulfillWithValue(res.data.results))
)
export const getLookingFor = createAsyncThunk(
    'extraEntities/getLookingFor',
    (_, thunkAPI) => axios.get('entities/looking-for/')
        .then(res => thunkAPI.fulfillWithValue(res.data.results))
)

const initialState = {
    postCategories: [],
    communityCategories: [],
    companyCategories: [],
    roles:[],
    interests:[],
    lookingFor:[]
}

const extraEntitiesSlice = createSlice({
    name: 'extraEntities',
    initialState,
    extraReducers: {
        [getPostCategories.fulfilled]: (state, action) => {
            state.postCategories = action.payload
        },
        [getCommunityCategories.fulfilled]: (state, action) => {
            state.communityCategories = action.payload
        },
        [getCompanyCategories.fulfilled]: (state, action) => {
            state.companyCategories = action.payload
        },
        [getRoles.fulfilled]: (state, action) => {
            console.log(action.payload)
            state.roles = action.payload
        },
        [getInterests.fulfilled]: (state, action) => {
            state.interests = action.payload
        },
        [getLookingFor.fulfilled]: (state, action) => {
            state.lookingFor = action.payload
        },
    }
})

export default extraEntitiesSlice.reducer