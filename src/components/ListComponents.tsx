import DeleteIcon from "@material-ui/icons/Delete";
import axios from "axios";

import { TodoList } from "./DataTypes/TodoListData";
import "./ListComponents.css";

const ListComponents: React.FC<{ val: TodoList; index: number }> = (
  { val }
) => {
  const ShowLine = () => {
    axios
      .delete(`http://localhost:4000/todo-list/${val?._id}`)
      .then((res: any) => {
        console.log(res);
      });
    window.location.reload();
  };

  return (
    <>
      {val?.items ? (
        <div className="todo_style">
          <span onClick={ShowLine}>
            <DeleteIcon />
          </span>
          <li className="list_item">
            <>{val?.items}</>
          </li>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default ListComponents;
