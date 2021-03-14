/* eslint-disable react/prop-types */
import {
  Backdrop,
  CircularProgress,
  makeStyles,
  MenuItem,
  Select,
  Switch,
} from '@material-ui/core';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import BodyContainer from '../../Shared/BodyContainer';
import NavButton from '../../Shared/NavButton';
import Navigation from '../../Shared/Navigation';

const useStyles = makeStyles(theme => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: 'yellow',
  },
}));

const FormLabel = styled.label`
  font-size: 20px;
  font-weight: 600;
  width: 400px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const FormInput = styled.input`
  margin-left: 20px;
  border-style: none;
  border: 2px solid gray;
  border-radius: 5px;
  padding: 8px 15px;
`;

const Create = ({ history }) => {
  const classes = useStyles();
  const [state, setState] = useState({
    name: '',
    teamA: '',
    teamB: '',
    organisation: '',
    background: '',
    backgroundA: '',
    backgroundB: '',
    textColor: 'white',
    selectionBox: '',
    form: '',
  });
  const [theme, setTheme] = useState(false);

  const [loading, setLoading] = useState(false);

  const { form } = state;

  const handleForm = name => (e) => {
    e.preventDefault();
    setState({ ...state, [name]: e.target.value });
    if (name === 'imageA' || name === 'imageB' || name === 'imageOrg' || name === 'backgroundImage') {
      form.set(`${name}`, e.target.files[0]);
    } else {
      form.set(`${name}`, e.target.value);
    }
  };

  const createMatch = (e) => {
    e.preventDefault();
    if (!theme) {
      form.delete('background');
      form.delete('backgroundImage');
      form.delete('backgroundA');
      form.delete('backgroundB');
      form.delete('textColor');
      form.delete('selectionBox');
    }
    axios
      .post('/match/create', state.form)
      .then((response) => {
        if (response.error) {
          console.log('something went wrong');
        }
        console.log(response);
        setLoading(false);
        history.push('/');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    setState({ ...state, form: new FormData() });
  }, []);
  console.log(state);
  return (
    <>
      <Navigation />

      <BodyContainer>
        <form
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <FormLabel>
            Name
            <FormInput value={state.name} onChange={handleForm('name')} />
          </FormLabel>
          <FormLabel>
            team A
            <FormInput value={state.teamA} onChange={handleForm('teamA')} />
          </FormLabel>
          <FormLabel>
            Team B
            <FormInput value={state.teamB} onChange={handleForm('teamB')} />
          </FormLabel>
          <FormLabel>
            Organisation
            <FormInput
              value={state.organisation}
              onChange={handleForm('organisation')}
            />
          </FormLabel>
          <FormLabel>
            Image team A
            <FormInput
              type="file"
              accept="image/*"
              onChange={handleForm('imageA')}
            />
          </FormLabel>
          <FormLabel>
            Image Team B
            <FormInput
              type="file"
              accept="image/*"
              onChange={handleForm('imageB')}
            />
          </FormLabel>
          <FormLabel>
            Image Organisation
            <FormInput
              type="file"
              accept="image/*"
              onChange={handleForm('imageOrg')}
            />
          </FormLabel>
          <FormLabel>
            Enable Custom Background
            <Switch
              checked={theme}
              onChange={() => setTheme(!theme)}
              color="primary"
              name="Enable Template"
              inputProps={{ 'aria-label': 'primary checkbox' }}
            />
          </FormLabel>

          {true && (
            <>
              <FormLabel>
                Colour Background
                <FormInput
                  value={state.background}
                  onChange={handleForm('background')}
                />
              </FormLabel>
              <FormLabel>
                Background Image (Ratio 16:9, Resolution 1600x900 Min)
                <FormInput
                  type="file"
                  accept="image/*"
                  onChange={handleForm('backgroundImage')}
                />
              </FormLabel>
              <FormLabel>
                Colour TeamA
                <FormInput
                  value={state.backgroundA}
                  onChange={handleForm('backgroundA')}
                />
              </FormLabel>
              <FormLabel>
                Colour TeamB
                <FormInput
                  value={state.backgroundB}
                  onChange={handleForm('backgroundB')}
                />
              </FormLabel>
              <FormLabel>
                Selection Box
                <FormInput
                  value={state.selectionBox}
                  onChange={handleForm('selectionBox')}
                />
              </FormLabel>


              <FormLabel>
                Text Color (Only for team name)
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={state.textColor}
                  onChange={handleForm('textColor')}
                >
                  <MenuItem value="white">White</MenuItem>
                  <MenuItem value="black">Black</MenuItem>
                </Select>
              </FormLabel>
            </>
          )}

          <FormLabel style={{ width: '15%' }}>
            <NavButton border="gray" onClick={createMatch}>
              Create Match
            </NavButton>
          </FormLabel>
        </form>
      </BodyContainer>
      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress color="primary" />
      </Backdrop>
    </>
  );
};

export default Create;
