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
            user: null,
            isNewUser: false,
            mobile: '',
            checkingAuth: true,
            progress: null // SENDING_OTP, VERIFYING_OTP, UPDATING_USER,
        };
    })

    it('should have initial state', () => {
        expect(auth(INITIAL_STATE, {})).toEqual(INITIAL_STATE);
    });

    describe('getAuthSuccess', () => {
        it('should set user', () => {
            let authedUser = {
                id: 1,
                username: 'nix',
                fullname: 'Priyanshu',
                bio: 'React is love'
            }
            expect(auth(INITIAL_STATE, getAuthSuccess({user: authedUser})).user).toEqual(authedUser);
        });
    })

    describe('sendOTPStart', () => {
        it('should set mobile', () => {
            let mobile = '9521752086'
            expect(auth(INITIAL_STATE, sendOTPStart({mobile})).mobile).toEqual(mobile);
        });
    })

    describe('sendOTPSuccess', () => {
        it('should set isNewUser:True', () => {
            let isNewUser = true
            expect(auth(INITIAL_STATE, sendOTPSuccess({isNewUser})).isNewUser).toEqual(isNewUser);
        });
        it('should set isNewUser:False', () => {
            let isNewUser = false
            expect(auth(INITIAL_STATE, sendOTPSuccess({isNewUser})).isNewUser).toEqual(isNewUser);
        });
    })

    describe('verifyOTPSuccess', () => {
        it('should set the logged in user', () => {
            expect(auth(INITIAL_STATE, {})).toEqual(INITIAL_STATE);
        });
    })

    describe('updateUserSuccess', () => {
        it('should update the user', () => {
            let updatedUser = {
                id: 1,
                username: 'nix',
                fullname: 'Priyanshu Singh',
                bio: 'React is love'
            }
            expect(auth(INITIAL_STATE, updateUserSuccess({user:updatedUser})).user).toEqual(updatedUser);
        });
    })

    describe('logoutSuccess', () => {
        it('should set the user:null', () => {
            expect(auth(INITIAL_STATE, {})).toEqual(INITIAL_STATE);
        });
    })


})
