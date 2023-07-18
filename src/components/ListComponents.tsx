import React, { useState } from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import UndoIcon from "@material-ui/icons/Undo";

import { TodoList } from "./DataTypes/TodoListData";
import "./ListComponents.css";

const ListComponents: React.FC<{ val: TodoList, id : number }> = ({ val, id }, props) => {
  const [line, setLine] = useState(false);
  const ShowLine = () => {
  console.log("getting id", id);
    setLine(true);
  };

  const HideLine = () => {
    setLine(false);
  };

  return (
    <>
      {val ? (
        <div className="todo_style">
          <span onClick = {ShowLine} key={id}>
            <DeleteIcon />
          </span>
          <li
            className="list_item"
            style={{
              textDecoration: line ? "line-through" : "none",
              paddingLeft: "10px",
            }}
          >
            <>{val}</>
          </li>
          <span onClick={HideLine} style={{ paddingLeft: "10px" }}>
            <UndoIcon />
          </span>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default ListComponents;
