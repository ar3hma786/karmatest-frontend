import axios from 'axios';
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
} from './ActionTypes';
import { API_BASE_URL } from '../../config/api';

// Login action creators
const loginRequest = () => ({ type: LOGIN_REQUEST });
const loginSuccess = user => ({ type: LOGIN_SUCCESS, payload: user });
const loginFailure = error => ({ type: LOGIN_FAILURE, payload: error });

export const login = userData => async dispatch => {
  dispatch(loginRequest());
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/signin`, userData);
    const user = response.data;
    if (user.jwt) localStorage.setItem('jwt', user.jwt);
    console.log('login ', user);
    dispatch(loginSuccess(user));
  } catch (error) {
    dispatch(loginFailure(error.message));
  }
};

// Logout action creator
export const logout = () => dispatch => {
  dispatch({ type: LOGOUT });
  localStorage.clear();
};
