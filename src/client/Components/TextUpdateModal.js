/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import {
  Box,
  Button,
  Card,
  Divider,
  LinearProgress,
  makeStyles,
  Modal,
  Paper,
  TextField,
  Typography,
} from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalConfirm: {
    width: '30%',
    height: 'auto',
    padding: 20,
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
  },
  description: {
    marginTop: 20,
  },
  btnContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
  }
}));

export const TextUpdateModal = ({
  open,
  title,
  onConfirm,
  onCancel,
  onValueChange,
  loading
}) => {
  const classes = useStyles();

  return (
    <Modal open={open}>
      <div className={classes.root}>
        <Card className={classes.modalConfirm}>
          <Typography color="textSecondary" className={classes.title}>
            {title}
          </Typography>
          <Divider />

          <Typography style={{ marginTop: 10, marginBottom: 10 }}>Enter new value</Typography>
          <TextField autoFocus fullWidth variant="outlined" size="small" onChange={e => onValueChange(e.target.value)} />

          {loading && <LinearProgress color="secondary" style={{ marginTop: 20 }} />}

          <Box
            mt={4}
            className={classes.btnContainer}
          >
            <Box>
              <Button
                onClick={() => onCancel()}
                variant="contained"
                color="secondary"
              >
                Cancel
              </Button>
              <Button
                onClick={() => onConfirm()}
                style={{ marginLeft: 10 }}
                variant="contained"
                color="primary"
              >
                Update
              </Button>
            </Box>
          </Box>
        </Card>
      </div>
    </Modal>
  );
};

export default TextUpdateModal;
