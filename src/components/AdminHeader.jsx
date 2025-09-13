import { Link } from "react-router-dom";

function AdminHeader() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light px-3 mb-3">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/admin/add">Admin Panel</Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/admin/add">Add Product</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/admin/view">View Products</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/admin/orders">Orders</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default AdminHeader;
