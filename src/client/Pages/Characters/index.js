/* eslint-disable max-len */
/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import {
  Backdrop, Box, Button, Chip, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, FormLabel, Input, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField
} from '@material-ui/core';
import axios from 'axios';
import DeleteIcon from '@material-ui/icons/Delete';
import styled from 'styled-components';
import BodyContainer from '../../Shared/BodyContainer';
import Navigation from '../../Shared/Navigation';

const IMAGE = styled.img`
  max-height: 40px;
`;

const Characters = () => {
  const [add, setAdd] = useState();
  const [toggle, setToggle] = useState({
    add: false,
    delete: false
  });
  const [deleteChar, setDeleteChar] = useState();
  const [loading, setLoading] = useState(false);
  const [characters, setCharacters] = useState();

  const handleClose = (name) => {
    setToggle({ ...toggle, [name]: false });
  };

  const handleAdd = name => (e) => {
    e.preventDefault();
    if (name === 'name') {
      add.set('name', e.target.value);
    } else {
      add.set(`${name}`, e.target.files[0]);
    }
  };

  const AddCharacter = () => {
    setLoading(true);
    axios.post('/characters/add', add)
      .then((response) => {
        if (response.error) {
          console.log('Something went wrong');
        }
        setToggle(false);
        setLoading(false);
      });
  };

  const SelectForDelete = (char) => {
    setDeleteChar(char);
    setToggle({ ...toggle, delete: true });
  };

  const DeleteCharacter = () => {
    setLoading(true);
    axios.post(`/character/${deleteChar._id}/delete`)
      .then((response) => {
        if (response.error) {
          console.log('Something went wrong');
          return;
        }
        setDeleteChar({});
        setToggle({ ...toggle, delete: false });
        setLoading(false);
      });
  };

  useEffect(() => {
    setAdd(() => new FormData());
  }, []);

  useEffect(() => {
    axios.get('/characters')
      .then((response) => {
        setCharacters(response.data.characters);
      });
  }, [loading]);

  return (
    <>
      <Navigation />
      {/* BODY CONTAINER */}
      <BodyContainer>
        <Chip
          label={`Total characters: ${characters ? characters.length : 'Loading...'}`}
          color="primary"
        />
        <Box
        mt={2}
        mb={2}
        style={{
          width: '100%', display: 'flex', justifyContent: 'space-between'
        }}
        >
          <Button variant="outlined" color="primary" onClick={() => setToggle({ ...toggle, add: true })}>Add Character</Button>
          <TextField label="Search" variant="outlined" size="small" />
        </Box>

        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>No.</TableCell>
                <TableCell align="center">ID</TableCell>
                <TableCell align="center">Name</TableCell>
                <TableCell align="center">Avatar</TableCell>
                <TableCell align="center">Portrait</TableCell>
                <TableCell align="center">Landscape</TableCell>
                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {characters && characters.map((char, index) => (
                <TableRow key={char.id}>
                  <TableCell align="left" scope="row">{index + 1}</TableCell>
                  <TableCell align="center" scope="row">{char.id}</TableCell>
                  <TableCell align="center" scope="row">{char.name}</TableCell>
                  <TableCell align="center">
                    <IMAGE src={char.avatar} alt="boom" />
                  </TableCell>
                  <TableCell align="center"><IMAGE src={char.portrait} alt="boom" /></TableCell>
                  <TableCell align="center"><IMAGE src={char.landscape} alt="boom" /></TableCell>
                  <TableCell align="right"><DeleteIcon onClick={() => SelectForDelete(char)} /></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

      </BodyContainer>
      {/* BODY CONTAINER */}


      <Dialog open={toggle.add} onClose={() => handleClose('add')} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add Character</DialogTitle>
        <DialogContent>
          <FormLabel>
            Name
            <Input
              id="name"
              label="Name"
              type="name"
              fullWidth
              onChange={handleAdd('name')}
            />
          </FormLabel>
          <FormLabel>
            Image Avatar -
            <input type="file" onChange={handleAdd('avatar')} />
          </FormLabel>
          <br />
          <br />
          <FormLabel>
            Image Portrait -
            <input type="file" onChange={handleAdd('portrait')} />
          </FormLabel>
          <br />
          <br />
          <FormLabel>
            Image Landscape -
            <input type="file" onChange={handleAdd('landscape')} />
          </FormLabel>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose('add')} color="primary">
            Cancel
          </Button>
          <Button onClick={AddCharacter} disabled={loading} color="primary">
            {loading ? 'Please Wait' : 'Add'}
          </Button>

        </DialogActions>
      </Dialog>

      {/* DELETE MODAL */}
      <Dialog open={toggle.delete} onClose={() => handleClose('delete')} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Delete Selected Character</DialogTitle>
        <DialogActions>
          <Button variant="contained" color="secondary" onClick={() => handleClose('delete')}>
            Cancel
          </Button>
          <Button variant="contained" color="primary" onClick={DeleteCharacter} disabled={loading}>
            {loading ? 'Please Wait' : 'Add'}
          </Button>

        </DialogActions>
      </Dialog>

      <Backdrop open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};

export default Characters;
