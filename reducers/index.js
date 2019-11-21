import { combineReducers } from 'redux'; 
import user from './user';
import exercise from './exercise';

const rootReducer = combineReducers({
    user,
    exercise,
});

export default rootReducer;

