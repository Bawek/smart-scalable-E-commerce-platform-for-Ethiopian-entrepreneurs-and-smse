'use client';
import React, { useState, useReducer, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField } from '@mui/material';
import { setCurrentPage } from "@/lib/features/admin-my/currentPageSlice";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function PageSection({ templateId }) {
  const [show, setShow] = useReducer((show) => !show, false);
  const [pages, setPages] = useState([]);
  const [name, setName] = useState("");
  const [isValid, setIsValid] = useState(true);

  const dispatch = useDispatch();
  const router = useRouter();
  const currentPage = useSelector((state) => state.currentPage);

  /** 🔹 Fetch Pages */
  useEffect(() => {
    let isMounted = true;
    const fetchPages = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/pages/get-by-template/${templateId}`);
        if (isMounted) {
          if (response.data.status === "success") {
            setPages(response.data.pages.length > 0 ? response.data.pages : []);
          }
        }
      } catch (error) {
        toast.error("Something went wrong while fetching pages.");
      }
    };

    fetchPages();

    return () => {
      isMounted = false; // Cleanup to avoid memory leaks
    };
  }, [currentPage, templateId]);

  /** 🔹 Handle Delete Page */
  const handleDeletePage = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:8000/api/pages/delete/${id}`);
      if (response.data.status === "success") {
        setPages((prevPages) => prevPages.filter((page) => page.id !== id));
        toast.success(response.data.message || "Successfully deleted.");
        router.refresh();
      } else {
        toast.error("Something went wrong.");
      }
    } catch (error) {
      toast.error("Something went wrong while deleting.");
    }
  };

  /** 🔹 Handle Create Page */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setIsValid(false);
      return;
    }

    const newPage = {
      id: crypto.randomUUID(), // Unique ID
      name,
      js: "",
      css: "",
      html: "",
      templateId
    };

    dispatch(setCurrentPage(newPage));
    setPages([...pages, newPage]); // Optimistically update state
    closeModal();
    router.refresh();
  };

  /** 🔹 Close Modal */
  const closeModal = () => {
    setName("");
    setIsValid(true);
    setShow();
  };

  return (
    <div className="my-2 d-flex flex-column">
      <button
        type="button"
        className="btn btn-outline-secondary btn-sm mb-2 mx-2"
        onClick={setShow}
      >
        <i className="fa fa-plus"></i> Add Page
      </button>

      {/* Create Page Dialog */}
      <Dialog open={show} onClose={closeModal} fullWidth maxWidth="sm">
        <form onSubmit={handleSubmit}>
          <DialogTitle>Create Page</DialogTitle>
          <DialogContent>
            <TextField
              label="Name"
              fullWidth
              variant="outlined"
              size="small"
              value={name}
              onChange={(e) => setName(e.target.value)}
              error={!isValid}
              helperText={!isValid ? "Please provide a valid name." : ""}
            />
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

      {/* Page List */}
      <ul className="list-group pages">
        {pages.map((page) => (
          <li key={page.id} className="flex justify-between items-center p-2 border-b">
            <h5 className="text-sm font-medium">{page.name}</h5>
            <div className="flex gap-2">
              <button
                onClick={() => dispatch(setCurrentPage({
                  id: page.id,
                  name: page.name,
                  js: page.js || "",
                  css: page.css || "",
                  html: page.html || "",
                  templateId
                }))}
                className="p-1 text-blue-500 hover:text-blue-900"
              >
                <i className="fa fa-pencil"></i>
              </button>
              <button
                onClick={() => handleDeletePage(page.id)}
                className="p-1 text-red-500 hover:text-red-900 rounded"
              >
                <i className="fa fa-trash"></i>
              </button>
            </div>
          </li>

        ))}
      </ul>
    </div>
  );
}
