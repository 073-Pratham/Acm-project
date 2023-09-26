import axios from "axios";

import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAIL,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,
    LOGOUT_FAIL,
    LOGOUT_SUCCESS,
    UPDATE_NAME_REQUEST,
    UPDATE_NAME_SUCCESS,
    UPDATE_NAME_FAIL,
    UPDATE_EMAIL_REQUEST,
    UPDATE_EMAIL_SUCCESS,
    UPDATE_EMAIL_FAIL,
    UPDATE_COLLEGENAME_REQUEST,
    UPDATE_COLLEGENAME_SUCCESS,
    UPDATE_COLLEGENAME_FAIL,
    CLEAR_ERRORS
} from "../constants/UserConstant"

// LOGIN
export const login = (email , password) => async(dispatch) => {
    try{
        dispatch({
            type: LOGIN_REQUEST
        });

        let link = `/acm/login`;
        const config = { headers: { "Content-Type" : "application/json"}};

        const {data} = await axios.post(link , {email , password} , config);

        dispatch({
            type: LOGIN_SUCCESS,
            payload: data.user, 
        });

    } catch(error) {
        dispatch({
            type: LOGIN_FAIL,
            payload: error.response.data.message,
        })
    }
}

// REGISTER
export const register = (firstName , lastName , email , password ,collegeName) => async(dispatch) => {
    try{
        dispatch({
            type: REGISTER_USER_REQUEST
        });

        let link = `/acm/create/account`;
        const config = { headers: { "Content-Type" : "application/json"}};

        const {data} = await axios.post(link ,{ firstName , lastName , email , password ,collegeName } , config);

        dispatch({
            type: REGISTER_USER_SUCCESS,
            payload: data.user, 
        });

    } catch(error) {
        dispatch({
            type: REGISTER_USER_FAIL,
            payload: error.response.data.message,
        })
    }
}

// LOAD USER
export const loadUser = () => async(dispatch) => {
    try{
        dispatch({
            type: LOAD_USER_REQUEST
        });

        let link = `/acm/me`;

        const {data} = await axios.get(link);

        dispatch({
            type: LOAD_USER_SUCCESS,
            payload: data.user, 
        });

    } catch(error) {
        dispatch({
            type: LOAD_USER_FAIL,
            payload: error.response.data.message,
        })
    }
}

// LOGOUT USER
export const logout = () => async(dispatch) => {
    try{
        let link = `/acm/logout`;

        await axios.get(link);

        dispatch({
            type: LOGOUT_SUCCESS,
        });

    } catch(error) {
        dispatch({
            type: LOGOUT_FAIL,
            payload: error.response.data.message,
        })
    }
}


// UPDATE USERNAME
export const updateName = (firstName="" , lastName="") => async(dispatch) => {
    try{
        dispatch({
            type: UPDATE_NAME_REQUEST
        });

        let link = `/acm/change/name`;
        const config = { headers: { "Content-Type" : "application/json"}};

        const {data} = await axios.put(link , {firstName , lastName} , config);

        dispatch({
            type: UPDATE_NAME_SUCCESS,
            payload: data.success, 
        });

    } catch(error) {
        dispatch({
            type: UPDATE_NAME_FAIL,
            payload: error.response.data.message,
        })
    }
}

// UPDATE COLLEGENAME
export const updateCollege = (collegeName="") => async(dispatch) => {
    try{
        dispatch({
            type: UPDATE_COLLEGENAME_REQUEST
        });

        let link = `/acm/college/change`;
        const config = { headers: { "Content-Type" : "application/json"}};

        const {data} = await axios.put(link , {collegeName} , config);

        dispatch({
            type: UPDATE_COLLEGENAME_SUCCESS,
            payload: data.success, 
        });

    } catch(error) {
        dispatch({
            type: UPDATE_COLLEGENAME_FAIL,
            payload: error.response.data.message,
        })
    }
}



export const clearErrors = () => async(dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
}