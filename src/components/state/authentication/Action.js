import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
} from './ActionTypes';
import api from '../../config/apiConfig';

// Login action creators
const loginRequest = () => ({ type: LOGIN_REQUEST });
const loginSuccess = user => ({ type: LOGIN_SUCCESS, payload: user });
const loginFailure = error => ({ type: LOGIN_FAILURE, payload: error });

// Pass navigate as an argument here
export const login = (userData, navigate) => async dispatch => {
  dispatch(loginRequest());
  try {
    const response = await api.post('/auth/signin', userData); // Use userData directly
    const data = response.data;

    if (data.jwt) {
      localStorage.setItem('jwt', data.jwt);
      api.defaults.headers.common['Authorization'] = `Bearer ${data.jwt}`; // Set JWT in axios headers
      dispatch(loginSuccess(data.jwt));
      navigate('/admin'); // Navigate to /admin after successful login
    } else {
      dispatch(loginFailure('Invalid credentials'));
      navigate('/');
    }
  } catch (error) {
    dispatch(loginFailure('Login failed. Please try again.'));
  }
};

// Logout action creator
export const logout = () => dispatch => {
  dispatch({ type: LOGOUT });
  localStorage.clear();
};
