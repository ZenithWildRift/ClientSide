import React, { Fragment } from 'react';
import styled from 'styled-components';
import Navigation from '../../Shared/Navigation';

const LoginFormContainer = styled.div`
  margin: 0 auto;
  background-color: white;
  width: 400px;
  height: auto;
  margin-top: 150px;
  border-radius: 5px;
  padding: 20px;
`;

const FormItem = styled.div`
  width: 100%;
  display: flex;
  color: #232434;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const Input = styled.input`
  border: 2px solid #232434;
  border-radius: 5px;
  padding: 8px 15px;
`;

const Signup = () => {
  return ( 
    <Fragment>
      <Navigation />
      
      <LoginFormContainer>
        <FormItem>ID<Input /></FormItem>
        <FormItem>Password<Input /></FormItem>

        <button style={{
          border: "2px solid #232434",
          borderRadius: "5px",
          padding: "8px 15px",
          marginTop: '30px',
          width: '100%',
          cursor: 'pointer'
      }}>Login</button>

      </LoginFormContainer>


    </Fragment>
   );
}
 
export default Signup;