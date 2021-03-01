import axios from 'axios';
import React, { Fragment, useState } from 'react';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';
import { authenticate } from '../../Auth/helper';
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

const Login = () => {
  const [state, setState] = useState({
    username: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const handleChange = name => (e) => {
    e.preventDefault();
    setState({ ...state, [name]: e.target.value });
  };

  const handleLogin = () => {
    setLoading(true);
    axios.post('/user/signin', state)
      .then((response) => {
        if (response.data.error) {
          return console.log(response.data);
        }
        authenticate(response.data, () => {
          setRedirect(true);
        });
      })
      .catch(err => console.log(err));
  };

  const performRedirect = () => {
    if (redirect) {
      return <Redirect to="/" />;
    }
  };

  return (
    <Fragment>
      <Navigation />

      <LoginFormContainer>
        <FormItem>
          Username
          <Input onChange={handleChange('username')} value={state.username} />
        </FormItem>
        <FormItem>
          Password
          <Input onChange={handleChange('password')} value={state.password} />
        </FormItem>

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
          onClick={handleLogin}
          disabled={loading}
        >
          Login
        </button>

      </LoginFormContainer>

      {performRedirect()}
    </Fragment>
  );
};

export default Login;
