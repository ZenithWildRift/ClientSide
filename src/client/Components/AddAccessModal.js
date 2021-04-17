/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
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
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import MuiAlert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  modalConfirm: {
    width: "30%",
    height: "auto",
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

const AddAccessModal = ({
  type,
  open,
  title,
  description,
  onValueChange,
  onConfirm,
  onCancel,
  value,
  loading,
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

          <TextField
            onChange={e => onValueChange(e.target.value)}
            placeholder="Enter email"
            fullWidth
            value={value}
            variant="outlined"
            size="small"
            style={{ marginBottom: 20, marginTop: 20 }}
          />

          {loading && <LinearProgress color="secondary" />}
          <Typography className={classes.description}>{description}</Typography>
          <Box
            mt={3}
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "flex-end",
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
                {type === "add" ? "Add Acess" : "Revoke Access"}
              </Button>
            </Box>
          </Box>
        </Card>
      </div>
    </Modal>
  );
};

export default AddAccessModal;
