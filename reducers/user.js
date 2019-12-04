export const initialState = { //초기 값
    isLoggedIn: false,
    user: {
        name: "Nodata",
    },
};

//------------setState

export const LOG_IN = 'LOG_IN'; //액션의 이름
export const LOG_OUT = 'LOG_OUT';
export const SING_UP = 'SIGN_UP';

export const signUpAction = (data) => {
    return {
        type: SING_UP,
        data: data,
    };
};

export const loginAction = { //액션
    type: LOG_IN,
    data: {
        nickname: 'Jrun2ng',
    },
};

export const logoutAction = {
    type: LOG_OUT,
};

const reducer = (state = initialState, action) => { //스테이트와 액션을 받아 다음 스테이트 값을 만듬
    switch (action.type) {
        case LOG_IN: {
            return {
                ...state,
                isLoggedIn: true,
                user: action.data,
            }
        }
        case LOG_OUT: {
            return {
                ...state,
                isLoggedIn: false,
                user: null,
            }
        }
        case SING_UP: {
            return {
                ...state,
                signUpData: action.data,
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