import DeleteIcon from "@material-ui/icons/Delete";
import axios from "../axios/axios.config";

import { TodoList , Notify} from "./DataTypes/TodoListData";
import "./ListComponents.css";

const ListComponents: React.FC<{
  val: TodoList;
  index: number;
  records: TodoList[];
  setRecords: React.Dispatch<React.SetStateAction<TodoList[]>>;
  setNotify: React.Dispatch<React.SetStateAction<Notify>>;
}> = ({ val, records, setRecords, setNotify }) => {
  const deleteItems = async () => {
    try {
      await axios.delete(`/todo-list/${val?._id}`);
      const todoData = records.filter((item: TodoList) => item._id !== val?._id);
      setRecords(todoData);
    } catch (error) {
      setNotify({
        isOpen: true,
        message: "Getting error while deleting items",
        type: "error",
      });
    }
  };

  return (
    <>
      {val?.items ? (
        <div className="todo-style">
          <span onClick={deleteItems} id="deleteButton">
            <DeleteIcon />
          </span>
          <li className="list-item">
            <>{val?.items.charAt(0).toUpperCase() + val?.items.slice(1)}</>
          </li>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default ListComponents;
