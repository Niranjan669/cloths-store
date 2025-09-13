import { Link } from "react-router-dom";

function Header({ role, setRole, setUserId }) {
  const handleLogout = () => {
    setRole(null);
    setUserId(null);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
      <div className="container">
       
        <Link className="navbar-brand fw-bold" to="/">Cloths Store</Link>
       
        <div className="ms-auto">
          {!role && (
            <Link to="/admin/login" className="btn btn-warning">
              Admin Login
            </Link>
          )}

          
          {role && (
            <button className="btn btn-danger" onClick={handleLogout}>
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Header;
