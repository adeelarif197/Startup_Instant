import {createAsyncThunk, createSelector, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {communityMember} from "../../api/schemas";
import {denormalize, normalize} from "normalizr";
import {addUsers} from "./usersSlice";
import _ from "lodash";
import {communityActions} from "./communitiesSlice";

export const getMembers = createAsyncThunk(
    'communityMembers/getMembers',
    ({communityId, url, params}, thunkAPI) =>
        axios.get(url ?? `communities/${communityId}/members/`, {params: url ? null : params})
            .then(res => {
                const normalized = normalize(res.data.results, [communityMember])
                thunkAPI.dispatch(addUsers({byId: normalized.entities.users}))
                return thunkAPI.fulfillWithValue({ids: normalized.result, byId: normalized.entities.communityMembers})
            })
)

export const leave = createAsyncThunk(
    'communityMembers/leave',
    ({communityId, memberId}, thunkAPI) => axios.get(`communities/${communityId}/members/leave/`)
        .then(res => {
            thunkAPI.dispatch(communityActions.leaveCommunity(communityId))
        })
)

export const removeMember = createAsyncThunk(
    'communityMembers/remove',
    ({communityId, memberId, userId}) => axios.post(`communities/${communityId}/members/remove/`, {user:userId})
)

export const makeAdmin = createAsyncThunk(
    'communityMembers/makeAdmin',
    ({communityId, memberId, userId}) => axios.post(`communities/${communityId}/members/make-admin/`, {user:userId})
)

export const removeAdmin = createAsyncThunk(
    'communityMembers/removeAdmin',
    ({communityId, memberId, userId}) => axios.post(`communities/${communityId}/members/remove-admin/`, {user:userId})
)


const initialState = {
    byId: {},
    community: {}
}

const communityMembersSlice = createSlice({
    name: 'communityMembers',
    initialState,
    extraReducers: {
        [getMembers.fulfilled]: (state, action) => {
            const {ids, byId, next} = action.payload;
            const {url, params, communityId} = action.meta.arg;

            state.byId = _.merge(state.byId, byId)
            state.community[communityId] = {
                next, params,
                ids: url ? _.union(state.community[communityId] ?? [], ids) : ids
            }
        },
        [leave.fulfilled]: (state, action) => {
            const {memberId} = action.meta.arg;
            state.byId = _.omit(state.byId, memberId)
        },
        [removeMember.fulfilled]: (state, action) => {
            const {memberId} = action.meta.arg;
            state.byId = _.omit(state.byId, memberId)
        },
        [makeAdmin.fulfilled]: (state, action) => {
            const {memberId} = action.meta.arg;
            state.byId = _.update(state.byId, memberId, item => ({...item, is_admin: true}))
        },
        [removeAdmin.fulfilled]: (state, action) => {
            const {memberId} = action.meta.arg;
            state.byId = _.update(state.byId, memberId, item => ({...item, is_admin: false}))
        },
    },
})

export default communityMembersSlice.reducer;


export const selectCommunityMembers = createSelector(
    (state) => state.communityMembers.byId,
    (state, communityId) => state.communityMembers.community[communityId]?.ids ?? [],
    (state) => state.users.byId,
    (members, ids, users) => _.compact(denormalize(ids, [communityMember], {communityMembers: members, users}))
)