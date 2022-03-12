import React, { useReducer, useContext } from "react";
import reducer from "./reducers";
import {
  CHANGE_PAGE,
  CLEAR_FILTERS,
  CLEAR_VALUE,
  CREATE_WORK_BEGIN,
  CREATE_WORK_ERROR,
  CREATE_WORK_SUCCESS,
  DELETE_JOB_BEGIN,
  DISPLAY_ALERT,
  EDIT_WORK_BEGIN,
  EDIT_WORK_ERROR,
  EDIT_WORK_SUCCESS,
  GET_WORKS_BEGIN,
  GET_WORKS_SUCCESS,
  HANDLE_CHANGE,
  SET_EDIT_WORK,
  SHOW_STATS_BEGIN,
  SHOW_STATS_SUCCESS,
  UPDATE_USER_BEGIN,
  UPDATE_USER_ERROR,
  UPDATE_USER_SUCCESS,
} from "./action";
import {
  CLEAR_ALERT,
  REGISTER_USER_BEGIN,
  REGISTER_USER_ERROR,
  REGISTER_USER_SUCCESS,
  LOGIN_USER_BEGIN,
  LOGIN_USER_ERROR,
  LOGIN_USER_SUCCESS,
  TOGGLE_SIDEBAR,
  LOGOUT_USER,
} from "./action";
import axios from "axios";

const token = localStorage.getItem("token");
const user = localStorage.getItem("user");
const location = localStorage.getItem("location");

