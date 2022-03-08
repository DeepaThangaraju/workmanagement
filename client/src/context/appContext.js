import React, { useReducer, useContext } from "react";
import reducer from "./reducers";
import { DISPLAY_ALERT } from "./action";
import {
  CLEAR_ALERT,
  REGISTER_USER_BEGIN,
  REGISTER_USER_ERROR,
  REGISTER_USER_SUCCESS,
  LOGIN_USER_BEGIN,
  LOGIN_USER_ERROR,
  LOGIN_USER_SUCCESS,
  TOGGLE_SIDEBAR,
  LOGOUT_USER
} from "./action";
import axios from "axios";

const token=localStorage.getItem('token')
const user=localStorage.getItem('user')
const location=localStorage.getItem('location')

const initialState = {
  isLoading: false,
  showAlert: false,
  alertText: "",
  alertType: "",
  user: user ? JSON.parse(user) : null,
  token: token,
  userLocation: location ? location : " ",
  showSidebar:false,
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const displayAlert = () => {
    dispatch({ type: DISPLAY_ALERT });
    clearAlert();
  };

  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: CLEAR_ALERT });
    }, 3000);
  };

  const addUserToLocalstoreage=(user,token,location)=>{
      localStorage.setItem('user',JSON.stringify(user))
      localStorage.setItem('token',token)
      localStorage.setItem('location',location)
  }

  const removeUserFromLocalstoreage=(user,token,location)=>{
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    localStorage.removeItem('location')
}

  const registerUser = async (currentUser) => {
    dispatch({ type: REGISTER_USER_BEGIN });
    try {
      const response = await axios.post("/api/auth/register", currentUser);
      //   console.log(response);
      const { user, token, location } = response.data;
      dispatch({
        type: REGISTER_USER_SUCCESS,
        payload: { user, token, location },
      });
     addUserToLocalstoreage(user,token,location)
    } catch (err) {
      //   console.log(err.response);
      dispatch({
        type: REGISTER_USER_ERROR,
        payload: { msg: err.response.data.msg },
      });
    }
    clearAlert();
  };

  const loginUser=async (currentUser)=>{
    dispatch({ type: LOGIN_USER_BEGIN });
    try {
      const {data} = await axios.post("/api/auth/login", currentUser);
      //   console.log(response);
      const { user, token, location } = data;
      dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: { user, token, location },
      });
     addUserToLocalstoreage(user,token,location)
    } catch (err) {
      //   console.log(err.response);
      dispatch({
        type: LOGIN_USER_ERROR,
        payload: { msg: err.response.data.msg },
      });
    }
    clearAlert();
  }

  const toggleSidebar=()=>{
    dispatch({type:TOGGLE_SIDEBAR})
  }

  const logoutUser=()=>{
    dispatch({type:LOGOUT_USER})
    removeUserFromLocalstoreage()
  }

  return (
    <AppContext.Provider value={{ ...state, displayAlert, registerUser,loginUser,toggleSidebar,logoutUser }}>
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider, initialState, useAppContext };
