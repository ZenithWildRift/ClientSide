/* eslint-disable quotes */
/* eslint-disable import/no-named-as-default */
/* eslint-disable object-curly-newline */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-unused-vars */
/* eslint-disable arrow-parens */
import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  makeStyles,
  Modal,
  TextField,
  Typography,
} from "@material-ui/core";
import { useParams } from "react-router";
import React, { useEffect, useState } from "react";
import axios from "axios";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import BodyContainer from "../../Shared/BodyContainer";
import Navigation from "../../Shared/Navigation";
import ConfirmModal from "../../Components/ConfirmModal";
import ImageModal from "../../Components/ImageModal";
import TextUpdateModal from "../../Components/TextUpdateModal";
import { deleteCustomFields, getMatch, updateMatchFields } from "../../Services/ManageServices";

const useStyles = makeStyles((theme) => ({
  lable: {
    fontWeight: "500",
    width: "30%",
  },
  input: {
    width: 250,
    marginRight: 10,
  },
  imageDisplay: {},
  formLabel: {
    width: "100%",
    display: "flex",
    alignItems: "center",
  },
  img: {
    width: 150,
  },
}));

const Manage = () => {
  const classes = useStyles();
  const [match, setMatch] = useState();
  const [state, setState] = useState({
    selected: "",
    value: "",
    image: "",
    dataType: "",
    actionType: "",
    loading: true,
  });
  const [modal, setModal] = useState({
    image: false,
    confirm: false,
    text: false,
    loading: false,
  });

  const { matchId } = useParams();

  const editText = (name) => {
    setModal({ ...modal, text: true });
    setState({ ...state, selected: name, dataType: 'text', actionType: 'UPDATE' });
  };
  const toggleConfirm = (name) => {
    setModal({ ...modal, confirm: true });
    setState({ ...state, selected: name, dataType: '', actionType: 'DELETE' });
  };
  const editImage = (name) => {
    setModal({ ...modal, image: true });
    setState({ ...state, selected: name, dataType: 'image', actionType: 'UPDATE' });
  };

  const handleDelete = async () => {
    setModal({ ...modal, loading: true });
    const res = await deleteCustomFields(matchId, state.selected);
    if (res.message === 'OK') setModal({ ...modal, confirm: false, loading: false });
  };

  const handleUpdate = async () => {
    setModal({ ...modal, loading: true });
    const res = await updateMatchFields(matchId, state);
    if (res.message === 'OK') setModal({ ...modal, image: false, text: false, loading: false });
  };

  useEffect(() => {
    axios
      .get(`/match/${matchId}`)
      .then((response) => {
        setMatch(response.data.match);
        setState({ ...state, loading: false });
      })
      .catch((err) => console.log(err));
  }, [modal.loading]);

  console.log(state);

  return (
    <>
      <Navigation />

      <BodyContainer>
        {/* Text */}
        <Box mb={2} className={classes.formLabel}>
          <Typography className={classes.lable}>Name</Typography>
          <div>
            <TextField
              className={classes.input}
              placeholder={match?.name}
              disabled
              variant="outlined"
              size="small"
            />
            <Button
              onClick={() => editText("name")}
              variant="text"
              size="small"
              color="primary"
              startIcon={<EditIcon />}
            >
              Edit
            </Button>
          </div>
        </Box>
        <Box mb={2} className={classes.formLabel}>
          <Typography className={classes.lable}>Team A</Typography>
          <div>
            <TextField
              className={classes.input}
              placeholder={match?.teamA.name}
              disabled
              variant="outlined"
              size="small"
            />
            <Button
              onClick={() => editText("teamA")}
              variant="text"
              size="small"
              color="primary"
              startIcon={<EditIcon />}
            >
              Edit
            </Button>
          </div>
        </Box>
        <Box mb={2} className={classes.formLabel}>
          <Typography className={classes.lable}>Team B</Typography>
          <div>
            <TextField
              className={classes.input}
              placeholder={match?.teamB.name}
              disabled
              variant="outlined"
              size="small"
            />
            <Button
              onClick={() => editText("teamB")}
              variant="text"
              size="small"
              color="primary"
              startIcon={<EditIcon />}
            >
              Edit
            </Button>
          </div>
        </Box>
        <Box mb={2} className={classes.formLabel}>
          <Typography className={classes.lable}>Organisation</Typography>
          <div>
            <TextField
              type=""
              className={classes.input}
              placeholder={match?.organisation.name}
              disabled
              variant="outlined"
              size="small"
            />
            <Button
              onClick={() => editText("organisation")}
              variant="text"
              size="small"
              color="primary"
              startIcon={<EditIcon />}
            >
              Edit
            </Button>
          </div>
        </Box>

        {/* ---------------------IMAGES --------------*/}

        <Box mb={2} className={classes.formLabel}>
          <Typography className={classes.lable}>Image Team A</Typography>
          <div>
            <img src={match?.teamA.image?.url} alt="" className={classes.img} />
            <Button
              onClick={() => editImage("teamA")}
              variant="text"
              size="small"
              color="primary"
              startIcon={<EditIcon />}
            >
              Edit
            </Button>
          </div>
        </Box>
        <Box mb={2} className={classes.formLabel}>
          <Typography className={classes.lable}>Image Team B</Typography>
          <div>
            <img src={match?.teamB.image?.url} alt="" className={classes.img} />

            <Button
              onClick={() => editImage("teamB")}
              variant="text"
              size="small"
              color="primary"
              startIcon={<EditIcon />}
            >
              Edit
            </Button>
          </div>
        </Box>
        <Box mb={2} className={classes.formLabel}>
          <Typography className={classes.lable}>Image Organisation</Typography>
          <div>
            <img
              src={match?.organisation.image?.url}
              alt=""
              className={classes.img}
            />

            <Button
              onClick={() => editImage("organisation")}
              variant="text"
              size="small"
              color="primary"
              startIcon={<EditIcon />}
            >
              Edit
            </Button>
          </div>
        </Box>

        {/* --------------------- CUSTOMS ------------------ */}
        {/* --------------------- CUSTOMS ------------------ */}

        <Typography
          style={{
            fontSize: 25,
            fontWeight: "600",
            textDecoration: "underline",
            marginTop: 20,
            marginBottom: 20,
          }}
        >
          Custom Theme
        </Typography>

        <Box mb={2} className={classes.formLabel}>
          <Typography className={classes.lable}>Colour: Background</Typography>
          <div>
            <TextField
              type=""
              className={classes.input}
              placeholder={match?.template?.background}
              disabled
              variant="outlined"
              size="small"
            />
            <Button
              onClick={() => editText("template-background")}
              variant="text"
              size="small"
              color="primary"
              startIcon={<EditIcon />}
            >
              Edit
            </Button>
            <Button
              onClick={() => toggleConfirm("template-background")}
              variant="text"
              size="small"
              color="secondary"
              startIcon={<DeleteIcon />}
            >
              Delete
            </Button>
          </div>
        </Box>

        {/* IMAGES */}
        <Box mb={2} className={classes.formLabel}>
          <Typography className={classes.lable}>Background: Image</Typography>
          <div>
            <img
              src={match?.template?.backgroundImage?.url}
              alt=""
              className={classes.img}
            />
            <Button
              onClick={() => editImage("template-backgroundImage")}
              variant="text"
              size="small"
              color="primary"
              startIcon={<EditIcon />}
            >
              Edit
            </Button>
            <Button
              onClick={() => toggleConfirm("template-backgroundImage")}
              variant="text"
              size="small"
              color="secondary"
              startIcon={<DeleteIcon />}
            >
              Delete
            </Button>
          </div>
        </Box>

        <Box mb={2} className={classes.formLabel}>
          <Typography className={classes.lable}>Colour: Team A</Typography>
          <div>
            <TextField
              type=""
              className={classes.input}
              placeholder={match?.template?.teamA}
              disabled
              variant="outlined"
              size="small"
            />
            <Button
              onClick={() => editText("template-teamA")}
              variant="text"
              size="small"
              color="primary"
              startIcon={<EditIcon />}
            >
              Edit
            </Button>
            <Button
              onClick={() => toggleConfirm("template-teamA")}
              variant="text"
              size="small"
              color="secondary"
              startIcon={<DeleteIcon />}
            >
              Delete
            </Button>
          </div>
        </Box>
        <Box mb={2} className={classes.formLabel}>
          <Typography className={classes.lable}>Colour: Team B</Typography>
          <div>
            <TextField
              type=""
              className={classes.input}
              placeholder={match?.template?.teamB}
              disabled
              variant="outlined"
              size="small"
            />
            <Button
              onClick={() => editText("template-teamB")}
              variant="text"
              size="small"
              color="primary"
              startIcon={<EditIcon />}
            >
              Edit
            </Button>
            <Button
              onClick={() => toggleConfirm("template-teamB")}
              variant="text"
              size="small"
              color="secondary"
              startIcon={<DeleteIcon />}
            >
              Delete
            </Button>
          </div>
        </Box>
        <Box mb={2} className={classes.formLabel}>
          <Typography className={classes.lable}>
            Colour: SelectionBox
          </Typography>
          <div>
            <TextField
              type=""
              className={classes.input}
              placeholder={match?.template?.selectionBox}
              disabled
              variant="outlined"
              size="small"
            />
            <Button
              onClick={() => editText("template-selectionBox")}
              variant="text"
              size="small"
              color="primary"
              startIcon={<EditIcon />}
            >
              Edit
            </Button>
            <Button
              onClick={() => toggleConfirm("template-selectionBox")}
              variant="text"
              size="small"
              color="secondary"
              startIcon={<DeleteIcon />}
            >
              Delete
            </Button>
          </div>
        </Box>
      </BodyContainer>

      <ConfirmModal
        title="Confirm Delete ?"
        onConfirm={() => handleDelete()}
        open={modal.confirm}
        loading={modal.loading}
        onCancel={() => setModal({ ...modal, confirm: false })}
      />

      <TextUpdateModal
        title={`Update ${state.selected}`}
        open={modal.text}
        onConfirm={() => handleUpdate()}
        onCancel={() => setModal({ ...modal, text: false })}
        onValueChange={(value) => setState({ ...state, value })}
        loading={modal.loading}
      />

      <ImageModal
        open={modal.image}
        onConfirm={() => handleUpdate()}
        onCancel={() => setModal({ ...modal, image: false })}
        onValueChange={(file) => setState({ ...state, image: file })}
        loading={modal.loading}
      />

      <Backdrop style={{ zIndex: 999, color: "yellow" }} open={state.loading}>
        <CircularProgress color="primary" />
      </Backdrop>
    </>
  );
};

export default Manage;
