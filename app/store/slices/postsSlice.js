import {createAsyncThunk, createSelector, createSlice, nanoid} from "@reduxjs/toolkit";
import {API_BASE_URL} from "../../api/constants";
import axios from "axios";
import {denormalize, normalize} from "normalizr";
import {community, company, post, user} from "../../api/schemas";
import _ from "lodash";
import {addUsers} from "./usersSlice";
import {getFileFromURI} from "../../api/utilities";
import {showFlashMessage} from "../../api/helper";

export const getPosts = createAsyncThunk(
    'posts/getPosts',
    ({url, params, from}, thunkAPI) => axios.get(url ?? API_BASE_URL + 'posts/', {params: url ? null : params})
        .then(res => {
            const {results, next} = res.data;
            const normalizedData = normalize(results, [post])
            thunkAPI.dispatch(addUsers({
                byId: normalizedData.entities.users
            }))
            return thunkAPI.fulfillWithValue({
                ids: normalizedData.result,
                byId: normalizedData.entities.posts,
                next,
            })
        })
)

export const likePost = createAsyncThunk(
    'posts/likePost',
    ({id}) => axios.get(API_BASE_URL + `posts/${id}/like-add/`)
)
export const unlikePost = createAsyncThunk(
    'posts/unlikePost',
    ({id}) => axios.get(API_BASE_URL + `posts/${id}/like-remove/`)
)

export const createPost = createAsyncThunk(
    'posts/createPost',
    (data, thunkAPI) => {
        const formData = new FormData();
        for (let key in data) {
            if (key === 'image') {
                data.image && formData.append("image", getFileFromURI(data.image));
            } else if (key === 'video') {
                data.video && formData.append("video", getFileFromURI(data.video));
            } else {
                data[key] && formData.append(key, data[key])
            }
        }

        console.log(formData)

        return axios.post('posts/', formData)
            .then(res => {
                showFlashMessage({message: 'Post created successfully!'})
            }).catch(err => {
                showFlashMessage({message: err?.response?.data?.message ?? "Something went wrong", type: 'error'})
            })
    }
)


const initialState = {
    byId: {},

    feed: {
        ids: [],
        params: {ordering: '-id', limit: 20, feed:true}
    },
    recommendedNews: {
        ids: [],
        params: {ordering: '-id', limit: 40, recommended_news:true}
    },
    communityFeed: {
        ids: [],
        params: {ordering: '-id', limit: 20}
    },
    suggested: {
        ids: [],
        params: {ordering: '-id', limit: 20, suggested:true}
    },
    user: {
        0: {ids: []},
    },
    category: {
        0: {ids: []},
    },
    type: {
        0: {ids: []},
    },

    community: {
        0: {ids: []},
    },
    company: {
        0: {ids: []},
    },
}


const postsSlice = createSlice({
    name: 'posts',
    initialState,

    extraReducers: {
        [getPosts.fulfilled]: (state, action) => {
            const {byId, ids, next} = action.payload
            const {params, from, url} = action.meta.arg
            console.log(action)
            state.byId = _.merge(state.byId, byId)
            if (from === 'feed') {
                state.feed.params = params;
                state.feed.next = next;
                state.feed.ids = url ? _.union(state.feed.ids, ids) : _.union(ids, state.feed.ids)
            } else if (from === 'recommendedNews') {
                state.recommendedNews.params = params;
                state.recommendedNews.next = next;
                state.recommendedNews.ids = url ? _.union(state.recommendedNews.ids, ids) : _.union(ids, state.recommendedNews.ids)
            } else if (from === 'communityFeed') {
                state.communityFeed.params = params;
                state.communityFeed.next = next;
                state.communityFeed.ids = url ? _.union(state.communityFeed.ids, ids) : _.union(ids, state.communityFeed.ids)
            } else if (from === 'suggested') {
                state.suggested.params = params;
                state.suggested.next = next;
                state.suggested.ids = url ? _.union(state.suggested.ids, ids) : _.union(ids, state.suggested.ids)
                console.log(state.suggested)
            } else if (from === 'search') {
                state.search.params = params;
                state.search.next = next;
                state.search.ids = url ? _.union(state.search.ids, ids) : _.union(ids, state.search.ids)
            } else if (from === 'user') {
                state.user[params.user] = {
                    params,
                    next,
                    ids: url ? _.union(state.user[params.user]?.ids ?? [], ids) : _.union(ids, state.user[params.user]?.ids ?? [])
                }
            } else if (from === 'category') {
                state.category[params.category] = {
                    params,
                    next,
                    ids: url ? _.union(state.category[params.category]?.ids ?? [], ids) : ids
                }
            } else if (from === 'type') {
                state.type[params.type] = {
                    params,
                    next,
                    ids: url ? _.union(state.type[params.type]?.ids ?? [], ids) : ids
                }
            } else if (from === 'community') {
                state.community[params.community] = {
                    params,
                    next,
                    ids: url ? _.union(state.community[params.community]?.ids ?? [], ids) : _.union(ids, state.community[params.community]?.ids ?? [])
                }
            } else if (from === 'company') {
                state.company[params.company] = {
                    params,
                    next,
                    ids: url ? _.union(state.company[params.company]?.ids ?? [], ids) : _.union(ids, state.company[params.company]?.ids ?? [])
                }
            }
        },
        [likePost.fulfilled]: (state, action) => {
            const {id} = action.meta.arg;
            state.byId = _.update(state.byId, id, item => ({...item, is_liking: true}))
        },
        [unlikePost.fulfilled]: (state, action) => {
            const {id} = action.meta.arg;
            state.byId = _.update(state.byId, id, item => ({...item, is_liking: false}))
        },
    }

})

