import {combineReducers} from '@reduxjs/toolkit';
import auth from './slices/authSlice';
import users from './slices/usersSlice';
import posts from './slices/postsSlice';
import extraEntities from './slices/extraEntitiesSlice';
import comments from './slices/commentsSlice';
import communities from './slices/communitiesSlice';
import communityJoinRequests from './slices/communityJoinRequestsSlice';
import communityMembers from './slices/communityMembersSlice';
import companies from './slices/companiesSlice';

const createReducer = asyncReducers => (state, action) => {
    const combinedReducer = combineReducers({
        auth,
        users,
        posts,
        comments,
        communities,
        extraEntities,
        communityJoinRequests,
        communityMembers,
        companies,
        ...asyncReducers
    });

    // if (action.type === 'auth/user/userLoggedOut') {
    //     state = undefined;
    // }

    return combinedReducer(state, action);
};

export default createReducer;
