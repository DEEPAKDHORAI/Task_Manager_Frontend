import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4 shadow">
      <Link className="navbar-brand fw-bold" to="/">
        Smart Task Portal
      </Link>

      <div className="ms-auto d-flex align-items-center">

        {/* USER DASHBOARD LINK */}
        {role === "user" && (
          <Link to="/user" className="btn btn-outline-light me-2">
            Dashboard
          </Link>
        )}

        {/* ADMIN DASHBOARD LINK */}
        {role === "admin" && (
          <Link to="/admin" className="btn btn-outline-warning me-2">
            Admin Panel
          </Link>
        )}

        {/* PROFILE LINK */}
        {role && (
          <Link to="/profile" className="btn btn-outline-info me-2">
            Profile
          </Link>
        )}

        {/* LOGOUT BUTTON */}
        {role && (
          <button
            className="btn btn-danger"
            onClick={handleLogout}
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
