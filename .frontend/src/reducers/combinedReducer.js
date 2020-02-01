import * as types from "../actions/actionTypes";

export const initialState = {
    username: "",
    password: "",
    users: [],
    logintransaction: false,
    usertransaction: false,
    token: ""
};

export const combinedReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.REGISTER:
            return {...state, token: action.payload };
        case types.LOGIN:
            return {
                ...state,
                error: "",
                token: "",
                logintransaction: false
            };
        case types.LOGIN_SUCCESS:
            return {
                ...state,
                logintransaction: true,
                error: "",
                token: [...action.payload]
            };

        case types.LOGIN_FAILED:
            return {
                ...state,

                logintransaction: false,

                error: action.payload
            };
        case types.GET_USERS:
            return {
                ...state,
                usertransaction: false,
                users: [],
                error: ""
            };
        case types.GET_USERS_SUCCESS:
            return {
                ...state,

                usertransaction: true,

                error: "",

                users: [...state.users, ...action.payload]
            };

        case types.GET_USERS_FAILED:
            return {
                ...state,

                usertransaction: false,

                error: action.payload
            };
        case types.LOGOUT:
            return {
                ...state,
                token: ""
            };
        default:
            return state;
    }
};

export default [combinedReducer, initialState];