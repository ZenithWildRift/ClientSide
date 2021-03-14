import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import NavButton from './NavButton';

const BodyNavigation = styled.div`
  width: 960px;
  height: auto;
  margin: 20px auto;
`;

const Container = styled.div`
  width: 960px;
  min-height: 500px;
  background-color: white;
  margin: 10px auto;
  border-radius: 5px;
  padding: 20px;
`;

const BodyContainer = ({children}) => {
  const customBg = () => {
    document.body.style.backgroundImage = 'url(https://cdn.discordapp.com/attachments/807644835883384833/820657144046157854/lol_wp.jpg)';
  }
  return ( 
    <>
      {customBg()}
      <BodyNavigation>
        <Link to="/"><NavButton mg="0px 10px 0px 0px">DashBoard</NavButton></Link>
        <Link to="/create"><NavButton mg="0px 10px 0px 0px">Create</NavButton></Link>
        <Link to="/manage"><NavButton mg="0px 10px 0px 0px">Manage</NavButton></Link>
        <Link to="/themes"><NavButton mg="0px 10px 0px 0px">Themes</NavButton></Link>
        <Link to="/characters"><NavButton mg="0px 10px 0px 0px">Character</NavButton></Link>
      </BodyNavigation>
      <Container>
        {children}
      </Container>
    </>
   );
}
 
export default BodyContainer;