import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { reset, logout } from "../features/auth/authSlice";

const NavBar = () => {
  //redux
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };

  return (
    <nav>
      <div className="nav-container">
        <div className="logo">
          <h1>
            <a href="/">
              Task<span>Cat</span>
            </a>
          </h1>
        </div>
        <div className="nav-links">
          {user ? (
            <ul>
              <li>
                <button className="btn-logout" onClick={onLogout}>
                  Log out
                </button>
              </li>
            </ul>
          ) : (
            <>
              <ul>
                <li>
                  <a href="/login">Login</a>
                </li>
                <li>
                  <a href="/register">Register</a>
                </li>
              </ul>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
