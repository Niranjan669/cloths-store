import { useEffect, useState } from "react";

function MyOrders({ userId }) {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const res = await fetch(`http://localhost:3001/orders?userId=${userId}`);
      setOrders(await res.json());
    };
    const fetchProducts = async () => {
      const res = await fetch("http://localhost:3001/products");
      setProducts(await res.json());
    };
    if (userId) {
      fetchOrders();
      fetchProducts();
    }
  }, [userId]);

  const cancelOrder = async (id) => {
    await fetch(`http://localhost:3001/orders/${id}`, { method: "DELETE" });
    setOrders(orders.filter(o => o.id !== id));
  };

  const getProduct = (pid) => products.find(p => p.id === pid);

  const total = orders.reduce((sum, o) => {
    const p = getProduct(o.productId);
    return p ? sum + Number(p.price) : sum;
  }, 0);

  return (
    <div className="container mt-4">
      <h3 className="mb-3 text-center">My Orders</h3>
      {orders.length === 0 ? (
        <p className="text-center">No orders yet</p>
      ) : (
        <>
          <div className="row">
            {orders.map(order => {
              const prod = getProduct(order.productId);
              if (!prod) return null;
              return (
                <div key={order.id} className="col-md-3 mb-3">
                  <div className="card h-100 shadow-sm">
                    <img src={prod.image} className="card-img-top" alt={prod.name} style={{ height: "180px", objectFit: "cover" }} />
                    <div className="card-body d-flex flex-column">
                      <h6>{prod.name}</h6>
                      <p>₹{prod.price}</p>
                      <p className="text-muted small">{order.address.city}, {order.address.state}</p>
                      <button className="btn btn-danger btn-sm mt-auto" onClick={() => cancelOrder(order.id)}>
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-4 p-3 border rounded text-center bg-light">
            <h5>Total Payable: ₹{total}</h5>
          </div>
        </>
      )}
    </div>
  );
}

export default MyOrders;
