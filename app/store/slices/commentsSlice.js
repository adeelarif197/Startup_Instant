import {createAsyncThunk, createSelector, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {denormalize, normalize} from "normalizr";
import {comment, post} from "../../api/schemas";
import {addUsers} from "./usersSlice";
import _ from "lodash";
import {showFlashMessage} from "../../api/helper";

export const getComments = createAsyncThunk(
    'comments/getComments',
    ({url, params}, thunkAPI) => axios.get('comments/', {params: url ? null : params})
        .then(res => {
            const {next, results} = res.data;
            const normalized = normalize(results, [comment])
            thunkAPI.dispatch(addUsers({byId: normalized.entities.users}))
            return thunkAPI.fulfillWithValue({ids: normalized.result, byId: normalized.entities.comments, next})
        }).catch(err => {
            showFlashMessage({message: err?.response?.data?.message ?? "Something went wrong", type: 'error'})
            return thunkAPI.rejectWithValue("Something went wrong")
        })
)

export const addComment = createAsyncThunk(
    'comments/addComment',
    ({post, text}, thunkAPI) => {
        const data = new FormData();
        data.append('post', post)
        data.append('content', text)
        console.log(data)
        return axios.post('comments/', data)
            .then(res => {
                showFlashMessage({message: "Comment Added"})

                const normalized = normalize(res.data, comment)
                thunkAPI.dispatch(addUsers({byId: normalized.entities.users}))
                return thunkAPI.fulfillWithValue({byId: normalized.entities.comments, id: normalized.result})
            }).catch(err => {
                showFlashMessage({message: err?.response?.data?.message ?? "Something went wrong", type: 'error'})
                return thunkAPI.rejectWithValue("Something went wrong")
            })
    }
)

export const removeComment = createAsyncThunk(
    'comments/removeComment',
    (id) => axios.delete(`comments/${id}/`)
)

const initialState = {
    byId: {},
    post: {}
}

const commentsSlice = createSlice({
    name: 'comments',
    initialState,
    extraReducers: {
        [getComments.fulfilled]: (state, action) => {
            console.log(action)
            const {byId, ids, next} = action.payload;
            const {url, params} = action.meta.arg;
            state.byId = _.merge(state.byId, byId)

            console.log(params)

            state.post[params.post] = {
                next,
                params,
                ids: url ? _.union(state.post[params.post]?.ids ?? [], ids) : ids
            }
            // console.log(state.comments[params.post])
        },
        [addComment.fulfilled]: (state, action) => {
            const {id, byId} = action.payload;
            console.log(id, byId)
            const {post: postId} = action.meta.arg
            state.byId = _.merge(state.byId, byId)
            state.post[postId] = {
                ...state.post[postId],
                ids: _.union([id], state.post[postId]?.ids ?? [])
            }
        },
        [removeComment.fulfilled]: (state, action) => {
            const {id} = action.meta.arg;
            state.byId = _.omit(state.byId, id)
        }
    }
})

export default commentsSlice.reducer

export const selectComments = createSelector(
    (state) => state.comments.byId,
    (state, postId) => state.comments.post[postId]?.ids ?? [],
    (state) => state.users.byId,
    (comments, ids, users) => denormalize(ids, [comment], {comments, users})
)