import {
  CLEAR_ALERT,
  REGISTER_USER_BEGIN,
  REGISTER_USER_ERROR,
  REGISTER_USER_SUCCESS,
  DISPLAY_ALERT,
  LOGIN_USER_BEGIN,
  LOGIN_USER_ERROR,
  LOGIN_USER_SUCCESS,
  TOGGLE_SIDEBAR,
  LOGOUT_USER,
  UPDATE_USER_BEGIN,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
  HANDLE_CHANGE,
  CLEAR_VALUE,
  CREATE_WORK_BEGIN,
  CREATE_WORK_SUCCESS,
  CREATE_WORK_ERROR,
  GET_WORKS_BEGIN,
  GET_WORKS_SUCCESS,
  SET_EDIT_WORK,
  DELETE_JOB_BEGIN,
  EDIT_WORK_BEGIN,
  EDIT_WORK_SUCCESS,
  EDIT_WORK_ERROR,
  SHOW_STATS_BEGIN,
  SHOW_STATS_SUCCESS,
  CLEAR_FILTERS,
  CHANGE_PAGE,
} from "./action";

import { initialState } from "./appContext";

const reducer = (state, action) => {
  if (action.type === DISPLAY_ALERT) {
    return {
      ...state,
      showAlert: true,
      alertType: "danger",
      alertText: "Please provide all information",
    };
  }
  if (action.type === CLEAR_ALERT) {
    return {
      ...state,
      showAlert: false,
      alertType: "",
      alertText: "",
    };
  }
  if (action.type === REGISTER_USER_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === REGISTER_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      token: action.payload.token,
      user: action.payload.user,
      location: action.payload.location,
      showAlert: true,
      alertType: "success",
      alertText: "user Registered!!!",
    };
  }
  if (action.type === REGISTER_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }

  if (action.type === LOGIN_USER_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === LOGIN_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      token: action.payload.token,
      user: action.payload.user,
      location: action.payload.location,
      showAlert: true,
      alertType: "success",
      alertText: "user Logged!!!",
    };
  }
  if (action.type === LOGIN_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }

  if (action.type === TOGGLE_SIDEBAR) {
    return {
      ...state,
      showSidebar: !state.showSidebar,
    };
  }

  if (action.type === LOGOUT_USER) {
    return {
      ...initialState,
      user: null,
      token: null,
      location: null,
    };
  }

  if (action.type === UPDATE_USER_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }

  if (action.type === UPDATE_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      token: action.payload.token,
      user: action.payload.user,
      location: action.payload.location,
      showAlert: true,
      alertType: "success",
      alertText: "user Profile updated!!!",
    };
  }

  if (action.type === UPDATE_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }

  if (action.type === HANDLE_CHANGE) {
    return {
      ...state,
      page:1,
      [action.payload.name]: action.payload.value,
    };
  }

  if (action.type === CLEAR_VALUE) {
    const initialState = {
      isEditing: false,
      editWorkId: "",
      work: "",
      workLocation: state.userLocation,
      workType: "important",
      status: "pending",
    };
    return {
      ...state,
      ...initialState,
    };
  }

  if (action.type === CREATE_WORK_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }

  if (action.type === CREATE_WORK_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "success",
      alertText: "New Work Created!!!",
    };
  }

  if (action.type === CREATE_WORK_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }

  if (action.type === GET_WORKS_BEGIN) {
    return {
      ...state,
      isLoading: true,
      showAlert: false,
    };
  }

  if (action.type === GET_WORKS_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      works: action.payload.works,
      totalwork: action.payload.totalwork,
      numOfPages: action.payload.numOfPages,
    };
  }

  if (action.type === SET_EDIT_WORK) {
    const editwork = state.works.find((work) => work._id === action.payload.id);
    const { _id, work, workLocation, status, workType } = editwork;
    return {
      ...state,
      isEditing: true,
      editWorkId: _id,
      work,
      workLocation,
      workType,
      status,
    };
  }

  if (action.type === DELETE_JOB_BEGIN) {
    return { ...state, isLoading: true };
  }

  if (action.type === EDIT_WORK_BEGIN) {
    return { ...state, isLoading: true };
  }

  if (action.type === EDIT_WORK_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "success",
      alertText: "Work updated!!!",
    };
  }

  if (action.type === EDIT_WORK_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }

  if (action.type === SHOW_STATS_BEGIN) {
    return { ...state, isLoading: true, showAlert: false };
  }

  if (action.type === SHOW_STATS_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      stats: action.payload.stats,
      monthlyWork: action.payload.monthlyWork,
    };
  }

  if (action.type === CLEAR_FILTERS) {
    return {
      ...state,
     search: "",
      searchStatus: "all",
      searchType: "all",
      sort:"latest",
    };
  }

  if(action.type===CHANGE_PAGE){
    return {
      ...state,
      page:action.payload.page
    }
  }

  throw new Error(`no such action:${action.type}`);
};

export default reducer;
