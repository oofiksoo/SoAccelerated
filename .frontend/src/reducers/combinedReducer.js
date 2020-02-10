import * as types from "../actions/actionTypes";

export const initialState = {
    username: "",
    password: "",
    userid: [],
    projects: [],
    image_file: null,
    profile: {},
    error: "",
    logintransaction: false,
    profiletransaction: false,
    profilepictransaction: false,
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
        case types.GET_PROFILE:
            return {
                ...state,
                profiletransaction: false,
                profile: {},
                error: ""
            };
        case types.GET_PROFILE_SUCCESS:
            return {
                ...state,

                profiletransaction: true,

                error: "",

                profile: {...state.profile, ...action.payload }
            };

        case types.GET_PROFILE_FAILED:
            return {
                ...state,

                profiletransaction: false,

                error: action.payload
            };
        case types.GET_PROFILE_PIC:
            return {
                ...state,
                profilepictransaction: false,
                image_file: null,
                error: ""
            };
        case types.GET_PROFILE_PIC_SUCCESS:
            return {
                ...state,

                profilepictransaction: true,

                error: "",

                image_file: [...state.image_file, ...action.payload]
            };

        case types.GET_PROFILE_PIC_FAILED:
            return {
                ...state,

                profilepictransaction: false,

                error: action.payload
            };
        default:
            return state;
    }
};

export default [combinedReducer, initialState];