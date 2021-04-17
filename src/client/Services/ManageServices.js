/* eslint-disable no-return-await */
import axios from 'axios';

export const getMatch = async (matchId) => {
  const result = await axios.get(`/match/${matchId}`);
  const { data } = result;
  return data;
};

export const deleteCustomFields = async (matchId, selected) => {
  const result = await axios.post(`/match/${matchId}/deleteCustomFields`, {
    selected,
  });
  return await result.data;
};

export const updateMatchFields = async (matchId, body) => {
  const form = new FormData();
  form.append('dataType', body.dataType);
  form.append('selected', body.selected);
  if (body.dataType === 'image') form.append('image', body.image);
  if (body.dataType === 'text') form.append('value', body.value);

  const result = await axios.post(`/match/${matchId}/update`, form);

  return await result.data;
};
