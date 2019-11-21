export const initialState = { //초기 값
    isLoggedIn : false,
    user : {},
};

//------------setState

const LOG_IN = 'LOG_IN'; //액션의 이름
const LOG_OUT = 'LOG_OUT';

export const loginAction = { //액션
    type : LOG_IN,
    data: {
        nickname : 'Jrun2ng',
    },
};

export const logoutAction = {
    type : LOG_OUT,
};

const reducer = (state = initialState, action) =>{ //스테이트와 액션을 받아 다음 스테이트 값을 만듬
    switch ( action.type ){
        case loginAction : {
            return{
                ...state,
                isLoggedIn: true,
                user: action.data,
            }
        }
        case logoutAction : {
            return{
                ...state,
                isLoggedIn : false,
                user : null,
            }
        }
        default : {
            return{
                ...state,
            }
        }
    }
};

export default reducer;