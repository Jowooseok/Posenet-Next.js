export const initialState = {
    mainExercise: [],
}

export const ADD_EXERCISE = 'ADD_EXERCISE';

export const addExercise = {
    type : ADD_EXERCISE,
};

const reducer = (state = initialState, action) => {
    switch ( action.type ){
        case ADD_EXERCISE: {
            return {
                ...state,
            };
        }
        default : {
            return{
                ...state,
            };
        }
    }
}

export default reducer;