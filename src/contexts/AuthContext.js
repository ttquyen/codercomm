import React, { createContext, useReducer } from "react";
import apiService from "../app/apiService";

const initialState = {
  isInitialized: false, //help to handle refreshing page
  isAuthenticated: false, //help to control log in
  user: null, //store user info
};
const INITIALIZE = "AUTH.INITIALIZE";
const LOGIN_SUCCESS = "AUTH.LOGIN_SUCCESS";
const REGISTER_SUCCESS = "AUTH.REGISTER_SUCCESS";
const LOGOUT = "AUTH.LOGOUT";
const UPDATE_PROFILE = "AUTH.UPDATE_PROFILE";

const AuthContext = createContext({ ...initialState });
const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case INITIALIZE:
      break;
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: payload.user,
      };
    case REGISTER_SUCCESS:
      break;
    case LOGOUT:
      break;
    case UPDATE_PROFILE:
      break;

    default:
      return state;
  }
};
const setSession = (accessToken) => {
  if (accessToken) {
    window.localStorage.setItem("accessToken", accessToken);
    apiService.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  } else {
    //LOGOUT
    window.localStorage.removeItem("accessToken");
    delete apiService.defaults.headers.common.Authorization;
  }
};
function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const login = async ({ email, password }, callback) => {
    try {
      const response = await apiService.post("/auth/login", {
        email,
        password,
      });
      const { user, accessToken } = response.data;
      setSession(accessToken); //save the accessToken to header of apiService
      dispatch({ type: LOGIN_SUCCESS, payload: user });
      callback(); //navigate to homepage when login success
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthContext.Provider value={{ ...state, login }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
