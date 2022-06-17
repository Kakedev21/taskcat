import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { reset, register } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect } from "react";
import Spinner from "../components/Spinner";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    password: "",
    password2: "",
  });

  const { name, username, password, password2 } = formData;

  //redux
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.auth
  );

  const onChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== password2) {
      toast.error("Password not match");
    } else {
      const userData = {
        name,
        username,
        password,
      };
      dispatch(register(userData));
    }
  };

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess || user) {
      navigate("/dashboard");
    }

    dispatch(reset());
  }, [user, isSuccess, isError, message, navigate, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <div className="register">
        <div className="register-container">
          <h3>register</h3>
          <form onSubmit={onSubmit}>
            <div className="form-item">
              <input
                type="text"
                name="name"
                id="name"
                placeholder="name"
                value={name}
                onChange={onChange}
              />
            </div>
            <div className="form-item">
              <input
                type="text"
                name="username"
                id="username"
                placeholder="username"
                value={username}
                onChange={onChange}
              />
            </div>
            <div className="form-item">
              <input
                type="password"
                name="password"
                id="password"
                placeholder="password"
                value={password}
                onChange={onChange}
              />
            </div>
            <div className="form-item">
              <input
                type="password"
                name="password2"
                id="password2"
                placeholder="confirm password"
                value={password2}
                onChange={onChange}
              />
            </div>
            <button className="btn-reg" type="submit">
              Submit
            </button>
            <br />
            <small>
              <a href="/login">already have account?</a>
            </small>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
