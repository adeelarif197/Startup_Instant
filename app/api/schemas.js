const {schema} = require('normalizr');

export const user = new schema.Entity('users');
export const post = new schema.Entity('posts', {user: user})
export const comment = new schema.Entity('comments', {user: user})

export const community = new schema.Entity('communities')
export const communityMember = new schema.Entity('communityMembers', {user:user})
export const communityJoinRequest = new schema.Entity('communityJoinRequests', {user:user})

export const company = new schema.Entity('companies')