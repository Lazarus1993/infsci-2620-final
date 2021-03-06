import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

import { GET_ERRORS, SET_CURRENT_USER, CLEAR_ERRORS } from "./types";

export const login2FA = () => dispatch => {
  const decoded = jwt_decode(localStorage.getItem("jwtToken"));
  dispatch(setCurrentUser(decoded));
};

// Login - Get User Token
export const loginUser = userData => dispatch => {
  return new Promise((resolve, reject) => {
    axios
      .post("/api/users/authenticate", userData)
      .then(res => {
        // Save to localStorage
        const { token } = res.data;
        const { sig_request } = res.data;
        // Set token to ls
        localStorage.setItem("jwtToken", token);
        localStorage.setItem("sig_request", sig_request);
        // Set token to Auth header
        setAuthToken(localStorage.getItem("jwtToken"));

        dispatch(clearErrors());
        //dispatch(setCurrentUser({}));
        resolve();
      })
      .catch(err => {
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        });
        reject();
      });
  });
};

// Register User
export const registerUser = (userData, history) => dispatch => {
  axios
    .post("/api/users/register", userData)
    .then(res => history.push("/login"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

// Log user out
export const logoutUser = () => dispatch => {
  // Remove token from localStorage
  localStorage.removeItem("jwtToken");
  localStorage.removeItem("sig_request");
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};

// Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};
