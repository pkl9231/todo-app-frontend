import { DialogActions, DialogTitle, TextField } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "@material-ui/core/Button";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import ListComponents from "./ListComponents";
import HighlightOffRoundedIcon from "@material-ui/icons/HighlightOffRounded";
import Dialog from "@material-ui/core/Dialog";
import Notification from "./Notifications";
// import DiaglogBox from "./DiaglogBox";

import { TodoList } from "./DataTypes/TodoListData";
import "./Todo.css";

const Todo = () => {
  const [item, setItem] = useState("");
  const [newitem, setNewItem]: any = useState([]);
  const [open, setOpen] = React.useState(false);
  const [records, setRecords] = useState([]);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  useEffect(() => {
    axios.get("http://localhost:4000/todo-list").then((res: any) => {
      setRecords(res?.data?.data);
    });
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onChangeEvent = (event: any) => {
    setItem(event.target.value);
  };

  const addItem = () => {
    if (!item.length) {
      setNotify({
        isOpen: true,
        message: "Please add some items",
        type: "error",
      });

      return (
        <>
          <Notification notify={notify} setNotify={setNotify} />
        </>
      );
    }

    axios
      .post("http://localhost:4000/todo-list", { items: item })
      .then((response) => {
        console.log("getting response after save", response);
        window.location.reload();
      })
      .catch((error: any) => {
        console.log("getting error", error);
        setNotify({
          isOpen: true,
          message: "Item already in List",
          type: "error",
        });
        return (
          <>
            <Notification notify={notify} setNotify={setNotify} />
          </>
        );
      });
    setItem(""); // clear input
  };

  const deleteAllItem = () => {
    axios
      .delete("http://localhost:4000/todo-list")
      .then((response) => {
        console.log("getting response after delete all items", response);
        window.location.reload();
      })
      .catch((error: any) => {
        console.log("getting error", error);
        setNotify({
          isOpen: true,
          message: "Getting error while deleting items",
          type: "error",
        });
        return (
          <>
            <Notification notify={notify} setNotify={setNotify} />
          </>
        );
      });
    setOpen(false);
  };

  return (
    <>
      <Notification notify={notify} setNotify={setNotify} />
      <div className="main-div">
        <div className="todo-div">
          <h1 id="todo_header">TODO LIST</h1>
          <div style={{ display: "inline" }}>
            <div style={{ display: "flex", padding: "40px" }}>
              <TextField
                id="input_item"
                placeholder="Add an Item"
                value={item}
                style={{}}
                onChange={onChangeEvent}
              />
              <Button onClick={addItem} style={{ marginLeft: "20px" }}>
                <AddCircleIcon fontSize="large" />
              </Button>

              <Button
                color="primary"
                disabled={records.length ? false : true}
                onClick={handleClickOpen}
              >
                <HighlightOffRoundedIcon fontSize="large" />
              </Button>

              <div>
                <Dialog
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle id="alert-dialog-title">
                    {"Do you want to clear data?"}
                  </DialogTitle>
                  <DialogActions>
                    <Button onClick={handleClose} color="primary">
                      No
                    </Button>
                    <Button onClick={deleteAllItem} color="primary" autoFocus>
                      Yes
                    </Button>
                  </DialogActions>
                </Dialog>
              </div>
            </div>
            <div
              style={{
                width: "340px",
                height: "380px",
                overflow: "auto",
                paddingLeft: "40px",
              }}
            >
              <ol style={{ listStyle: "none" }}>
                {records.map((values: TodoList, index: number) => {
                  return <ListComponents val={values} index={index} />;
                })}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Todo;
