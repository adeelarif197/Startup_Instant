import auth, {
    checkAuth, getAuthFailed,
    getAuthSuccess,
    sendOTPFailed,
    sendOTPStart,
    sendOTPSuccess,
    updateUserSuccess
} from '../slices/authSlice'

let INITIAL_STATE = undefined;

describe('auth', () => {
    beforeEach(() => {
        INITIAL_STATE = {
            usersById: {},
            following: {
                0: {
                    ids: [],
                    next: null,
                    prev: null
                },
            },
            followers: {
                0: {
                    ids: [],
                    next: null,
                    prev: null
                },
            },
            communityMembers: {
                0: {
                    ids: [],
                    next: null,
                    prev: null
                },
            },

            loading: {
                following: false,
                followers: false,
                community: false
            },
            refreshing: {
                following: false,
                followers: false,
                community: false
            },
        }
    })

    it('should have initial state', () => {
        expect(auth(INITIAL_STATE, {})).toEqual(INITIAL_STATE);
    });

    describe('Fetch Users Success', () => {
        it('should set users', () => {
            let users = {
                1:{},
                2:{},
            }
            expect(auth(INITIAL_STATE, {users:users}).users).toEqual(users);
        });
        it('should add a user to users', () => {
            expect(auth(INITIAL_STATE, {})).toEqual(INITIAL_STATE);
        });
    })


})
