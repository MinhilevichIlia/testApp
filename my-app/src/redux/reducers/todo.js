const initialState = {
    users: null,
    todo:[],
    message:null,
    edit:null,
    valueAddTodo:'',
};

export const todo = (state=initialState,action) => {
    switch(action.type) {
        case 'SET_USERS': 
            return {
                ...state,
                users: action.payload
            }
        case 'SET_TODO' :
            return {
                ...state,
                todo: action.payload
            }
        case 'SET_MESSAGE' :
            return {
                ...state,
                message: action.payload
            }
        case 'SET_EDIT' :
            return {
                ...state,
                edit: action.payload
            }
        case 'SET_VALUEADDTODO' :
            return {
                ...state,
                valueAddTodo: action.payload
            }
        default:
            return state;
    }
}
