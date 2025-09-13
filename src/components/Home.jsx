import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Home({ role, userId }) {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const res = await fetch("http://localhost:3001/products");
    const data = await res.json();
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
    
      <div className="bg-primary text-white text-center p-5" style={{ minHeight: "60vh" }}>
        <h1 className="display-4 fw-bold">Welcome to Cloths Store</h1>
        <p className="lead mt-3">
          Explore the latest fashion trends for Men, Women, and Kids. Stylish, affordable, and delivered to your doorstep!
        </p>
        <div className="mt-4">
          <button
            className="btn btn-light btn-lg me-3"
            onClick={() => navigate("/products")}
          >
            Explore Products
          </button>
          {role !== "user" && (
            <>
              <button
                className="btn btn-outline-light btn-lg me-2"
                onClick={() => navigate("/user/login")}
              >
                Login
              </button>
              <button
                className="btn btn-outline-light btn-lg"
                onClick={() => navigate("/user/register")}
              >
                Register
              </button>
            </>
          )}
        </div>
      </div>

      <div className="container mt-5">
        <h2 className="text-center mb-4 fw-bold">Featured Products</h2>
        <div className="row">
          {products.slice(0, 8).map((p) => (
            <div key={p.id} className="col-md-3 mb-3">
              <div className="card h-100 shadow-sm">
                <img
                  src={p.image}
                  className="card-img-top"
                  alt={p.name}
                  style={{ height: "180px", objectFit: "cover" }}
                />
                <div className="card-body">
                  <h6 className="card-title">{p.name}</h6>
                  <p className="mb-1">Category: {p.category}</p>
                  <p className="mb-1">Price: ₹{p.price}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-light text-center py-5 mt-5">
        <h3 className="fw-bold mb-3">Ready to Shop?</h3>
        {role !== "user" && (
          <div>
            <button
              className="btn btn-primary btn-lg me-2"
              onClick={() => navigate("/user/register")}
            >
              Register Now
            </button>
            <button
              className="btn btn-outline-primary btn-lg"
              onClick={() => navigate("/user/login")}
            >
              Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
