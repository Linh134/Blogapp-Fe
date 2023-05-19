import { Link } from "react-router-dom";
import { useLogout } from "../Hooks/useLogout";
import { useAuthContext } from "../Hooks/useAuthContext";
import logo from "../img/logo.jpg";

const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleClick = () => {
    logout();
  };

  return (
    <nav className="navigation max-width-1 m-auto font-secondary padding-bottom-15">
      <div className="nav-left fw-bold fs-800">
        <Link to="/">
          <img src={logo} width="300px" />
        </Link>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/create">Write blog</Link>
          </li>
        </ul>
      </div>
      <div className="nav-right fw-regular fs-400 fw-bold">
        <p>{`Hi ${user?.username}`}</p>
        <button className="btn" onClick={handleClick}>
          Log out
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
