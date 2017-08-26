import axios from 'axios';
import { browserHistory } from 'react-router';
import { AUTH_USER, AUTH_ERROR, UNAUTH_USER, FETCH_MESSAGE } from './types';

const ROOT_URL = 'http://localhost:3080';

export function signinUser({ email, password }) {
  return function(dispatch) {
    // Submit email password to server
    axios.post(`${ROOT_URL}/signin`, { email, password })
      .then(response => {
        // If match, we need to update state authenticated
        dispatch({ type: AUTH_USER });
        // save JWT token
        localStorage.setItem('token', response.data.token); // remove for sign out
        // redirect to the '/feature'
        browserHistory.push('/feature');
      })
      .catch(() => {
        // If bad, show error
        dispatch(authError('Bad Login Info'));
      })
  }
}

export function signupUser({ email, password }) {
  return function(dispatch) {
    // Submit email password to server
    axios.post(`${ROOT_URL}/signup`, { email, password })
      .then(response => {
        dispatch({ type: AUTH_USER });
        localStorage.setItem('token', response.data.token);
        browserHistory.push('/feature');
      })
      .catch(response => dispatch(authError(response.response.data.error)));
  }
}

export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error
  };
}

export function signoutUser(error) {
  localStorage.removeItem('token');
  return { type: UNAUTH_USER };
}

export function fetchMessage() {
  return function(dispatch) {
    axios.get(ROOT_URL, {
      headers: { authorization: localStorage.getItem('token') }
    })
      .then(response => {
        dispatch({
          type: FETCH_MESSAGE,
          payload: response.data.message
        });
      });
  };
}
