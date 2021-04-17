/* eslint-disable consistent-return */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-one-expression-per-line */
import {
  makeStyles,
  Box,
  Paper,
  Typography,
  Divider,
  TextField,
  Radio,
  RadioGroup,
  Select,
  MenuItem,
  Button,
  LinearProgress,
  CircularProgress,
} from '@material-ui/core';
import axios from 'axios';
import React, { Fragment, useState } from 'react';
import MuiAlert from '@material-ui/lab/Alert';
import { Redirect } from 'react-router-dom';
import Navigation from '../../Shared/Navigation';

const useStyles = makeStyles(() => ({
  root: {
    width: 400,
    height: 'auto',
    margin: '40px auto',
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

const Signup = ({ history }) => {
  const [state, setState] = useState({
    email: '',
    username: '',
    password: '',
    organisation: '',
    type: 'staff',
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({
    error: false,
    success: false,
  });
  const [redirect, setRedirect] = useState(false);
  const classes = useStyles();

  const handleChange = name => (e) => {
    e.preventDefault();
    setState({ ...state, [name]: e.target.value });
  };

  const handleSignup = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .post('/user/create', state)
      .then((response) => {
        if (response.error) {
          return console.log(response.err);
        }
        console.log(response);
        setLoading(false);
        setStatus({ ...status, error: false, success: true });
        setTimeout(() => {
          history.push('/login');
        }, 2000);
      })
      .catch((err) => {
        console.log(err);
        setStatus({ ...status, error: true, success: false });
        setLoading(false);
      });
  };

  console.log(state);

  return (
    <Fragment>
      <Navigation />

      <Paper className={classes.root}>
        <Typography
          style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: 10 }}
        >
          Signup
        </Typography>
        <Divider style={{ height: 2 }} />

        <Box className={classes.formBox}>
          <Typography className={classes.formLabel}>Email</Typography>
          <TextField variant="outlined" size="small" fullWidth value={state.email} onChange={handleChange('email')} />
        </Box>

        <Box className={classes.formBox}>
          <Typography className={classes.formLabel}>Username</Typography>
          <TextField variant="outlined" size="small" fullWidth value={state.username} onChange={handleChange('username')} />
        </Box>

        <Box className={classes.formBox}>
          <Typography className={classes.formLabel}>Account Type</Typography>
          <Select variant="outlined" fullWidth value={state.type} onChange={handleChange('type')}>
            <MenuItem value="staff">Staff</MenuItem>
            <MenuItem value="organisation">Organisation</MenuItem>
          </Select>
        </Box>

        {state.type === 'organisation' && (
          <Box className={classes.formBox}>
            <Typography className={classes.formLabel}>
              Organisation Name
            </Typography>
            <TextField variant="outlined" size="small" fullWidth value={state.organisation} onChange={handleChange('organisation')} />
          </Box>
        )}

        <Box className={classes.formBox}>
          <Typography color="primary" className={classes.formLabel}>
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

        {loading && <LinearProgress style={{ marginTop: 20 }} />}

        <Box mt={2} mb={2}>
          {status.success && (
            <MuiAlert elavation={6} variant="filled" severity="success">Signup Successfull | Redirecting...</MuiAlert>
          )}
          {status.error && (
            <MuiAlert elavation={6} variant="filled" severity="error">There was an error! try again</MuiAlert>
          )}
        </Box>

        <Button onClick={handleSignup} disabled={loading} variant="contained" color="primary" fullWidth style={{ marginTop: 10 }}>{loading ? 'Please wait' : 'Signup'}</Button>
      </Paper>

      {/* {redirect && <Redirect to="/login" />} */}
    </Fragment>
  );
};

export default Signup;
