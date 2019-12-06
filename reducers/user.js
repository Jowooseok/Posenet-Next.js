const dummyUser = {
    nickname: 'Jrun2ng',
    Post: [],
    Follwoings: [],
    Follwowers: [],
    id: 1,
}

export const initialState = { //초기 값
    isLoggedIn: false, //로그인 여부
    isLoggingOut: false, //로그아웃 시도중
    isLoggingIn: false, //로그인 시도중
    logInErrorReason: '', //로그인 실패 사유
    isSignedUp : false, //회원가입 성공
    isSigningUp: false, //회원가입 시도중
    signUpErrorReason: '', //회원가입 실패 사유
    me : null, 
    followingList: [], //팔로잉 리스트
    followerList: [], //팔로워 리스트
    userInfo : null, //남의 정보
};

//------------setState

//비동기 액션에 좋음
export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST'; //액션의 이름
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE';

export const LOG_IN_REQUEST = 'LOG_IN_REQUEST';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE'; 

export const LOG_OUT_REQUEST = 'LOG_OUT_REQUEST';
export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS';
export const LOG_OUT_FAILURE = 'LOG_OUT_FAILURE';

export const LOAD_FOLLOW_REQUEST = 'LOAD_FOLLOW_REQUEST'; //팔로우 불러오기
export const LOAD_FOLLOW_SUCCESS = 'LOAD_FOLLOW_SUCCESS';
export const LOAD_FOLLOW_FAILURE = 'LOAD_FOLLOW_FAILURE';

export const FOLLOW_USER_REQUEST = 'FOLLOW_USER_REQUEST'; //팔로워 하기
export const FOLLOW_USER_SUCCESS = 'FOLLOW_USER_SUCCESS'; 
export const FOLLOW_USER_FAILURE = 'FOLLOW_USER_FAILURE'; 

export const UNFOLLOW_USER_REQUEST = 'UNFOLLOW_USER_REQUEST'; //팔로우 해제
export const UNFOLLOW_USER_SUCCESS = 'UNFOLLOW_USER_SUCCESS'; 
export const UNFOLLOW_USER_FAILURE = 'UNFOLLOW_USER_FAILURE'; 

export const REMOVE_FOLLOWER_REQUEST = 'REMOVE_FOLLOWER_REQUEST';
export const REMOVE_FOLLOWER_SUCCESS = 'REMOVE_FOLLOWER_SUCCESS';
export const REMOVE_FOLLOWER_FAILURE = 'REMOVE_FOLLOWER_FAILURE';

export const ADD_POST_TO_ME = 'ADD_POST_TOI_ME'; //리듀서의 단점때문에 어쩔수 없이 만듬


const reducer = (state = initialState, action) => { //스테이트와 액션을 받아 다음 스테이트 값을 만듬
    switch (action.type) {
        case LOG_IN_REQUEST: {
            return {
                ...state,
                isLoggingIn : true,
                logInErrorReason : '',
            }
        }
        case LOG_IN_SUCCESS: {
            return{
                ...state,
                isLoggingIn: false,
                isLoggedIn : true,
                me: dummyUser,
            }
        }
        case LOG_IN_FAILURE: {
            return{
                ...state,
                isLoggedIn : false,
                logInErrorReason : action.error,
                me: null,
            };
        }
        case LOG_OUT_REQUEST: {
            return {
                ...state,
                isLoggedIn: false,
                me: null,
            }
        }
        case SIGN_UP_REQUEST: {
            return {
                ...state,
                isSigningUp: true,
                isSignedUp : false,
                signUpErrorReason : '',
            }
        }
        case SIGN_UP_SUCCESS: {
            return {
                ...state,
                isSigningUp: false,
                isSigninedUp : true,
            }
        }
        case SIGN_UP_FAILURE: {
            return {
                ...state,
                isSigningUp: false,
                isSignedUp : false,
                signUpErrorReason : action.error,
            }
        }
        default: {
            return {
                ...state,
            }
        }
    }
};

export default reducer;