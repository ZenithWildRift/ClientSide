/* eslint-disable import/no-named-as-default */
/* eslint-disable no-shadow */
import axios from 'axios';
import URL from '../../../config';

export const token = () => {
  const jwt = localStorage.getItem('jwt');
  if (jwt) {
    return jwt;
  }
};

export const setHeader = (token) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};


export const init = () => {
  // const baseURL = `${URL}/api`;
  const baseURL = `${URL}/api`;
  // const baseURL = `${URL}/api`;
  axios.defaults.baseURL = baseURL;
  setHeader(token());
};