const initialState = {
  isLoading: false,
  showAlert: false,
  alertText: "",
  alertType: "",
  user: user ? JSON.parse(user) : null,
  token: token,
  userLocation: location ? location : " ",
  showSidebar: false,
  isEditing: false,
  editWorkId: "",
  work: "",
  workLocation: location ? location : " ",
  workTypeOptions: ["important", "unimportant", "moderate"],
  workType: "important",
  workStatusOptions: ["pending", "finished"],
  status: "pending",
  works: [],
  totalwork: 0,
  numOfPages: 1,
  page: 1,
  stats: {},
  monthlyWork: [],
  search:'',
  searchStatus:'all',
  searchType:'all',
  sort:'latest',
  sortOptions:['latest','oldest','a-z','z-a']
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Global Setup::axios.defaults.headers.common['Authorization']=`Bearer ${state.token}`

  //axios
  const authFetch = axios.create({
    baseURL: "/api",
  });

  //request
  authFetch.interceptors.request.use(
    (config) => {
      config.headers.common["Authorization"] = `Bearer ${state.token}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  //response
  authFetch.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      console.log(error.response);
      if (error.response.status === 401) {
        console.log("Auth Error");
      }
      return Promise.reject(error);
    }
  );

  const displayAlert = () => {
    dispatch({ type: DISPLAY_ALERT });
    clearAlert();
  };

  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: CLEAR_ALERT });
    }, 3000);
  };

  const addUserToLocalstoreage = (user, token, location) => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
    localStorage.setItem("location", location);
  };

  const removeUserFromLocalstoreage = (user, token, location) => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("location");
  };

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
      addUserToLocalstoreage(user, token, location);
    } catch (err) {
      //   console.log(err.response);
      dispatch({
        type: REGISTER_USER_ERROR,
        payload: { msg: err.response.data.msg },
      });
    }
    clearAlert();
  };

  const loginUser = async (currentUser) => {
    dispatch({ type: LOGIN_USER_BEGIN });
    try {
      const { data } = await axios.post("/api/auth/login", currentUser);
      //   console.log(response);
      const { user, token, location } = data;
      dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: { user, token, location },
      });
      addUserToLocalstoreage(user, token, location);
    } catch (err) {
      //   console.log(err.response);
      dispatch({
        type: LOGIN_USER_ERROR,
        payload: { msg: err.response.data.msg },
      });
    }
    clearAlert();
  };

  const toggleSidebar = () => {
    dispatch({ type: TOGGLE_SIDEBAR });
  };

  const updateUser = async (currentUser) => {
    dispatch({ type: UPDATE_USER_BEGIN });
    try {
      const { data } = await authFetch.patch("/auth/updateuser", currentUser);
      const { user, location, token } = data;

      dispatch({
        type: UPDATE_USER_SUCCESS,
        payload: { user, location, token },
      });

      addUserToLocalstoreage({ user, location, token });
    } catch (err) {
      dispatch({
        type: UPDATE_USER_ERROR,
        payload: { msg: err.response.data.msg },
      });
    }
    clearAlert();
  };

  const handleChange = ({ name, value }) => {
    dispatch({
      type: HANDLE_CHANGE,
      payload: { name, value },
    });
  };

  const logoutUser = () => {
    dispatch({ type: LOGOUT_USER });
    removeUserFromLocalstoreage();
  };

  const clearValues = () => {
    dispatch({ type: CLEAR_VALUE });
  };

  const createWork = async () => {
    dispatch({ type: CREATE_WORK_BEGIN });
    try {
      const { work, workLocation, workType, status, token } = state;

      await authFetch.post("/works", {
        work,
        workLocation,
        workType,
        status,
        token,
      });
      dispatch({ type: CREATE_WORK_SUCCESS });
      dispatch({ type: CLEAR_VALUE });
    } catch (err) {
      dispatch({
        type: CREATE_WORK_ERROR,
        payload: { msg: err.response.data.msg },
      });
    }
    clearAlert();
  };

  const getWork = async () => {

    const {search,searchStatus,searchType,sort,page}=state

    let url = `/works?page=${page}&status=${searchStatus}&workType=${searchType}&sort=${sort}`;

    if(search){
      url=url + `&search=${search}`
    }
    dispatch({ type: GET_WORKS_BEGIN });
    try {
      const { data } = await authFetch(url);
      const { works, totalwork, numOfPages } = data;
      dispatch({
        type: GET_WORKS_SUCCESS,
        payload: { works, totalwork, numOfPages },
      });
    } catch (error) {
      logoutUser();
    }
    clearAlert();
  };

  const setEditWork = (id) => {
    dispatch({ type: SET_EDIT_WORK, payload: { id } });
  };

  const editWork = async () => {
    dispatch({ type: EDIT_WORK_BEGIN });
    try {
      const { work, workLocation, workType, status } = state;

      await authFetch.patch(`/works/${state.editWorkId}`, {
        work,
        workLocation,
        workType,
        status,
      });

      dispatch({ type: EDIT_WORK_SUCCESS });

      dispatch({ type: CLEAR_VALUE });
    } catch (err) {
      if (err.response.status === 401) return;

      dispatch({
        type: EDIT_WORK_ERROR,
        payload: { msg: err.response.data.msg },
      });
    }
    clearAlert();
  };

  const deleteWork = async (workId) => {
    dispatch({ type: DELETE_JOB_BEGIN });
    try {
      await authFetch.delete(`/works/${workId}`);
      getWork();
    } catch (err) {
      logoutUser();
    }
  };

  const showStats = async () => {
    dispatch({ type: SHOW_STATS_BEGIN });
    try {
      const { data } = await authFetch("/works/stats");

      dispatch({
        type: SHOW_STATS_SUCCESS,
        payload: {
          stats: data.defaultStats,
          monthlyWork: data.monthlyWork,
        },
      });
    } catch (err) {
      logoutUser()
    }
    clearAlert()
  };

  const clearFilter=()=>{
   dispatch({type:CLEAR_FILTERS})
  }

  const changePage=(page)=>{
    dispatch({type:CHANGE_PAGE,payload:{page}})
  }

  return (
    <AppContext.Provider
      value={{
        ...state,
        displayAlert,
        registerUser,
        loginUser,
        toggleSidebar,
        logoutUser,
        updateUser,
        handleChange,
        clearValues,
        createWork,
        getWork,
        setEditWork,
        deleteWork,
        editWork,
        showStats,
        clearFilter,
        changePage
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider, initialState, useAppContext };
