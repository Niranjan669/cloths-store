import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Cart({ userId }) {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  const fetchCart = async () => {
    const res = await fetch(`http://localhost:3001/carts?userId=${userId}`);
    const data = await res.json();
    setCart(data);
  };

  useEffect(() => {
    if (userId) fetchCart();
  }, [userId]);

  const removeItem = async (id) => {
    await fetch(`http://localhost:3001/carts/${id}`, { method: "DELETE" });
    fetchCart();
  };

  const total = cart.reduce((sum, item) => sum + Number(item.price), 0);

  return (
    <div className="container mt-4">
      <h3 className="mb-3 text-center">My Cart</h3>
      {cart.length === 0 ? (
        <p className="text-center">Cart is empty</p>
      ) : (
        <>
          <div className="row">
            {cart.map((item) => (
              <div key={item.id} className="col-md-3 mb-3">
                <div className="card h-100 shadow-sm">
                  <img
                    src={item.image}
                    className="card-img-top"
                    alt={item.name}
                    style={{ height: "180px", objectFit: "cover" }}
                  />
                  <div className="card-body d-flex flex-column">
                    <h6>{item.name}</h6>
                    <p>₹{item.price}</p>
                    <button
                      className="btn btn-danger btn-sm mt-auto"
                      onClick={() => removeItem(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 text-center">
            <h5>Total: ₹{total}</h5>
            <button className="btn btn-success" onClick={() => navigate("/delivery")}>
              Proceed to Delivery
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
