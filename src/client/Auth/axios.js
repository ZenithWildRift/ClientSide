/* eslint-disable no-shadow */
import axios from 'axios';

export const token = () => localStorage.getItem('token');

export const setHeader = (token) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const init = () => {
  const baseURL = 'https://zenithwildrift.herokuapp.com/api';
  // const baseURL = 'http://localhost:5000/api';
  // const baseURL = 'https://api.zenithleagues.com/api';
  axios.defaults.baseURL = baseURL;
  // setHeader(token());
  // response();
};
