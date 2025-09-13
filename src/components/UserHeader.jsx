import { Link } from "react-router-dom";

function UserHeader() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light px-3 mb-3">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/products">Cloths Store</Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/products">All Products</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/cart">Cart</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/delivery">Delivery</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/orders">My Orders</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default UserHeader;
