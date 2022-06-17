import { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import TodoForm from "../components/TodoForm";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import { getTodos, createTodo } from "../features/todo/todoSlice";
import { reset } from "../features/auth/authSlice";

const Dashboard = () => {
  const [text, setText] = useState("");
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const { todos, isError, isLoading, message } = useSelector(
    (state) => state.todos
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (!user) {
      navigate("/register");
    }
    dispatch(getTodos());

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch]);

  const addTodo = (e) => {
    e.preventDefault();
    dispatch(createTodo({ text }));
    setText("");
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="dashBoard">
      <div className="d-container">
        <form onSubmit={addTodo}>
          <h1 className="d-name">Welcome {user.name}</h1>
          <div className="dform-group">
            <input
              type="text"
              name="todo"
              id="todo"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <button className="d-btn" type="submit">
              Add todo
            </button>
          </div>
        </form>
      </div>

      {/* todoDashboard */}
      <div className="todo-form">
        <h1>Task Dashboard</h1>
        <div className="todoContainer">
          {todos.length > 0 ? (
            <div className="todolist">
              {todos.map((todo) => (
                <TodoForm key={todo._id} todo={todo} />
              ))}
            </div>
          ) : (
            <h3>You have no task, Create some...</h3>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
