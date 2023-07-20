import { TextField } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import axios from "../axios/axios.config";
import Button from "@material-ui/core/Button";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import ListComponents from "./ListComponents";
import HighlightOffRoundedIcon from "@material-ui/icons/HighlightOffRounded";
import Notification from "./Notifications";

import { TodoList, Notify } from "./DataTypes/TodoListData";
import DialogBox from "./DiaglogBox";
import "./Todo.css";

const Todo: React.FC<{}> = () => {
  const [item, setItem] = useState<string>("");
  const [open, setOpen] = useState(false); // TODO:
  const [records, setRecords] = useState<TodoList[]>([]);
  const [notify, setNotify] = useState<Notify>({
    isOpen: false,
    message: "",
    type: "",
  });

  const getTodoListRecords = async () => {
    try {
      const res = await axios.get("/todo-list");
      setRecords(res?.data?.data);
    } catch (error) {
      setNotify({
        isOpen: true,
        message: "Getting error while fetching todo list",
        type: "error",
      });
    }
  };

  useEffect(() => {
    getTodoListRecords();
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onChangeEvent = (event: React.ChangeEvent<HTMLInputElement>) => {
    setItem(event.target.value);
  };

  const addItem = async () => {
    try {
      let response = await axios.post("/todo-list", { items: item });
      setRecords([...records, response?.data?.data]);
    } catch (error: any) {
      if (
        !item.length &&
        error.response.data.error[0].errorMessage === "missing required field"
      ) {
        setNotify({
          isOpen: true,
          message: "Please add some items",
          type: "error",
        });
      } else {
        setNotify({
          isOpen: true,
          message: "Error while adding items",
          type: "error",
        });
      }
    }
    setItem("");
  };

  const deleteAllItem = async () => {
    //
    try {
      await axios.delete("/todo-list");
      setRecords([]);
    } catch (error) {
      setNotify({
        isOpen: true,
        message: "Getting error while deleting items",
        type: "error",
      });
    }
    setOpen(false);
  };

  return (
    <>
      <Notification notify={notify} setNotify={setNotify} />
      <div className="main-div">
        <div className="todo-div">
          <h1 id="todo_header">TODO LIST</h1>
          <div style={{ display: "inline" }} className="todo-div-items">
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
                id="deleteButton"
              >
                <HighlightOffRoundedIcon fontSize="large" />
              </Button>
              <DialogBox
                isOpen={open}
                handleClose={handleClose}
                deleteAllItem={deleteAllItem}
              />
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
                  return (
                    <ListComponents
                      val={values}
                      index={index}
                      records={records}
                      setRecords={setRecords}
                      setNotify={setNotify}
                    />
                  );
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
