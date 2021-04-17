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
  Typography,
} from '@material-ui/core';
import { DropzoneArea, DropzoneDialog } from 'material-ui-dropzone';
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
    width: 500,
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
}));

export const ImageModal = ({
  open,
  onChange,
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
            Upload Image
          </Typography>

          <Box style={{ width: '100%', marginBottom: 20 }}>
            <DropzoneArea filesLimit={1} acceptedFiles={['image/jpeg', 'image/png', 'image/bmp']} onChange={data => onValueChange(data[0])} />
          </Box>

          {loading && <LinearProgress color="secondary" />}

          <Box
            mt={4}
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'flex-end',
            }}
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

export default ImageModal;
