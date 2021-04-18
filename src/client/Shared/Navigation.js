/* eslint-disable react/prop-types */
import axios from 'axios';
import React from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { Backdrop, Box, Button } from '@material-ui/core';
import { isAuthenticated } from '../Auth/helper';

const Nav = styled.nav`
  width: 960px;
  height: 80px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.h1`
  font-size: 30px;
  color: white;
  font-weight: 700;
`;

const Navigation = ({ history }) => {
  const loggedIn = isAuthenticated();

  const logout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('jwt');

      axios
        .get('/user/signout')
        .then(() => {
          console.log('Signout success');
          history.push('/login');
        })
        .catch(err => console.log(err));
    }
  };

  return (
    <Nav>
      <div>
        <Logo>Zenith WildRift</Logo>
      </div>
      <div>
        {!loggedIn && (
          <>
            <Button variant="outlined" style={{color: 'white', borderColor: 'white'}} onClick={() => history.push('/signup')}>Signup</Button>
            <Button variant="contained" color="primary" onClick={() => history.push('/login')} style={{marginLeft: 10}}>Login</Button>
          </>
        )}
        {loggedIn && <Button variant="contained" color="primary" onClick={() => logout()}>Logout</Button>}
      </div>
    </Nav>
  );
};

export default withRouter(Navigation);
