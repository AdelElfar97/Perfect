import React from "react";
import { FormControlLabel, IconButton } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { useState, useEffect } from "react";
import { blue } from "@material-ui/core/colors";
import DoneIcon from "@mui/icons-material/Done";
import axios from "axios";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const UserTable = () => {
  const [openDialog, setOpenDialog] = React.useState(false);

  const [rows, setRows] = React.useState([]);
  const [editData, setEditData] = React.useState({});
  const [addEdit, setAddEdit] = React.useState();

  const getData = async () => {
    try {
      let res = await axios({
        method: "get",
        url: "http://localhost:8080/students",
        headers: { Authorization: 'Bearer ' + localStorage.getItem("token") }
      });
      let data = res.data;

      let newRows = Array.from(data);
      for (let i = 0; i < newRows.length; i++) {
        newRows[i]["id"] = data[i]._id;
      }
      setRows(newRows);
    } catch (err) {
      //setErrorMessages("wrong credentials")
      if (!err?.response) {
        console.log("ERROR");
      }
    }
  };
  useEffect(() => {
    getData();
  }, []);

  const handleClickOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCancel = () => {
    setOpenDialog(false);
  };

  const handleAddUser = async (e) => {
    setOpenDialog(false);
    try {
      let res = await axios({
        method: "post",
        url: "http://localhost:8080/students",
        data: {
          name: name,
          age: age,
        },
        headers: { Authorization: 'Bearer ' + localStorage.getItem("token") }

      });
      let newRows = Array.from(rows);
      newRows.push({ id: res.data.data._id, name: name, age: age });
      setRows(newRows);
      let data = res.data;

      return data;
    } catch (err) {
      //setErrorMessages("wrong credentials")
      if (!err?.response) {
        console.log("ERROR");
      }

      //return err.response;
    }
  };

  const handleEditUser = async (e) => {
    setOpenDialog(false);
    editUser();
  };

  const [errorMessages, setErrorMessages] = useState("");
  const [age, setAge] = useState("");
  const [name, setName] = useState("");
  const [index, setIndex] = useState("");

  const ageHandle = (e) => {
    if (e.target.value < 100) setAge(e.target.value);
    // some action
  };

  const deleteUser = async (index) => {
    try {
      let res = await axios({
        method: "delete",
        url: `http://localhost:8080/students/${index}`,
        headers: { Authorization: 'Bearer ' + localStorage.getItem("token") }
      });
      let newRows = [];
      for (let i = 0; i < rows.length; i++) {
        if (rows[i].id !== index) {
          newRows.push(rows[i]);
        }
      }
      setRows(newRows);
    } catch (err) {
      //setErrorMessages("wrong credentials")
      if (!err?.response) {
        console.log("ERROR");
      }
    }
  };

  const nameHandle = (e) => {
    setName(e.target.value);

    // some action
  };

  const MatDelete = ({ index }) => {
    const handleDeleteClick = () => {
      deleteUser(index);
      // some action
    };

    return (
      <FormControlLabel
        control={
          <IconButton
            color="secondary"
            aria-label="delete a record"
            onClick={handleDeleteClick}
          >
            <DeleteIcon style={{ color: blue[500] }} />
          </IconButton>
        }
      />
    );
  };

  const editUser = async () => {
    try {
      let res = await axios({
        method: "put",
        url: `http://localhost:8080/students/${index}`,
        data: { name: name, age: age },
        headers: { Authorization: 'Bearer ' + localStorage.getItem("token") }

      });
      let newRows = [];
      for (let i = 0; i < rows.length; i++) {
        if (rows[i].id !== index) {
          newRows.push(rows[i]);
        } else {
          newRows.push({ name: name, age: age, id: index });
        }
      }
      setRows(newRows);
    } catch (err) {
      //setErrorMessages("wrong credentials")
      if (!err?.response) {
        console.log("ERROR");
      }
    }
  };

  const MatEdit = ({ index, age, name }) => {
    const handleEditClick = async () => {
      setName(name);
      setAge(age);
      setIndex(index);
      setAddEdit("edit");
      setEditData({ id: index, age: age, name: name });
      handleClickOpenDialog();
    };

    return (
      <FormControlLabel
        control={
          <IconButton
            color="secondary"
            aria-label="edit a record"
            onClick={handleEditClick}
          >
            <EditIcon style={{ color: blue[500] }} />
          </IconButton>
        }
      />
    );
  };

  const columns = [
    {
      field: "name",
      headerName: "name",
      sortable: false,
      filterable: false,
      width: 140,
      disableClickEventBubbling: true,
      renderCell: (params) => {
        return (
          <div
            className="d-flex justify-content-between align-items-center"
            style={{ cursor: "pointer" }}
          >
            <span>{params.row.name}</span>
          </div>
        );
      },
    },
    {
      field: "age",
      headerName: "age",
      sortable: false,
      filterable: false,
      width: 140,
      disableClickEventBubbling: true,
      renderCell: (params) => {
        return (
          <div
            className="d-flex justify-content-between align-items-center"
            style={{ cursor: "pointer" }}
          >
            <span>{params.row.age}</span>
          </div>
        );
      },
    },

    {
      field: "edit",
      headerName: "edit",
      sortable: false,
      filterable: false,
      width: 140,
      disableClickEventBubbling: true,
      renderCell: (params) => {
        return (
          <div
            className="d-flex justify-content-between align-items-center"
            style={{ cursor: "pointer" }}
          >
            <MatEdit
              index={params.row.id}
              age={params.row.age}
              name={params.row.name}
            />
          </div>
        );
      },
    },
    {
      field: "delete",
      headerName: "delete",
      sortable: false,
      width: 140,
      disableClickEventBubbling: true,
      renderCell: (params) => {
        return (
          <div
            className="d-flex justify-content-between align-items-center"
            style={{ cursor: "pointer" }}
          >
            <MatDelete index={params.row.id} />
          </div>
        );
      },
    },
  ];
const key =(e)=>{
  if(e.code==="Escape")
  {
    throw("error while trying pressing escape")
  }
  else if(e.code==="Enter")
  {
    if(addEdit==="edit")
    handleEditUser()
    else if(addEdit==="add")
    handleAddUser()
  }
}
  return (
    <>
      <div>
        <Dialog  onKeyDown={key} open={openDialog} onClose={handleCancel}>
          <DialogTitle>add new user</DialogTitle>
          <DialogContent>
            {addEdit === "add" && (
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="name"
                variant="standard"
                onChange={nameHandle}
              />
            )}

            {addEdit === "edit" && (
              <TextField
                autoFocus
                margin="dense"
                id="name"
                value={name}
                label="name"
                variant="standard"
                onChange={nameHandle}
              />
            )}
            <br></br>

            {addEdit === "edit" && (
              <TextField
                autoFocus
                margin="dense"
                id="age"
                value={age}
                type="number"
                onChange={ageHandle}
                label="age"
                variant="standard"
              />
            )}

            {addEdit === "add" && (
              <TextField
                autoFocus
                margin="dense"
                id="age"
                type="number"
                onChange={ageHandle}
                label="age"
                variant="standard"
              />
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCancel}>Cancel</Button>
            {addEdit === "add" && (
              <Button onClick={handleAddUser}>Add User</Button>
            )}
            {addEdit === "edit" && (
              <Button onClick={handleEditUser}>Edit User</Button>
            )}
          </DialogActions>
        </Dialog>
      </div>
      <div>
        <span>add new </span>
        <AddCircleIcon
          onClick={() => {
            handleClickOpenDialog();
            setAddEdit("add");
          }}
          style={{ cursor: "pointer" }}
        ></AddCircleIcon>
      </div>
      <div style={{ height: 500, width: 700 }}>
        <DataGrid rows={rows} columns={columns} />
      </div>
    </>
  );
};

export default UserTable;
