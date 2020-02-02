import * as types from "./actionTypes";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import Axios from "axios";

export const userSignup = (userData, history) => dispatch => {
    axiosWithAuth()
        .post("/auth/register", userData)
        .then(res => {
            dispatch({ type: types.REGISTER });
            history.push("/login");
        })
        .catch(err => console.log(err));
};

export const userLogin = (loginData, history) => dispatch => {
    dispatch({ type: types.LOGIN });
    axiosWithAuth()
        .post("/auth/login", loginData)
        .then(res => {
            dispatch({
                type: types.LOGIN_SUCCESS,
                payload: res.data
            });
            localStorage.setItem("Authorization", res.data.token);
            history.push("/dashboard");
        })
        .catch(err => {
            dispatch({ type: types.LOGIN_FAILED, payload: err.res });
        });
};

export const userLogout = () => dispatch => {
    localStorage.removeItem("Authorization");
    Axios.get("http://localhost:5000/api/auth/logout")
        .then(res => dispatch({ type: types.LOGOUT, payload: "" }))

    .catch(err => console.log(err));
};

export const getProjectList = () => dispatch => {
    dispatch({ type: types.GET_PROJECTS });
    axiosWithAuth()
        .get("/projects")
        .then(
            res =>
            dispatch({
                type: types.GET_PROJECTS_SUCCESS,
                payload: res.data
            }) & console.log(res.data)
        )
        .catch(err => {
            dispatch({ type: types.GET_PROJECTS_FAILED, payload: err.res });
        });
};