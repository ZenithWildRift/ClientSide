/* eslint-disable no-return-await */

import axios from 'axios';

export const addAccess = async (body) => {
  const result = await axios.post('/user/access', body);
  return await result.data;
};

export const revokeAcess = async (body) => {
  const result = await axios.post('/user/revoke-access', body);
  return await result.data;
};
