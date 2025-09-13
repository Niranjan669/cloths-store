import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ViewProducts() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const fetchProducts = async () => {
    const res = await fetch("http://localhost:3001/products");
    const data = await res.json();
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      await fetch(`http://localhost:3001/products/${id}`, { method: "DELETE" });
      fetchProducts();
    }
  };

  const handleEdit = (id) => {
    navigate(`/admin/update/${id}`);
  };

  return (
    <div className="container mt-3">
      <h3 className="mb-4">All Products</h3>

      {products.length === 0 ? (
        <p>No products added yet.</p>
      ) : (
        <div className="row">
          {products.map((product) => (
            <div key={product.id} className="col-md-4 mb-4">
              <div className="card h-100 shadow-sm">
                <img
                  src={product.image}
                  className="card-img-top"
                  alt={product.name}
                  style={{ height: "250px", objectFit: "cover" }}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="mb-1">Category: {product.category}</p>
                  <p className="mb-1">Price: ₹{product.price}</p>
                  <p className="mb-2">{product.description}</p>
                  <div className="mt-auto d-flex justify-content-between">
                    <button className="btn btn-warning btn-sm" onClick={() => handleEdit(product.id)}>
                      Edit
                    </button>
                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(product.id)}>
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ViewProducts;
