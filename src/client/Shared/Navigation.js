import axios from 'axios';
import React from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { isAuthenticated } from '../Auth/helper';
import NavButton from './NavButton';

const Nav = styled.nav`
  width: 960px;
  height: 80px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items:center;
  background-color: 'red';
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

      axios.get('/user/signout')
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
          <NavButton onClick={() => history.push('/signup')}>Signup</NavButton>
          <NavButton onClick={() => history.push('/login')}>Login</NavButton>
        </>
        )}
        {loggedIn && (
        <NavButton onClick={() => logout()}>Logout</NavButton>
        )}
      </div>


    </Nav>
  );
};

export default withRouter(Navigation);
