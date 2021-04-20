import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Divider,
  makeStyles,
  Grid,
  Typography,
  List,
  ListItemText,
  ListItem,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from '@material-ui/core';
import BodyContainer from '../../Shared/BodyContainer';
import Navigation from '../../Shared/Navigation';
import AddAccessModal from '../../Components/AddAccessModal';
import { addAccess, revokeAcess } from '../../Services/UserServices';
import axios from 'axios';

const useStyles = makeStyles(() => ({
  heading: {
    fontSize: '1.2rem',
  },
  listTitle: {
    '& .MuiListItemText-primary': {
      fontWeight: '700',
      fontSize: '1.1rem',
    },
  },
  listDetail: {
    '& .MuiListItemText-primary': {
      fontSize: '1.1rem',
    }
  }
}));

const Access = () => {
  const classes = useStyles();
  const [organisations, setOrganisations ] = useState();
  const [modal, setModal] = useState({
    input: '',
    add: false,
    revoke: false,
    loading: false,
    error: false,
  });

  const handleAddAccess = async () => {
    setModal({ ...modal, loading: true });
    const res = await addAccess({ email: modal.input });
    if (res.message === 'OK') {
      setModal({ ...modal, loading: false, input: '', add: false, error: false });
    } else {
      setModal({ ...modal, loading: false, error: true });
    }
  };

  const handleRevokeAcess = async () => {
    setModal({ ...modal, loading: true });
    const res = await revokeAcess({ email: modal.input });
    if (res.message === 'OK') {
      setModal({ ...modal, loading: false, input: '', revoke: false, error: false });
    } else {
      setModal({ ...modal, loading: false, error: true });
    }
  };

  const handleValueChange = (input) => {
    setModal({ ...modal, input });
  };

  useEffect(() => {
    axios.get('/user/get-organisations').then((data) => {
      setOrganisations(data.data);
    })
  }, []);

  return (
    <>
      <Navigation />
      <BodyContainer>
        <Box style={{ display: 'flex', justifyContent: 'space-between ', marginBottom: 10 }}>
          <Typography color="primary" className={classes.heading}>
            Admin Dashboard
          </Typography>
          <Box>
            <Button variant="contained" color="primary" size="small" onClick={() => setModal({ ...modal, add: true })}>
              Add Access
            </Button>
            <Button style={{ marginLeft: 10 }} variant="contained" color="secondary" size="small" onClick={() => setModal({ ...modal, revoke: true })}>
              Revoke Access
            </Button>
          </Box>
        </Box>
        <Divider />

        <Grid container>
          <Grid item xs={3}>
            <List>
              <ListItem>
                <ListItemText primary="Username" className={classes.listTitle} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Email" className={classes.listTitle} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Access Type" className={classes.listTitle} />
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={9}>
            <List>
              <ListItem>
                <ListItemText primary="Nakul" className={classes.listDetail} />
              </ListItem>
              <ListItem>
                <ListItemText primary="lol@boll.com" className={classes.listDetail} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Staff" className={classes.listDetail} />
              </ListItem>
            </List>
          </Grid>
        </Grid>

        <Typography color="primary" className={classes.heading} style={{ marginBottom: 10, marginTop: 10 }}>Organisations</Typography>
        <Divider />

        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">No.</TableCell>
                <TableCell align="center">Organisation</TableCell>
                <TableCell align="center">Email</TableCell>
                <TableCell align="center">Username</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {organisations
                && organisations.map((organisation, index) => (
                  <TableRow key={organisation._id}>
                    <TableCell align="center" scope="row">
                      {index + 1}
                    </TableCell>
                    <TableCell align="center" scope="row">
                      {organisation.organisation_name}
                    </TableCell>
                    <TableCell align="center" scope="row">
                      {organisation.email}
                    </TableCell>
                    <TableCell align="center">{organisation.username}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>

        <AddAccessModal
          type="add"
          open={modal.add}
          loading={modal.loading}
          onChange={setModal}
          value={modal.input}
          onValueChange={handleValueChange}
          onConfirm={() => handleAddAccess()}
          onCancel={() => setModal({ ...modal, add: false })}
          title="Provide access to organisation"
        />
        <AddAccessModal
          open={modal.revoke}
          loading={modal.loading}
          onChange={setModal}
          onConfirm={() => handleRevokeAcess()}
          onValueChange={handleValueChange}
          value={modal.input}
          onCancel={() => setModal({ ...modal, revoke: false })}
          title="Revoke access"
        />

      </BodyContainer>
    </>
  );
};

export default Access;
