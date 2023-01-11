import {createAsyncThunk, createSelector, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {denormalize, normalize} from "normalizr";
import {comment, community} from "../../api/schemas";
import {getFileFromURI} from "../../api/utilities";
import _ from "lodash";
import {showFlashMessage} from "../../api/helper";

export const getCommunities = createAsyncThunk(
    'communities/getCommunities',
    ({url, params, from}, thunkAPI) => axios.get('communities/', {params: url ? null : params})
        .then(res => {
            const {results, next} = res.data;
            const normalizedData = normalize(results, [community])
            return thunkAPI.fulfillWithValue({
                ids: normalizedData.result,
                byId: normalizedData.entities.communities,
                next
            })
        })
)

export const getCommunity = createAsyncThunk(
    'communities/getCommunity',
    (id, thunkAPI) => axios.get(`communities/${id}/`)
        .then(res => {
            const normalizedData = normalize(res.data, community)
            return thunkAPI.fulfillWithValue({
                id: normalizedData.result,
                byId: normalizedData.entities.communities,
            })
        })
)

export const createCommunity = createAsyncThunk(
    'communities/createCommunity',
    ({name, about, icon, category, cover}, thunkAPI) => {
        const fd = new FormData()
        fd.append('name', name);
        fd.append('about', about);
        fd.append('category', category);
        icon && fd.append('icon', getFileFromURI(icon))
        cover && fd.append('cover', getFileFromURI(cover))
        return axios.post('communities/', fd)
            .then(({data}) => {

                showFlashMessage({message:'Community Created Successfully'})

                const normalizedData = normalize(data, community)
                return thunkAPI.fulfillWithValue({
                    byId: normalizedData.entities.communities,
                    id:normalizedData.result
                })
            }).catch(err=>{
                showFlashMessage({message:err?.response?.data?.message??'Community Creation error'})

            })
    }
)

export const deleteCommunity = createAsyncThunk(
    'communities/deleteCommunity',
    (id) => axios.delete(`communities/${id}/`)
)
export const updateCommunity = createAsyncThunk(
    'communities/updateCommunity',
    ({id, name, about, category, icon, cover}, thunkAPI) => {
        const fd = new FormData()
        fd.append('name', name);
        fd.append('about', about);
        fd.append('category', category);
        icon && fd.append('icon', getFileFromURI(icon))
        cover && fd.append('cover', getFileFromURI(cover))

        console.log(fd)
        return axios.patch(`communities/${id}/`, fd)
            .then(({data}) => {
                showFlashMessage({message:'Community Updated Successfully'})

                const normalizedData = normalize(data, community)
                return thunkAPI.fulfillWithValue({
                    byId: normalizedData.entities.communities,
                    id:normalizedData.result
                })
            }).catch(err=>{
                showFlashMessage({message:err?.response?.data?.message??'Community updation error'})
            })
    }
)


const initialState = {
    byId: {},
    user: {},
    category: {},
    featured: {},
    search: {},
    owned: {}
}

const communitiesSlice = createSlice({
    name: 'communities',
    initialState,
    reducers: {
        leaveCommunity: (state, action) => {
            state.byId = _.update(state.byId, action.payload, item => ({...item, member: null, join_request:null}))
        },
        onAddJoinRequest:(state, action) => {
            state.byId = _.update(state.byId, action.payload.communityId, item => ({...item, join_request: action.payload.joinRequestId}))
        },
        onAddJoinRequestDelete:(state, action) => {
            state.byId = _.update(state.byId, action.payload.communityId, item => ({...item, join_request: null}))
        },
    },
    extraReducers: {
        [getCommunities.fulfilled]: (state, action) => {
            const {params, from, url} = action.meta.arg;
            const {ids, byId, next} = action.payload
            state.byId = _.merge(state.byId, byId)

            if (from === 'featured') {
                state.featured.ids = ids;
            } else if (from === 'category') {
                state.category[params.category] = {
                    next, params,
                    ids: url ? _.union(state.category[params.category] ?? [], ids) : ids
                }
            } else if (from === 'user') {
                state.user[params.user] = {
                    next, params,
                    ids: url ? _.union(state.user[params.user] ?? [], ids) : ids
                }
            } else if (from === 'search') {
                state.search.ids = url ? _.union(state.search.ids, ids) : ids
                state.search.next = next
                state.search.params = params
            } else if (from === 'owned') {
                state.owned.ids = url ? _.union(state.owned.ids, ids) : ids
                state.owned.next = next
                state.owned.params = params
            }
        },
        [getCommunity.fulfilled]: (state, action) => {
            const {byId} = action.payload;
            state.byId = _.merge(state.byId, byId)
        },
        [createCommunity.fulfilled]: (state, action) => {
            const {byId, id} = action.payload;
            state.byId = _.merge(state.byId, byId)
            state.owned.ids = _.union(state.owned.ids ?? [], [id])
        },
        [deleteCommunity.fulfilled]: (state, action) => {
            const id = action.meta.arg;
            state.byId = _.omit(state.byId, id)
        },
        [updateCommunity.fulfilled]: (state, action) => {
            const {byId} = action.payload;
            state.byId = _.merge(state.byId, byId)
        },
    }
})

export const communityActions = communitiesSlice.actions

export default communitiesSlice.reducer;

export const selectCommunitiesByCategory = createSelector(
    ({communities}) => communities.byId,
    ({communities}, catId) => communities.category[catId]?.ids ?? [],
    (communities, ids) => _.compact(denormalize(ids, [community], {communities}))
)

export const selectCommunitiesByUser = createSelector(
    ({communities}) => communities.byId,
    ({communities}, userId) => communities.user[userId]?.ids ?? [],
    (communities, ids) => _.compact(denormalize(ids, [community], {communities}))
)

export const selectFeaturedCommunities = createSelector(
    ({communities}) => communities.byId,
    ({communities}) => communities.featured?.ids ?? [],
    (communities, ids) => _.compact(denormalize(ids, [community], {communities}))
)

export const selectOwnedCommunities = createSelector(
    ({communities}) => communities.byId,
    ({communities}) => communities.owned?.ids ?? [],
    (communities, ids) => _.compact(denormalize(ids, [community], {communities}))
)

export const selectSearchCommunities = createSelector(
    ({communities}) => communities.byId,
    ({communities}) => communities.search?.ids ?? [],
    (communities, ids) => _.compact(denormalize(ids, [community], {communities}))
)


