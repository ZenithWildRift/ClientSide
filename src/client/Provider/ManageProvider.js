/* eslint-disable react/prop-types */
import React, { createContext, useContext, useReducer } from 'react';

const ManageContext = createContext();

const ManageProvider = ({ children }) => {
  // use Reducer
  const initialState = {
    selected: '',
    value: '',
    dataType: '',
    actionType: '',
  };

  const reducer = (state, action) => {
    const { type } = action;

    switch (type) {
      case 'DELETE': {
        return { ...state, value: 'boom' };
      }
      default:
        return null;
    }
  };

  const [updateState, updateActions] = useReducer(reducer, initialState);
  return (
    <ManageContext.Provider value={{ updateState, updateActions }}>
      {children}
    </ManageContext.Provider>
  );
};

export default ManageProvider;

export const useUpdate = () => useContext(ManageContext);
