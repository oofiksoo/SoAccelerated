import * as types from "../actions/actionTypes";

export const initialState = {
    username: "",
    password: "",
    userid: [],
    projects: [],
    error: "",
    logintransaction: false,
    projecttransaction: false,
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
                token: action.payload.token,
                username: action.payload.username,
                userid: action.payload.userid
            };

        case types.LOGIN_FAILED:
            return {
                ...state,

                logintransaction: false,

                error: action.payload
            };
        case types.GET_PROJECTS:
            return {
                ...state,
                projecttransaction: false,
                projects: [],
                error: ""
            };
        case types.GET_PROJECTS_SUCCESS:
            return {
                ...state,

                projecttransaction: true,

                error: "",

                projects: [...state.projects, ...action.payload]
            };

        case types.GET_PROJECTS_FAILED:
            return {
                ...state,

                projecttransaction: false,

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