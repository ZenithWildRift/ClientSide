/* eslint-disable react/jsx-one-expression-per-line */
import axios from 'axios';
import React, { Fragment, useState } from 'react';
import { Redirect } from 'react-router-dom';
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

const Signup = ({ history }) => {
  const [state, setState] = useState({
    username: '',
    password: '',
    email: ''
  });
  const [loading, setLoading] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const handleChange = name => (e) => {
    e.preventDefault();
    setState({ ...state, [name]: e.target.value });
  };

  const handleSignup = (e) => {
    e.preventDefault();
    setLoading(true);
    axios.post('/user/create', state)
      .then((response) => {
        if (response.error) {
          return console.log(response.err);
        }
        console.log(response);
        setLoading(false);
        history.push('/login');
      }).catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  return (
    <Fragment>
      <Navigation />

      <LoginFormContainer>
        <FormItem>Username<Input value={state.username} onChange={handleChange('username')} /></FormItem>
        <FormItem>Password<Input value={state.password} onChange={handleChange('password')} /></FormItem>
        <FormItem>Email<Input value={state.email} onChange={handleChange('email')} /></FormItem>

        <button
          type="button"
          style={{
            border: '2px solid #232434',
            borderRadius: '5px',
            padding: '8px 15px',
            marginTop: '30px',
            width: '100%',
            cursor: 'pointer'
          }}
          disabled={loading}
          onClick={handleSignup}
        >
          Login
        </button>

      </LoginFormContainer>

      {/* {redirect && <Redirect to="/login" />} */}
    </Fragment>
  );
};

export default Signup;