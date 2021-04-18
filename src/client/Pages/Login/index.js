/* eslint-disable consistent-return */
import React, { Fragment, useState } from 'react';
import {
  Box, Paper, Divider, Button, TextField, Typography, makeStyles, LinearProgress
} from '@material-ui/core';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import MuiAlert from '@material-ui/lab/Alert';
import { authenticate } from '../../Auth/helper';
import Navigation from '../../Shared/Navigation';

const useStyles = makeStyles(() => ({
  root: {
    width: 400,
    height: 'auto',
    margin: '80px auto',
    backgroundColor: 'white',
    padding: 20,
  },
  formBox: {
    marginTop: 10,
  },
  formLabel: {
    marginBottom: 10,
  },
}));


const Login = () => {
  const [state, setState] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const classes = useStyles();

  const handleChange = name => (e) => {
    e.preventDefault();
    setState({ ...state, [name]: e.target.value });
  };

  const handleLogin = () => {
    setLoading(true);
    axios.post('/user/signin', state)
      .then((response) => {
        setError('');
        authenticate(response.data, () => {
          setRedirect(true);
        });
      })
      .catch((err) => {
        if (err.response.data.status === 500) {
          localStorage.removeItem('jwt');
        }
        setError(err.response.data.message);
        setLoading(false);
      });
  };

  const performRedirect = () => {
    if (redirect) {
      return <Redirect to="/" />;
    }
  };

  return (
    <Fragment>
      <Navigation />

      <Paper className={classes.root}>
        <Typography
          style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: 10 }}
        >
          Login
        </Typography>
        <Divider style={{ height: 2 }} />

        <Box className={classes.formBox}>
          <Typography className={classes.formLabel}>Email</Typography>
          <TextField variant="outlined" size="small" fullWidth value={state.email} onChange={handleChange('email')} />
        </Box>


        <Box mb={2} className={classes.formBox}>
          <Typography className={classes.formLabel}>
            Password
          </Typography>
          <TextField
            type="password"
            color="primary"
            variant="outlined"
            size="small"
            fullWidth
            value={state.password}
            onChange={handleChange('password')}
          />
        </Box>

        {loading && <LinearProgress style={{ marginBottom: 10 }} />}


        {(error !== '') && <MuiAlert elavation={6} variant="filled" severity="error">{error}</MuiAlert>}

        <Button onClick={handleLogin} disabled={loading} variant="contained" color="primary" fullWidth style={{ marginTop: 20 }}>{loading ? 'Please wait' : 'Login'}</Button>
      </Paper>

      {performRedirect()}
    </Fragment>
  );
};

export default Login;
