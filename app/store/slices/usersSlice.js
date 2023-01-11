import {createAsyncThunk, createSelector, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {API_BASE_URL} from "../../api/constants";
import _ from "lodash";
import {denormalize, normalize} from "normalizr";
import {user} from "../../api/schemas";
import {mapOrder} from "../../api/utilities";

// from => FEATURED, SEARCH, FOLLOWING, FOLLOWERS
// params => followers_of, following_of, search, ordering, featured_only
export const getUsers = createAsyncThunk(
    'users/getUsers',
    ({url=null, params, from}, thunkAPI) => axios.get(url || 'users/', {params: url ? null : params})
        .then(res => {
            console.log(res.data)
            return thunkAPI.fulfillWithValue(res.data)
        }).catch(err=>{
            console.log(err)
        })
)

export const getUser = createAsyncThunk(
    'users/getUser',
    ({id}, thunkAPI) => axios.get(API_BASE_URL + `users/${id}/`)
        .then((res) => thunkAPI.fulfillWithValue(res.data))
)

export const followUser = createAsyncThunk(
    'users/followUser',
    ({id}) => axios.get(API_BASE_URL + 'users/' + id + '/follow/')
)

export const unfollowUser = createAsyncThunk(
    'users/unfollowUser',
    ({id}) => axios.get(API_BASE_URL + 'users/' + id + '/unfollow/')
)

const initialState = {
    byId: {},

    featured: {
        ids: []
    },
    search: {
        ids: []
    },
    followers: {
        0: {ids: []}
    },
    following: {
        0: {ids: []}
    },
}

const usersSlice = createSlice({
    name: 'users',
    initialState,

    reducers: {
        addUsers: (state, action) => {
            const {byId} = action.payload;
            state.byId = _.merge(state.byId, byId)
        }
    },

    extraReducers: {
        [getUsers.fulfilled]: (state, action) => {
            const {results, next, previous, count} = action.payload
            const {from, params, url} = action.meta.arg
            const normalizedData = normalize(results, [user])

            state.byId = _.merge(state.byId, normalizedData.entities?.users)


            if (from === 'followers') {
                state.followers[params.followers_of] =
                    {...state.followers[params.followers_of], ids: normalizedData.result, next, previous, count}

            } else if (from === 'following') {
                state.followers[params.following_of] =
                    {...state.followers[params.following_of], ids: normalizedData.result, next, previous, count}

            } else if (from === 'search') {
                state.search.ids = url?_.union(state.search?.ids??[], normalizedData.result):normalizedData.result
                state.search = {ids:state.search.ids, next, previous, count, params}

            } else if (from === 'featured') {
                state.featured.ids = normalizedData.result
            }
        },

        [getUser.fulfilled]: (state, action) => {
            state.byId[action.payload.id] = _.merge(state.byId, action.payload)
        },

        [followUser.fulfilled]: (state, action) => {
            const {id} = action.meta.arg
            state.byId = _.update(state.byId, id, item => ({...item, is_following: true}))
        },
        [unfollowUser.fulfilled]: (state, action) => {
            const {id} = action.meta.arg
            state.byId = _.update(state.byId, id, item => ({...item, is_following: false}))
        }
    }

})
export const {addUsers} = usersSlice.actions;
export default usersSlice.reducer;

export const selectUser = createSelector(
    (state) => state.users.byId,
    (_, id) => id,
    (users, id) => users[id]
)

export const selectFollowers = createSelector(
    (state) => state.users.byId,
    (state, userId) => state.users?.followers?.[userId] ?? [],
    (usersById, ids) => _.values(_.pick(usersById, ids)).sort(mapOrder(ids, 'id'))
)
export const selectFollowing = createSelector(
    (state) => state.users.byId,
    (state, userId) => state.users?.following?.[userId] ?? [],
    (usersById, ids) => _.values(_.pick(usersById, ids)).sort(mapOrder(ids, 'id'))
)

export const selectFeaturedUsers = createSelector(
    (state) => state.users.byId,
    (state) => state.users.featured.ids,
    (usersById, ids) => _.values(_.pick(usersById, ids)).sort(mapOrder(ids, 'id'))
)
export const selectSearchUsers = createSelector(
    (state) => state.users.byId,
    (state) => state.users.search?.ids ?? [],
    (usersById, ids) => denormalize(ids, [user], {users: usersById})
)

// search
// featured