import {createAsyncThunk, createSelector, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {denormalize, normalize} from "normalizr";
import {company} from "../../api/schemas";
import _ from "lodash";
import {getFileFromURI} from "../../api/utilities";
import {showFlashMessage} from "../../api/helper";

export const getCompanies = createAsyncThunk(
    'companies/getCompanies',
    ({url, params, from = 'owned'}, thunkAPI) => axios.get(url || 'companies/', {params: url ? null : params})
        .then(res => {
            const {next, results} = res.data
            const {result, entities} = normalize(results, [company])
            console.log(params)
            return thunkAPI.fulfillWithValue({byId: entities.companies, ids: result, next})
        })
)

export const followCompany = createAsyncThunk(
    'companies/followCompany',
    (id, thunkAPI) => axios.get(`companies/${id}/follow/`)
)
export const unFollowCompany = createAsyncThunk(
    'companies/unFollowCompany',
    (id, thunkAPI) => axios.get(`companies/${id}/unfollow/`)
)

export const createCompany = createAsyncThunk(
    'companies/createCompany',
    ({name, about, icon, banner, category}, thunkAPI) => {
        const fd = new FormData()
        fd.append('name', name);
        fd.append('about', about);
        fd.append('category', category);
        icon && fd.append('icon', getFileFromURI(icon))
        banner && fd.append('banner', getFileFromURI(banner))
        return axios.post('companies/', fd)
            .then(({data}) => {
                showFlashMessage({message: 'Company Created Successfully'})
                const normalizedData = normalize(data, company)
                return thunkAPI.fulfillWithValue({
                    byId: normalizedData.entities.companies,
                    id: normalizedData.result
                })
            }).catch(err => {
                showFlashMessage({message: err?.response?.data?.message ?? 'Company Creation error'})

            })
    }
)
export const updateCompany = createAsyncThunk(
    'companies/updateCompany',
    ({
         id, name, about, icon, banner, category, email, phone, website, cin_number, date_founded
         , street, state, pincode, country, city
     }, thunkAPI) => {
        const fd = new FormData()
        fd.append('name', name);
        fd.append('about', about);
        category && fd.append('category', category);

        email && fd.append('email', email);
        phone && fd.append('phone', phone);
        website && fd.append('website', website);
        cin_number && fd.append('cin_number', cin_number);
        date_founded && fd.append('date_founded', date_founded);

        street && fd.append('address_street', street);
        state && fd.append('address_state', state);
        pincode && fd.append('address_pincode', pincode);
        country && fd.append('address_country', country);
        city && fd.append('address_city', city);


        icon && fd.append('icon', getFileFromURI(icon))
        banner && fd.append('banner', getFileFromURI(banner))

        console.log(fd)


        return axios.patch(`companies/${id}/`, fd)
            .then(({data}) => {
                showFlashMessage({message: 'Company Created Successfully'})
                const normalizedData = normalize(data, company)
                return thunkAPI.fulfillWithValue({
                    byId: normalizedData.entities.companies,
                })
            }).catch(err => {
                showFlashMessage({message: err?.response?.data?.message ?? 'Company Creation error', type: 'error'})
                return thunkAPI.rejectWithValue({})
            })
    }
)

export const deleteCompany = createAsyncThunk(
    'companies/deleteCompany',
    (id) => axios.delete(`companies/${id}/`)
)


// create company
// update company
// delete company

const initialState = {
    byId: {},
    owned: {},
    followed: {},
    search: {},
}

const companiesSlice = createSlice({
    name: 'initialState',
    initialState,
    extraReducers: {
        [getCompanies.fulfilled]: (state, action) => {
            const {url, from} = action.meta.arg;
            const {byId, ids, next} = action.payload;
            state.byId = _.merge(state.byId, byId);
            if (from === 'owned') {
                state.owned.ids = ids;
            } else if (from === 'search') {
                state.search.ids = url ? _.union(state.search.ids, ids) : ids;
                state.search.next = next
            } else if (from === 'followed') {
                state.followed.ids = ids;
            }
        },
        [followCompany.fulfilled]: (state, action) => {
            const id = action.meta.arg;
            state.byId = _.update(state.byId, id, item => ({...item, is_following: true}))
        },
        [unFollowCompany.fulfilled]: (state, action) => {
            const id = action.meta.arg;
            state.byId = _.update(state.byId, id, item => ({...item, is_following: false}))
        },

        [createCompany.fulfilled]: (state, action) => {
            const {byId, id} = action.payload;

            state.byId = _.merge(state.byId, byId);
            state.owned.ids = _.union(state.owned.ids, [id])
            console.log(byId)
        },
        [updateCompany.fulfilled]: (state, action) => {
            const {byId} = action.payload;
            state.byId = _.merge(state.byId, byId);
        },
        [deleteCompany.fulfilled]: (state, action) => {
            const id = action.meta.arg;
            state.byId = _.omit(state.byId, id)
        }
    }

})

export default companiesSlice.reducer;

export const selectOwnedCompanies = createSelector(
    (state) => state.companies.byId,
    (state) => state.companies.owned.ids ?? [],
    (companies, ids) => _.compact(denormalize(ids, [company], {companies}))
)

export const selectFollowedCompanies = createSelector(
    (state) => state.companies.byId,
    (state) => state.companies.followed.ids ?? [],
    (companies, ids) => _.compact(denormalize(ids, [company], {companies}))
)

export const selectSearchCompanies = createSelector(
    (state) => state.companies.byId,
    (state) => state.companies.search.ids ?? [],
    (companies, ids) => _.compact(denormalize(ids, [company], {companies}))
)

