/* eslint-disable max-len */
/* eslint-disable no-underscore-dangle */
import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
  Typography,
} from '@material-ui/core';
import axios from 'axios';
import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import DeleteIcon from '@material-ui/icons/Delete';
import jwtDecode from 'jwt-decode';
import LinkIcon from '@material-ui/icons/Link';
import SettingsBackupRestoreIcon from '@material-ui/icons/SettingsBackupRestore';
import EditIcon from '@material-ui/icons/Edit';
import Navigation from '../../Shared/Navigation';
import BodyContainer from '../../Shared/BodyContainer';
import { isAuthenticated } from '../../Auth/helper';

const styles = {
  tooltip: {
    display: 'flex',
    justifyContent: 'space-between',
  },
};

const LinkBlock = styled.div`
  width: 100%;
  padding: 5px;
  margin-bottom: 10px;
  border: 1px solid gray;
  border-radius: 5px;
`;

const LinkTitle = styled.div`
  margin-bottom: 10px;
  font-weight: 600;
`;

const useStyles = makeStyles(theme => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: 'yellow',
  },
}));

const Dashboard = () => {
  const [matches, setMatches] = useState();
  const [toggle, setToggle] = useState({
    delete: false,
    reset: false,
    links: false,
  });
  const [selectedId, setSelectedId] = useState('');
  const [deleteId, setDeleteId] = useState('');
  const [resetId, setResetId] = useState('');
  const [loading, setLoading] = useState(true);
  const classes = useStyles();

  const deleteMatch = () => {
    setLoading(true);
    axios
      .post(`/match/${deleteId}/delete`)
      .then((response) => {
        if (response.error) {
          console.log('Error deleting');
          return;
        }
        console.log('Deleted succesfully');
        setDeleteId('');
        setToggle({ ...toggle, delete: false });
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const resetMatch = () => {
    setLoading(true);
    axios
      .post(`match/${resetId}/reset`)
      .then((response) => {
        if (response.error) {
          console.log('Error Reseting');
          return;
        }
        console.log('Reset succesfully');
        setResetId('');
        setToggle({ ...toggle, reset: false });
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const toggleLinks = (id) => {
    setSelectedId(id);
    setToggle({ ...toggle, links: true });
  };

  useEffect(() => {
    axios.get('/match').then((result) => {
      let matchList = result.data.matches;
      const user = jwtDecode(isAuthenticated());
      console.log(user);
      if (!user.admin) {
        matchList = result.data.matches.filter(match => match.author?._id === user._id);
      }
      setMatches(matchList);
      setLoading(false);
    });
  }, [loading]);

  return (
    <>
      <Navigation />

      <BodyContainer>
        <Box mb={2} style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography color="primary" style={{ fontSize: 20 }}>Dashboard</Typography>
          <TextField disabled label="disabled" variant="outlined" size="small" />
        </Box>

        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">No.</TableCell>
                <TableCell align="center">Name</TableCell>
                <TableCell align="center">Team-A</TableCell>
                <TableCell align="center">Team-B</TableCell>
                <TableCell align="center">Organisation</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {matches
                && matches.map((match, index) => (
                  <TableRow key={match._id}>
                    <TableCell align="center" scope="row">
                      {index + 1}
                    </TableCell>
                    <TableCell align="center" scope="row">
                      {match.name}
                    </TableCell>
                    <TableCell align="center" scope="row">
                      {match.teamA?.name}
                    </TableCell>
                    <TableCell align="center">{match.teamB?.name}</TableCell>
                    <TableCell align="center">
                      {match.organisation?.name}
                    </TableCell>
                    <TableCell style={styles.tooltip} align="center">
                      <Tooltip title="View Links" aria-label="add">
                        <LinkIcon onClick={() => toggleLinks(match._id)} />
                      </Tooltip>
                      <Tooltip title="Reset Match Selection" aria-label="add">
                        <SettingsBackupRestoreIcon
                          onClick={() => {
                            setResetId(match?._id);
                            setToggle({ ...toggle, reset: true });
                          }}
                        />
                      </Tooltip>
                      <Tooltip title="Edit match" aria-label="add">
                        <Link to={`/manage/${match._id}`}>
                          <EditIcon color="primary" />
                        </Link>
                      </Tooltip>
                      <Tooltip title="Delete" aria-label="add">
                        <DeleteIcon
                          color="secondary"
                          onClick={() => {
                            setDeleteId(match?._id);
                            setToggle({ ...toggle, delete: true });
                          }}
                        />
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </BodyContainer>

      {/* ----------------Modals------------- */}

      {/* DELETE MODAL */}
      <Dialog
        open={toggle.delete}
        onClose={() => setToggle({ ...toggle, delete: false })}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Delete Selected Match</DialogTitle>
        <DialogActions>
          <Button
            variant="contained"
            onClick={() => setToggle({ ...toggle, delete: false })}
            color="primary"
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={deleteMatch}
            disabled={loading}
            color="secondary"
          >
            {loading ? 'Please Wait' : 'Delete'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* RESET MATCH */}
      <Dialog
        open={toggle.reset}
        onClose={() => setToggle({ ...toggle, reset: false })}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Reset Match Selections</DialogTitle>
        <DialogActions>
          <Button
            onClick={() => setToggle({ ...toggle, reset: false })}
            color="primary"
          >
            Cancel
          </Button>
          <Button onClick={resetMatch} disabled={loading} color="primary">
            {loading ? 'Please Wait' : 'Reset'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* VIEW LINKS */}
      <Dialog
        open={toggle.links}
        onClose={() => setToggle({ ...toggle, links: false })}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">View Links</DialogTitle>
        <DialogContent>
          <LinkTitle>TEAM-A</LinkTitle>
          <LinkBlock>
            <code>{`https://zenithwildrift-40c50.web.app/match/${selectedId}/team/00`}</code>
          </LinkBlock>
          <LinkTitle>TEAM-B</LinkTitle>
          <LinkBlock>
            <code>{`https://zenithwildrift-40c50.web.app/match/${selectedId}/team/11`}</code>
          </LinkBlock>
          <LinkTitle>Spectator</LinkTitle>
          <LinkBlock>
            <code>{`https://zenithwildrift-40c50.web.app/match/${selectedId}/spectator`}</code>
          </LinkBlock>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setToggle({ ...toggle, links: false })}
            color="primary"
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress color="primary" />
      </Backdrop>
    </>
  );
};

export default Dashboard;
