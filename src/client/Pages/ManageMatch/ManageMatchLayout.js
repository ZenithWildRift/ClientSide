import React from 'react';
import Manage from '.';
import ManageProvider from '../../Provider/ManageProvider';

const ManageMatchLayout = () => {
  // Add Provider
  return (
    <ManageProvider>
      <Manage />
    </ManageProvider>
  );
};

export default ManageMatchLayout;
