import React, { useState } from 'react';
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
} from '@material-ui/core';
import BodyContainer from '../../Shared/BodyContainer';
import Navigation from '../../Shared/Navigation';
import AddAccessModal from '../../Components/AddAccessModal';
import { addAccess, revokeAcess } from '../../Services/UserServices';

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
  console.log(modal.input);

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
