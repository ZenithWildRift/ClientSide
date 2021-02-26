import React from 'react';
import {Link, withRouter} from "react-router-dom"; 
import styled from 'styled-components';
import NavButton from './NavButton';

const Nav = styled.nav`
  width: 960px;
  height: 80px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items:center;
`;

const Logo = styled.h1`
  font-size: 30px;
  color: white;
  font-weight: 700;
`;

const logout = () => {
  //
}

const Navigation = ({history}) => {
  return ( 
      <Nav>
        <div>
          <Logo>Zenith WildRift</Logo>
        </div>
        <div>
          <NavButton onClick={() => history.push('/signup')}>Signup</NavButton>
          <NavButton onClick={() => history.push('/login')}>Login</NavButton>
          <NavButton onClick={() => logout()}>Logout</NavButton>
        </div>
      </Nav>
   );
}
 
export default withRouter(Navigation);