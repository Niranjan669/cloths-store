import { useState, useEffect } from "react";

function AllProducts({ userId }) {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  const fetchProducts = async () => {
    const res = await fetch("http://localhost:3001/products");
    const data = await res.json();
    setProducts(data);
  };

  const fetchCart = async () => {
    const res = await fetch(`http://localhost:3001/carts?userId=${userId}`);
    const data = await res.json();
    setCart(data);
  };

  useEffect(() => {
    fetchProducts();
    if (userId) fetchCart();
  }, [userId]);

  const isInCart = (productId) => cart.some((item) => item.productId === productId);

  const addToCart = async (product) => {
    if (isInCart(product.id)) return;
    await fetch("http://localhost:3001/carts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId,
        productId: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        category: product.category,
      }),
    });
    alert(`${product.name} added to cart`);
    fetchCart();
  };

  return (
    <div className="container mt-3">
      <h3 className="text-center mb-4">All Products</h3>
      <div className="row">
        {products.map((p) => (
          <div key={p.id} className="col-md-3 mb-3">
            <div className="card h-100 shadow-sm">
              <img
                src={p.image}
                className="card-img-top"
                alt={p.name}
                style={{ height: "180px", objectFit: "cover" }}
              />
              <div className="card-body d-flex flex-column">
                <h6 className="card-title">{p.name}</h6>
                <p className="mb-1">Category: {p.category}</p>
                <p className="mb-1">Price: ₹{p.price}</p>
                <button
                  className={`btn btn-sm mt-auto ${isInCart(p.id) ? "btn-secondary" : "btn-primary"}`}
                  onClick={() => addToCart(p)}
                  disabled={isInCart(p.id)}
                >
                  {isInCart(p.id) ? "Added" : "Add to Cart"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AllProducts;
