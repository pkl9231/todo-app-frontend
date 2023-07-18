import React, { useState } from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import UndoIcon from "@material-ui/icons/Undo";

import { TodoList } from "./DataTypes/TodoListData";
import "./ListComponents.css";

const ListComponents: React.FC<{ val: TodoList, index : number }> = ({ val, index }, props) => {
  const [line, setLine] = useState(false);
  const ShowLine = () => {
    setLine(true);
  };

  const HideLine = () => {
    setLine(false);
  };

  return (
    <>
      {val?.items ? (
        <div className="todo_style">
          <span onClick = {ShowLine} key={val._id}>
            <DeleteIcon />
          </span>
          <li
            className="list_item"
            style={{
              textDecoration: line ? "line-through" : "none",
              paddingLeft: "10px",
            }}
          >
            <>{val?.items}</>
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
