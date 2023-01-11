import {createAsyncThunk, createSelector, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import _ from "lodash";
import {communityActions} from "./communitiesSlice";
import {denormalize, normalize} from "normalizr";
import {communityJoinRequest} from "../../api/schemas";
import {addUsers} from "./usersSlice";

export const getRequests = createAsyncThunk(
    'communityJoinRequests/getRequests',
    ({communityId, params}, thunkAPI) => axios.get(`communities/${communityId}/requests/`)
        .then(res => {
            const {results, next} = res.data;
            const {result, entities} = normalize(results, [communityJoinRequest])
            thunkAPI.dispatch(addUsers({byId: entities.users}))
            return thunkAPI.fulfillWithValue({byId: entities.communityJoinRequests, ids: result, next})
        })
)
export const requestAdd = createAsyncThunk(
    'communityJoinRequests/requestAdd',
    ({communityId}, thunkAPI) => axios.post(`communities/${communityId}/requests/`)
        .then(res => {
            thunkAPI.dispatch(communityActions.onAddJoinRequest({communityId, joinRequestId: res.data.id}))
        })
        .catch(err => console.log(err))
)
export const requestDelete = createAsyncThunk(
    'communityJoinRequests/requestDelete',
    ({communityId}, thunkAPI) => axios.get(`communities/${communityId}/requests/delete/`)
        .then(res => {
            thunkAPI.dispatch(communityActions.onAddJoinRequestDelete({communityId}))
        })
)
export const requestAccept = createAsyncThunk(
    'communityJoinRequests/requestAccept',
    ({id, communityId, userId}) => axios.post(`communities/${communityId}/requests/accept/`,{user:userId})
)
export const requestReject = createAsyncThunk(
    'communityJoinRequests/requestReject',
    ({id, communityId, userId}) => axios.post(`communities/${communityId}/requests/reject/`,{user:userId})
)


const initialState = {
    byId: {},
    community: {},
}

export const communityJoinRequestsSlice = createSlice({
    name: 'communityJoinRequests',
    initialState,
    extraReducers: {
        [getRequests.fulfilled]: (state, action) => {
            const {ids, byId, next} = action.payload;
            const {params, url, communityId} = action.meta.arg;
            state.byId = _.merge(state.byId, byId);
            state.community[communityId] = {
                next, params,
                ids: url ? _.union(state.community[communityId] ?? [], ids) : ids
            }
        },
        [requestAccept.fulfilled]: (state, action) => {
            const {id} = action.meta.arg
            state.byId = _.omit(state.byId, id)
            console.log('--onaccept',id, state.byId)
        },
        [requestReject.fulfilled]: (state, action) => {
            const {id} = action.meta.arg
            state.byId = _.omit(state.byId, id)
            console.log('--onreject : ',id, state.byId)
        },
    }
})

export default communityJoinRequestsSlice.reducer;

export const selectCommunityJoinRequests = createSelector(
    (state) => state.communityJoinRequests.byId,
    (state, communityId) => state.communityJoinRequests.community[communityId]?.ids ?? [],
    (state) => state.users.byId,
    (requests, ids, users) => _.compact(denormalize(ids, [communityJoinRequest], {communityJoinRequests: requests, users}))
)