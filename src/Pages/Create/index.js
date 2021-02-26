import { Backdrop, CircularProgress, makeStyles } from '@material-ui/core';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import BodyContainer from '../../Shared/BodyContainer';
import NavButton from '../../Shared/NavButton';
import Navigation from '../../Shared/Navigation';

const useStyles = makeStyles(theme => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "yellow"
  }
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

const Create = ({history}) => {
  const classes = useStyles();
  const [state, setState] = useState({
    name: "",
    teamA: "",
    teamB: "",
    organisation: "",
    form: ""
})

const [loading, setLoading] =useState(false);

const { form } = state;

const handleForm = (name) => e => {
  e.preventDefault();
  setState({ ...state, [name]: e.target.value})
  if(name === "imageA" || name === "imageB" || name === "imageOrg"){
    form.set(`${name}`, e.target.files[0]);
  } else {
    form.set(`${name}`, e.target.value);
  }
}

const createMatch = (e) => {
  e.preventDefault();
  setLoading(true);
  axios.post('/match/create', state.form)
  .then(response => {
    if(response.error) {
      console.log("something went wrong");
    }
    console.log(response);
    setLoading(false)
    history.push('/');
  }).catch(err => {
    console.log(err);
  })
}

useEffect(() => {
  setState({ ...state, form: new FormData()})
}, [])

  return ( 
    <>
      <Navigation />

      <BodyContainer>
      <form style={{
          display: 'flex',
          flexDirection: 'column'
        }}>
          <FormLabel>
            Name
            <FormInput value={state.name} onChange={handleForm('name')}/>
          </FormLabel>
          <FormLabel>
            team A
            <FormInput value={state.teamA} onChange={handleForm('teamA')}/>
          </FormLabel>
          <FormLabel>
            Team B
            <FormInput value={state.teamB} onChange={handleForm('teamB')}/>
          </FormLabel>
          <FormLabel>
            Organisation
            <FormInput value={state.organisation} onChange={handleForm('organisation')}/>
          </FormLabel>
          <FormLabel>
            Image team A
            <FormInput type="file" accept="image/*" onChange={handleForm('imageA')}/>
          </FormLabel>
          <FormLabel>
            Image Team B
            <FormInput type="file" accept="image/*" onChange={handleForm('imageB')}/>
          </FormLabel>
          <FormLabel>
            Image Organisation
            <FormInput type="file" accept="image/*" onChange={handleForm('imageOrg')}/>
          </FormLabel>
          <FormLabel>
            <NavButton border="gray" onClick={createMatch}>Create Match</NavButton>
          </FormLabel>
        </form>
      </BodyContainer>
      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress color="primary" />
      </Backdrop>
    </>
   );
}
 
export default Create;