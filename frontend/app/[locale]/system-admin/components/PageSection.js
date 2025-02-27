'use client'
import React, { useState, useReducer } from "react";
import { useDispatch } from "react-redux";
import PageDetail from "./PageDetail";
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField } from '@mui/material';


export default function PageSection({ pages}) {
  const [show, setShow] = useReducer((show) => !show, false);
  const [name, setName] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [error, setError] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = async () => {
    if (!name) {
      setIsValid(false);
      return;
    } else {
      createPage(name)(dispatch);
      closeModal();
    }
  };

  const closeModal = () => {
    setName("");
    setError("");
    setShow();
  };
  return (
    <div className="my-2 d-flex flex-column">
      <button
        type="button"
        className="btn btn-outline-secondary btn-sm mb-2 mx-2"
        onClick={() => setShow(!show)}
      >
        <i className="fa fa-plus"></i>
        Add Page
      </button>
      <Dialog open={show} onClose={closeModal} aria-labelledby="create-page-dialog" fullWidth maxWidth="sm">
        <form id="create-page" onSubmit={handleSubmit}>
          <DialogTitle id="create-page-dialog">Create Page</DialogTitle>
          <DialogContent>
            <div className="col-auto">
              <TextField
                label="Name"
                type="text"
                fullWidth
                variant="outlined"
                size="small"
                id="name"
                name="name"
                placeholder="Name of Page"
                value={name}
                onChange={(e) => setName(e.target.value)}
                error={!isValid}
                helperText={!isValid ? "Please provide a valid name." : ""}
              />
            </div>
          </DialogContent>
          <DialogActions>
            <Button variant="contained" color="secondary" onClick={closeModal}>
              Close
            </Button>
            <Button variant="contained" color="primary" type="submit">
              Save Changes
            </Button>
          </DialogActions>
        </form>
      </Dialog>
      CreatePageModal;

      <ul className="list-group pages">
        {pages.map((page) => (
          <PageDetail page={page} key={page.id} />
        ))}
      </ul>
    </div>
  );
}