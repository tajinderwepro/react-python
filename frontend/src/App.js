import React, { useState, useEffect } from "react";
import {
  Button,
  Modal,
  Box,
  TextField,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton
} from "@mui/material";
import {
  Delete as DeleteIcon,
  Edit as EditIcon,
  Visibility as VisibilityIcon
} from "@mui/icons-material";
import axios from "axios";

const API_URL = "http://localhost:8000/users";
const headers = { Authorization: "Bearer valid_token" };

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 4
};

function App() {
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", id: null });

  const fetchUsers = () => {
    axios
      .get(API_URL, { headers })
      .then((res) => setUsers(res.data.data))
      .catch(console.error);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setForm({ name: "", email: "", id: null });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = { name: form.name, email: form.email };

    const request = form.id
      ? axios.put(`${API_URL}/${form.id}`, payload, { headers })
      : axios.post(API_URL, payload, { headers });

    request.then(() => {
      fetchUsers();
      handleClose();
    }).catch(console.error);
  };

  const handleDelete = (id) => {
    axios.delete(`${API_URL}/${id}`, { headers }).then(fetchUsers);
  };

  const handleEdit = (user) => {
    setForm({ name: user.name, email: user.email, id: user.id });
    handleOpen();
  };

  return (
    <Box p={4}>
      <Box display="flex" justifyContent="space-between" mb={2}>
        <Typography variant="h5">User List</Typography>
        <Button variant="contained" onClick={handleOpen}>Create</Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEdit(user)} color="primary">
                    <EditIcon />
                  </IconButton>
                  <IconButton color="secondary">
                    <VisibilityIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(user.id)} color="error">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
            {users.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} align="center">No data</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Modal open={open} onClose={handleClose}>
        <Box sx={modalStyle} component="form" onSubmit={handleSubmit}>
          <Typography variant="h6" mb={2}>
            {form.id ? "Update User" : "Create User"}
          </Typography>
          <TextField
            label="Name"
            fullWidth
            margin="normal"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <TextField
            label="Email"
            fullWidth
            margin="normal"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <Box mt={2} display="flex" justifyContent="flex-end" gap={2}>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit" variant="contained">
              {form.id ? "Update" : "Create"}
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}

export default App;
