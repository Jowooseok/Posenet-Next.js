import { all, fork, takeLatest, takeEvery, call, put, take, delay } from 'redux-saga/effects';
import { LOG_IN, LOG_IN_SUCCESS, LOG_IN_FAILURE } from '../reducers/user';

function loginAPI() {
    // 서버에 요청을 보내는 부분
}

function* login() { //2. 함수 실행
    try {
        yield call(loginAPI);
        yield put({ //put은 dispatch 동일
            type: LOG_IN_SUCCESS,
        })
    } catch (e) { // loginAPI 실패
        console.error(e);
        yield put({
            type: LOG_IN_FAILURE,
        })
    }
}

function* watchLogin() { // 1. 로그인 액션이 들어오는지 확인을 하고 있다가 로그인이 들어오면
    while (true) {
        yield take(LOG_IN);
        yield delay(2000);
        yield put({
            type: LOG_IN_SUCCESS,
        });
    }
}

function* watchSignUp() {

}

function* whatchHello(){
    yield takeEvery('HELLO_SAGA', function*(){
        console.log(1);
        console.log(2);
        console.log(3);
        console.log(4);
    })
}

export default function* userSaga() {
    yield all([
        watchLogin(),
        watchSignUp(),
        whatchHello(),
    ]);
}