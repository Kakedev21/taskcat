import React from "react";
import { useDispatch } from "react-redux";
import { removeTodo } from "../features/todo/todoSlice";

const TodoForm = ({ todo }) => {
  const dispatch = useDispatch();
  return (
    <>
      <div className="todocard">
        <h3>Todo:</h3>
        <button
          className="todoBtn"
          onClick={() => dispatch(removeTodo(todo._id))}
        >
          Done
        </button>
        {new Date(todo.createdAt).toLocaleDateString("en-US")}
        <p>{todo.text}</p>
      </div>
    </>
  );
};

export default TodoForm;
