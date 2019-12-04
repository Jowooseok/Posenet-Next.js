import { all, call } from 'redux-saga/effects';
import user from './user';
import exercise from './exercise';

export default function* rootSaga(){
    yield all([
        call(user),
        call(exercise),
    ])
}