export default postsSlice.reducer;


export const selectFeedPosts = createSelector(
    (state) => state.posts.byId,
    (state) => state.users.byId,
    (state) => state.posts.feed.ids,
    (posts, users, ids) => denormalize(ids, [post], {posts, users})
)

export const selectCommunityFeedPosts = createSelector(
    (state) => state.posts.byId,
    (state) => state.users.byId,
    (state) => state.posts.communityFeed.ids,
    (posts, users, ids) => denormalize(ids, [post], {posts, users})
)

export const selectSuggestedPosts = createSelector(
    (state) => state.posts.byId,
    (state) => state.users.byId,
    (state) => state.posts.suggested.ids,
    (posts, users, ids) => denormalize(ids, [post], {posts, users})
)

export const selectRecommendedNews = createSelector(
    (state) => state.posts.byId,
    (state) => state.users.byId,
    (state) => state.posts.recommendedNews.ids,
    (posts, users, ids) => denormalize(ids, [post], {posts, users})
)

export const selectSearchPosts = createSelector(
    (state) => state.posts.byId,
    (state) => state.users.byId,
    (state) => state.posts.search.ids,
    (posts, users, ids) => denormalize(ids, [post], {posts, users})
)

export const selectUserPosts = createSelector(
    (state) => state.posts.byId,
    (state, userId) => state.posts.user[userId]?.ids,
    (state) => state.users.byId,
    (posts, ids, users) => denormalize(ids, [post], {posts, users})
)

export const selectCategoryPosts = createSelector(
    (state) => state.posts.byId,
    (state, catId) => state.posts.category[catId]?.ids ?? [],
    (state) => state.users.byId,
    (posts, ids, users) => denormalize(ids, [post], {posts, users})
)

export const selectTypePosts = createSelector(
    (state) => state.posts.byId,
    (state, type) => state.posts.type[type]?.ids ?? [],
    (state) => state.users.byId,
    (posts, ids, users) => denormalize(ids, [post], {posts, users})
)

export const selectCommunityPosts = createSelector(
    (state) => state.posts.byId,
    (state, communityId) => state.posts.community[communityId]?.ids ?? [],
    (state) => state.users.byId,
    (posts, ids, users) => denormalize(ids, [post], {posts, users})
)

export const selectCompanyPosts = createSelector(
    (state) => state.posts.byId,
    (state, companyId) => state.posts.company[companyId]?.ids ?? [],
    (state) => state.users.byId,
    (posts, ids, users) => denormalize(ids, [post], {posts, users})
)


// export const selectCommunityPosts = createSelector(
//     (state) => state.posts.byId,
//     (state, community) => state.posts.community[community]?.ids,
//     (state) => state.users.byId,
//     (posts, ids, users) => denormalize(ids, [post], {posts, users})
// )
//
// export const selectUserPosts = createSelector(
//     (state) => state.posts.byId,
//     (state, userId) => state.posts.user[userId]?.ids,
//     (state) => state.users.byId,
//     (posts, ids, users) => denormalize(ids, [post], {posts, users})
// )

